import 'server-only'
import { injectable } from 'inversify'
import type {
    IGeminiAiService,
    GeminiChatRequest,
    GeminiChatResponse,
    GeminiJsonRequest,
    GeminiJsonResult,
    GeminiImageRequest,
} from './gemini-ai.interface'
import { GoogleGenAI, Part } from '@google/genai'

@injectable()
export class GeminiAiService implements IGeminiAiService {
    private client: GoogleGenAI
    private defaultModel: string
    private imageModel: string

    constructor() {
        const apiKey = process.env.GEMINI_API_KEY
        if (!apiKey) throw new Error('GEMINI_API_KEY is not defined')

        this.client = new GoogleGenAI({ apiKey })
        this.defaultModel = process.env.GEMINI_MODEL || 'gemini-2.5-flash'
        this.imageModel = 'gemini-2.5-flash-image'
    }

    async generateText(req: GeminiChatRequest): Promise<GeminiChatResponse> {
        const model = req.model ?? this.defaultModel

        const contents = req.messages
            ? req.messages.map((m) => ({
                  role: m.role,
                  parts: [{ text: m.content }],
              }))
            : [{ role: 'user' as const, parts: [{ text: req.prompt ?? '' }] }]

        const response = await this.fetchWithRetry(async () => {
            return this.client.models.generateContent({
                model,
                contents,
                config: {
                    ...(typeof req.temperature === 'number' ? { temperature: req.temperature } : {}),
                    ...(typeof req.maxOutputTokens === 'number'
                        ? { maxOutputTokens: req.maxOutputTokens }
                        : {}),
                },
            })
        })

        const parts = response?.candidates?.[0]?.content?.parts ?? []
        const textResponse = parts
            .map((p: Part) => p?.text)
            .filter(Boolean)
            .join('\n')

        if (!textResponse) {
            throw new Error('Gemini did not return any text response')
        }

        return {
            content: textResponse,
            model,
            raw: response,
        }
    }

    async generateJson<T>(req: GeminiJsonRequest): Promise<GeminiJsonResult<T>> {
        const model = req.model ?? this.defaultModel

        const response = await this.fetchWithRetry(async () => {
            return this.client.models.generateContent({
                model,
                contents: [{ role: 'user', parts: [{ text: req.prompt }] }],
                config: {
                    responseMimeType: 'application/json',
                    ...(typeof req.temperature === 'number' ? { temperature: req.temperature } : {}),
                    ...(typeof req.maxOutputTokens === 'number'
                        ? { maxOutputTokens: req.maxOutputTokens }
                        : {}),
                },
            })
        })

        const parts = response?.candidates?.[0]?.content?.parts ?? []
        const textResponse = parts
            .map((p: Part) => p?.text)
            .filter(Boolean)
            .join('')

        if (!textResponse) {
            return {
                ok: false,
                json: '',
                error: 'Gemini did not return any response',
                model,
                raw: response,
            }
        }

        try {
            const data = JSON.parse(textResponse) as T
            return {
                ok: true,
                data,
                json: textResponse,
                model,
                raw: response,
            }
        } catch (error: any) {
            return {
                ok: false,
                json: textResponse,
                error: error.message || 'Invalid JSON response',
                model,
                raw: response,
            }
        }
    }

    async generateImage(req: GeminiImageRequest): Promise<string> {
        const model = req.model ?? this.imageModel
        const base64Image = req.imageBuffer.toString('base64')

        const response = await this.fetchWithRetry(async () => {
            return this.client.models.generateContent({
                model,
                contents: [
                    {
                        role: 'user',
                        parts: [
                            {
                                inlineData: {
                                    data: base64Image,
                                    mimeType: req.mimeType,
                                },
                            },
                            { text: req.prompt },
                        ],
                    },
                ],
            })
        })

        const parts = response?.candidates?.[0]?.content?.parts ?? []
        const imagePart = parts.find((p: Part) => p?.inlineData?.data)

        if (!imagePart?.inlineData?.data) {
            const textFallback = parts
                .map((p: Part) => p?.text)
                .filter(Boolean)
                .join('\n')
            throw new Error(
                `Gemini did not return an image. Text response: ${textFallback || '(empty)'}`,
            )
        }

        const base64 = imagePart.inlineData.data as string
        const mimeType = (imagePart.inlineData.mimeType as string | undefined) ?? 'image/png'

        return `data:${mimeType};base64,${base64}`
    }

    private async fetchWithRetry<T>(
        fn: () => Promise<T>,
        maxAttempts = 3,
    ): Promise<T> {
        let attempt = 1

        while (attempt <= maxAttempts) {
            try {
                return await fn()
            } catch (error) {
                if (attempt === maxAttempts) throw error
                await this.sleep(2000 * attempt)
            }
            attempt += 1
        }

        throw new Error('Failed to fetch from Gemini after retries')
    }

    private sleep(ms: number): Promise<void> {
        return new Promise((resolve) => setTimeout(resolve, ms))
    }
}
