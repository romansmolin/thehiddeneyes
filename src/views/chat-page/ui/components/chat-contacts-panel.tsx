import type { ContactPreview } from '@/entities/chat/model/types'
import { getUserInitials } from '@/entities/user/utils/user-display'
import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { cn } from '@/shared/lib/css/utils'
import { getChatQueryErrorMessage } from '../../lib/get-chat-query-error-message'

type ChatContactsPanelProps = {
    contacts: ContactPreview[]
    selectedContactId: number | null
    isLoading: boolean
    error: unknown
    onRetry: () => void
    onSelectContact: (contactId: number) => void
}

const ContactSkeletonList = () => {
    return (
        <ul className="space-y-2">
            {Array.from({ length: 6 }).map((_, index) => (
                <li key={index} className="rounded-lg border border-border p-3">
                    <div className="h-4 w-2/3 animate-pulse rounded bg-muted/40" />
                    <div className="mt-2 h-3 w-1/2 animate-pulse rounded bg-muted/40" />
                </li>
            ))}
        </ul>
    )
}

export const ChatContactsPanel = ({
    contacts,
    selectedContactId,
    isLoading,
    error,
    onRetry,
    onSelectContact,
}: ChatContactsPanelProps) => {
    return (
        <Card className="flex h-full flex-col">
            <CardHeader className="pb-3">
                <CardTitle>Contacts</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 pb-5">
                {isLoading ? (
                    <ContactSkeletonList />
                ) : error ? (
                    <div className="space-y-3">
                        <p className="text-sm text-destructive">{getChatQueryErrorMessage(error)}</p>
                        <Button variant="outline" size="sm" onClick={onRetry}>
                            Retry
                        </Button>
                    </div>
                ) : contacts.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No contacts available right now.</p>
                ) : (
                    <ul className="space-y-2">
                        {contacts.map((contact) => {
                            const isSelected = selectedContactId === contact.id

                            return (
                                <li key={contact.id}>
                                    <button
                                        type="button"
                                        onClick={() => onSelectContact(contact.id)}
                                        className={cn(
                                            'w-full rounded-lg border p-3 text-left transition-colors',
                                            isSelected
                                                ? 'border-foreground/40 bg-muted/50'
                                                : 'border-border hover:bg-muted/30',
                                        )}
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className="grid size-9 shrink-0 place-items-center rounded-full border border-border text-xs font-semibold">
                                                {getUserInitials(contact.username)}
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <div className="flex items-center gap-2">
                                                    <p className="truncate text-sm font-semibold">
                                                        {contact.username}
                                                    </p>
                                                    {contact.unreadCount ? (
                                                        <span className="rounded-full bg-primary/20 px-2 py-0.5 text-xs font-semibold">
                                                            {contact.unreadCount}
                                                        </span>
                                                    ) : null}
                                                </div>
                                                <p className="truncate text-xs text-muted-foreground">
                                                    {contact.lastMessagePreview ?? 'No recent messages'}
                                                </p>
                                            </div>
                                        </div>
                                    </button>
                                </li>
                            )
                        })}
                    </ul>
                )}
            </CardContent>
        </Card>
    )
}
