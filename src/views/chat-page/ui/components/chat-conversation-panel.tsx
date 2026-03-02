import type { ChatMessage, ContactPreview } from '@/entities/chat/model/types'
import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/shared/ui/card'
import { cn } from '@/shared/lib/css/utils'
import { getChatQueryErrorMessage } from '../../lib/get-chat-query-error-message'

type ChatConversationPanelProps = {
    selectedContact: ContactPreview | null
    messages: ChatMessage[]
    isLoadingMessages: boolean
    messagesError: unknown
    onRetryMessages: () => void
    messageInput: string
    isSendingMessage: boolean
    sendError: string | null
    onChangeMessageInput: (value: string) => void
    onSubmitMessage: () => Promise<void>
}

const formatSentAt = (value?: string): string | null => {
    if (!value) return null

    const parsed = new Date(value)
    if (Number.isNaN(parsed.getTime())) {
        return value
    }

    return new Intl.DateTimeFormat(undefined, {
        hour: '2-digit',
        minute: '2-digit',
        month: 'short',
        day: 'numeric',
    }).format(parsed)
}

const MessageSkeletonList = () => {
    return (
        <div className="space-y-3">
            {Array.from({ length: 8 }).map((_, index) => (
                <div
                    key={index}
                    className={cn(
                        'max-w-[80%] rounded-lg border border-border p-3',
                        index % 2 === 0 ? 'mr-auto' : 'ml-auto',
                    )}
                >
                    <div className="h-4 w-28 animate-pulse rounded bg-muted/40" />
                    <div className="mt-2 h-3 w-20 animate-pulse rounded bg-muted/40" />
                </div>
            ))}
        </div>
    )
}

export const ChatConversationPanel = ({
    selectedContact,
    messages,
    isLoadingMessages,
    messagesError,
    onRetryMessages,
    messageInput,
    isSendingMessage,
    sendError,
    onChangeMessageInput,
    onSubmitMessage,
}: ChatConversationPanelProps) => {
    return (
        <Card className="flex h-full flex-col">
            <CardHeader className="pb-3">
                <CardTitle>{selectedContact ? selectedContact.username : 'Conversation'}</CardTitle>
            </CardHeader>

            <CardContent className="flex min-h-0 flex-1 flex-col space-y-4 pb-4">
                {!selectedContact ? (
                    <p className="text-sm text-muted-foreground">
                        Select a contact from the left to open a conversation.
                    </p>
                ) : isLoadingMessages ? (
                    <MessageSkeletonList />
                ) : messagesError ? (
                    <div className="space-y-3">
                        <p className="text-sm text-destructive">
                            {getChatQueryErrorMessage(messagesError)}
                        </p>
                        <Button variant="outline" size="sm" onClick={onRetryMessages}>
                            Retry
                        </Button>
                    </div>
                ) : messages.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No messages yet. Say hello first.</p>
                ) : (
                    <div className="h-full min-h-0 space-y-3 overflow-y-auto pr-1">
                        {messages.map((message) => {
                            const isIncoming =
                                selectedContact != null && message.senderId === selectedContact.id
                            const sentAt = formatSentAt(message.sentAt)

                            return (
                                <div
                                    key={message.id}
                                    className={cn('max-w-[80%] rounded-lg border p-3 text-sm', {
                                        'mr-auto border-border bg-muted/20': isIncoming,
                                        'ml-auto border-foreground/20 bg-primary/10': !isIncoming,
                                    })}
                                >
                                    <p>{message.text ?? message.extra ?? 'Message'}</p>
                                    {sentAt ? (
                                        <p className="mt-1 text-xs text-muted-foreground">{sentAt}</p>
                                    ) : null}
                                </div>
                            )
                        })}
                    </div>
                )}
            </CardContent>

            <CardFooter className="border-t border-border pt-4">
                <form
                    className="w-full space-y-2"
                    onSubmit={(event) => {
                        event.preventDefault()
                        void onSubmitMessage()
                    }}
                >
                    <div className="flex gap-2">
                        <input
                            value={messageInput}
                            onChange={(event) => onChangeMessageInput(event.target.value)}
                            className="h-10 flex-1 rounded-md border border-input bg-background px-3 text-sm"
                            placeholder={
                                selectedContact
                                    ? `Message ${selectedContact.username}...`
                                    : 'Select a contact to send a message'
                            }
                            disabled={!selectedContact || isSendingMessage}
                        />
                        <Button
                            type="submit"
                            disabled={
                                !selectedContact ||
                                isSendingMessage ||
                                messageInput.trim().length === 0
                            }
                        >
                            {isSendingMessage ? 'Sending...' : 'Send'}
                        </Button>
                    </div>

                    {sendError ? <p className="text-sm text-destructive">{sendError}</p> : null}
                </form>
            </CardFooter>
        </Card>
    )
}
