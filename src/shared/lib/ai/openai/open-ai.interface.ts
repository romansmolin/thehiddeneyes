export type OpenAiModel = 'gpt-5' | 'gpt-5-mini' | 'gpt-4.1' | 'gpt-4.1-mini' | (string & {})

export type OpenAiRole = 'system' | 'user' | 'assistant' | 'tool'

export interface OpenAiMessage {
    role: OpenAiRole
    content: string
    name?: string
}

export interface OpenAiBaseOptions {
    temperature?: number
    maxOutputTokens?: number

    requestId?: string
    tags?: string[]
    metadata?: Record<string, unknown>

    providerOptions?: Record<string, unknown>
}

export interface OpenAiChatRequest extends OpenAiBaseOptions {
    model?: OpenAiModel
    messages: OpenAiMessage[]
}

export interface OpenAiUsage {
    inputTokens?: number
    outputTokens?: number
    totalTokens?: number
}

export interface OpenAiChatResponse {
    model: string
    content: string
    usage?: OpenAiUsage
    raw?: unknown
}

export interface OpenAiJsonRequest<TSchema = unknown> extends OpenAiBaseOptions {
    model?: OpenAiModel
    messages: OpenAiMessage[]
    schema: TSchema
}

export interface OpenAiValidationError {
    path: string
    message: string
}

export interface OpenAiJsonResult<T> {
    ok: boolean
    data?: T
    anyJson?: unknown
    json: string
    errors?: OpenAiValidationError[]
    model: string
    usage?: OpenAiUsage
    raw?: unknown
}

export interface OpenAiEmbeddingsRequest extends OpenAiBaseOptions {
    model?: string
    input: string | string[]
}

export interface OpenAiEmbeddingsResponse {
    model: string
    vectors: number[][]
    usage?: OpenAiUsage
    raw?: unknown
}

export interface OpenAiPdfExtractRequest extends OpenAiBaseOptions {
    model?: OpenAiModel
    fileName: string
    fileData: Buffer
}

export interface OpenAiPdfExtractResponse {
    model: string
    text: string
    pageCount?: number
    metadata?: {
        title?: string
        author?: string
    }
    usage?: OpenAiUsage
    raw?: unknown
}

export interface OpenAiStreamChunk {
    delta: string
    text?: string
    done?: boolean
    usage?: OpenAiUsage
    raw?: unknown
}

export interface IOpenAiService {
    chat(req: OpenAiChatRequest): Promise<OpenAiChatResponse>
    chatJson<T, TSchema = unknown>(req: OpenAiJsonRequest<TSchema>): Promise<OpenAiJsonResult<T>>
    extractPdfText(req: OpenAiPdfExtractRequest): Promise<OpenAiPdfExtractResponse>
    streamChat?(req: OpenAiChatRequest): AsyncIterable<OpenAiStreamChunk>
}
