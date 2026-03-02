import 'server-only'
import { injectable } from 'inversify'
import type {
    IOpenAiService,
    OpenAiChatRequest,
    OpenAiChatResponse,
    OpenAiJsonRequest,
    OpenAiJsonResult,
    OpenAiPdfExtractRequest,
    OpenAiPdfExtractResponse,
    OpenAiUsage,
} from './open-ai.interface'

type OpenAiResponseUsage = {
    input_tokens?: number
    output_tokens?: number
    total_tokens?: number
}

type OpenAiResponseContentPart = {
    type?: string
    text?: string
}

type OpenAiResponseOutputItem = {
    type?: string
    content?: OpenAiResponseContentPart[]
    text?: string
}

type OpenAiResponse = {
    model?: string
    output?: OpenAiResponseOutputItem[]
    output_text?: string
    usage?: OpenAiResponseUsage
}

@injectable()
export class OpenAiService implements IOpenAiService {
    private apiKey: string
    private apiUrl: string
    private defaultModel: string

    constructor() {
        const apiKey = process.env.OPENAI_API_KEY
        if (!apiKey) throw new Error('OPENAI_API_KEY is not defined')

        this.apiKey = apiKey
        this.apiUrl = 'https://api.openai.com/v1/responses'
        this.defaultModel = process.env.OPENAI_MODEL || 'gpt-4o-mini'
    }

    async chat(req: OpenAiChatRequest): Promise<OpenAiChatResponse> {
        const payload: Record<string, unknown> = {
            model: req.model ?? this.defaultModel,
            input: req.messages.map((message) => ({
                role: message.role,
                content: [{ type: 'input_text', text: message.content }],
            })),
        }

        this.applyCommonOptions(payload, req)

        const response = await this.createResponse(payload)
        const content = this.extractOutputText(response)

        if (!content) {
            throw new Error('OpenAI did not return any text content')
        }

        return {
            model: response.model ?? req.model ?? this.defaultModel,
            content,
            usage: this.mapUsage(response.usage),
            raw: response,
        }
    }

    async chatJson<T, TSchema = unknown>(
        req: OpenAiJsonRequest<TSchema>,
    ): Promise<OpenAiJsonResult<T>> {
        const payload: Record<string, unknown> = {
            model: req.model ?? this.defaultModel,
            input: this.buildInputFromMessages(req.messages),
        }

        if (req.schema) {
            payload.text = {
                format: {
                    type: 'json_schema',
                    name: 'structured_output',
                    strict: true,
                    schema: req.schema,
                },
            }
        }

        this.applyCommonOptions(payload, req)

        const response = await this.createResponse(payload)
        const content = this.extractOutputText(response)

        const jsonText = this.extractJson(content || '')

        if (!jsonText) {
            return {
                ok: false,
                json: '',
                errors: [{ path: '', message: 'No JSON object found in response' }],
                model: response.model ?? (req.model ?? this.defaultModel),
                usage: this.mapUsage(response.usage),
                raw: response,
            }
        }

        try {
            const data = JSON.parse(jsonText) as T
            return {
                ok: true,
                data,
                anyJson: data,
                json: jsonText,
                model: response.model ?? (req.model ?? this.defaultModel),
                usage: this.mapUsage(response.usage),
                raw: response,
            }
        } catch (error: any) {
            return {
                ok: false,
                anyJson: undefined,
                json: jsonText,
                errors: [{ path: '', message: error.message || 'Invalid JSON response' }],
                model: response.model ?? (req.model ?? this.defaultModel),
                usage: this.mapUsage(response.usage),
                raw: response,
            }
        }
    }

    async extractPdfText(req: OpenAiPdfExtractRequest): Promise<OpenAiPdfExtractResponse> {
        const fileId = await this.uploadFile(req.fileName, req.fileData)

        const prompt = `Extract the readable text from this PDF.
Return ONLY valid JSON. No markdown. No explanations.

Schema:
{
  "text": "",
  "page_count": 0,
  "title": null,
  "author": null
}

Rules:
- "text" must contain the full readable text in natural reading order.
- If title/author are unknown, set them to null.
- page_count must be a number.`

        const payload: Record<string, unknown> = {
            model: req.model ?? this.defaultModel,
            input: [
                {
                    role: 'user',
                    content: [
                        {
                            type: 'input_file',
                            file_id: fileId,
                        },
                        { type: 'input_text', text: prompt },
                    ],
                },
            ],
        }

        this.applyCommonOptions(payload, req)

        const response = await this.createResponse(payload, 600_000)
        const content = this.extractOutputText(response)

        if (!content) {
            throw new Error('OpenAI did not return any text content')
        }

        const jsonText = this.extractJson(content)
        if (!jsonText) {
            throw new Error('OpenAI did not return valid JSON for PDF extraction')
        }

        const parsed = JSON.parse(jsonText) as {
            text?: string
            page_count?: number
            title?: string | null
            author?: string | null
        }

        if (!parsed.text) {
            throw new Error('OpenAI returned empty text for PDF extraction')
        }

        return {
            model: response.model ?? req.model ?? this.defaultModel,
            text: parsed.text,
            pageCount: parsed.page_count,
            metadata: {
                title: parsed.title ?? undefined,
                author: parsed.author ?? undefined,
            },
            usage: this.mapUsage(response.usage),
            raw: response,
        }
    }

