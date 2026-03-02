export interface GeminiChatMessage {
    role: 'user' | 'model'
    content: string
}

export interface GeminiChatRequest {
    model?: string
    messages?: GeminiChatMessage[]
    prompt?: string
    temperature?: number
    maxOutputTokens?: number
}

export interface GeminiChatResponse {
    content: string
    model: string
    raw?: unknown
}

export interface GeminiJsonRequest {
    model?: string
    prompt: string
    temperature?: number
    maxOutputTokens?: number
}

export interface GeminiJsonResult<T> {
    ok: boolean
    data?: T
    json: string
    error?: string
    model: string
    raw?: unknown
}

export interface GeminiImageRequest {
    prompt: string
    imageBuffer: Buffer
    mimeType: string
    model?: string
}

export interface IGeminiAiService {
    generateText(req: GeminiChatRequest): Promise<GeminiChatResponse>
    generateJson<T>(req: GeminiJsonRequest): Promise<GeminiJsonResult<T>>
    generateImage(req: GeminiImageRequest): Promise<string>
}