    private applyCommonOptions(
        payload: Record<string, unknown>,
        req: {
            temperature?: number
            maxOutputTokens?: number
            requestId?: string
            tags?: string[]
            metadata?: Record<string, unknown>
            providerOptions?: Record<string, unknown>
        },
    ): void {
        if (typeof req.temperature === 'number') payload.temperature = req.temperature
        if (typeof req.maxOutputTokens === 'number') payload.max_output_tokens = req.maxOutputTokens

        if (req.metadata || req.requestId || req.tags) {
            payload.metadata = {
                ...(req.metadata ?? {}),
                ...(req.requestId ? { request_id: req.requestId } : {}),
                ...(req.tags ? { tags: req.tags } : {}),
            }
        }

        if (req.providerOptions) {
            Object.assign(payload, req.providerOptions)
        }
    }

    private buildInputFromMessages(messages: OpenAiChatRequest['messages']) {
        return messages.map((message) => ({
            role: message.role,
            content: [{ type: 'input_text', text: message.content }],
        }))
    }

    private async createResponse(
        payload: Record<string, unknown>,
        timeoutMs?: number,
    ): Promise<OpenAiResponse> {
        const response = await this.fetchWithRetry(
            this.apiUrl,
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            },
            {
                timeoutMs: timeoutMs ?? this.getTimeoutMs('OPENAI_RESPONSE_TIMEOUT_MS', 120_000),
                maxAttempts: 3,
            },
        )

        if (!response.ok) {
            const errorText = await response.text().catch(() => '')
            throw new Error(
                `OpenAI API error (${response.status}): ${errorText || response.statusText}`,
            )
        }

        return (await response.json()) as OpenAiResponse
    }

    private async uploadFile(fileName: string, fileData: Buffer): Promise<string> {
        const form = new FormData()
        form.append('purpose', 'user_data')

        const arrayBuffer = fileData.buffer.slice(
            fileData.byteOffset,
            fileData.byteOffset + fileData.byteLength,
        ) as ArrayBuffer
        const blob = new Blob([arrayBuffer], { type: 'application/pdf' })
        form.append('file', blob, fileName)

        const response = await this.fetchWithRetry(
            'https://api.openai.com/v1/files',
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${this.apiKey}`,
                },
                body: form,
            },
            {
                timeoutMs: this.getTimeoutMs('OPENAI_FILE_UPLOAD_TIMEOUT_MS', 300_000),
                maxAttempts: 3,
            },
        )

        if (!response.ok) {
            const errorText = await response.text().catch(() => '')
            throw new Error(
                `OpenAI file upload error (${response.status}): ${
                    errorText || response.statusText
                }`,
            )
        }

        const data = (await response.json()) as { id?: string }
        if (!data.id) {
            throw new Error('OpenAI file upload did not return a file id')
        }

        return data.id
    }

    private extractOutputText(response: OpenAiResponse): string {
        if (response.output_text && response.output_text.trim()) {
            return response.output_text.trim()
        }

        const output = response.output ?? []
        const parts: string[] = []

        for (const item of output) {
            if (item?.content && Array.isArray(item.content)) {
                for (const part of item.content) {
                    if (typeof part?.text === 'string') {
                        parts.push(part.text)
                    }
                }
            } else if (typeof item?.text === 'string') {
                parts.push(item.text)
            }
        }

        return parts.join('').trim()
    }

    private extractJson(content: string): string | null {
        const start = content.indexOf('{')
        const end = content.lastIndexOf('}')
        if (start === -1 || end === -1 || end <= start) return null

        return content.slice(start, end + 1)
    }

    private mapUsage(usage?: OpenAiResponseUsage): OpenAiUsage | undefined {
        if (!usage) return undefined

        return {
            inputTokens: usage.input_tokens,
            outputTokens: usage.output_tokens,
            totalTokens: usage.total_tokens,
        }
    }

    private getTimeoutMs(envKey: string, fallback: number): number {
        const raw = process.env[envKey]
        if (!raw) return fallback
        const value = Number.parseInt(raw, 10)
        return Number.isNaN(value) ? fallback : value
    }

    private async fetchWithRetry(
        url: string,
        options: RequestInit,
        config: { timeoutMs: number; maxAttempts: number },
    ): Promise<Response> {
        let attempt = 1

        while (attempt <= config.maxAttempts) {
            const controller = new AbortController()
            const timeout = setTimeout(() => controller.abort(), config.timeoutMs)

            try {
                const response = await fetch(url, {
                    ...options,
                    signal: controller.signal,
                })

                clearTimeout(timeout)

                if (response.ok) return response

                if (attempt === config.maxAttempts) return response
                const retryAfterMs = this.retryAfterMs(response) ?? 2000 * attempt
                await this.sleep(retryAfterMs)
            } catch (error) {
                clearTimeout(timeout)
                if (attempt === config.maxAttempts) {
                    throw error
                }
                await this.sleep(2000 * attempt)
            }

            attempt += 1
        }

        throw new Error('Failed to fetch from OpenAI after retries')
    }

    private retryAfterMs(response: Response): number | null {
        const header = response.headers.get('retry-after')
        if (!header) return null
        const seconds = Number.parseFloat(header)
        if (Number.isNaN(seconds)) return null
        return Math.ceil(seconds * 1000) + 500
    }

    private sleep(ms: number): Promise<void> {
        return new Promise((resolve) => setTimeout(resolve, ms))
    }
}
