'use client'

import { skipToken } from '@reduxjs/toolkit/query'
import { useState } from 'react'
import {
    useGetChatContactsQuery,
    useGetChatMessagesQuery,
    useSendChatMessageMutation,
} from '@/entities/chat/api/client/endpoints'
import type { ChatMessage, ContactPreview } from '@/entities/chat/model/types'
import { ChatContactsPanel } from './components/chat-contacts-panel'
import { ChatConversationPanel } from './components/chat-conversation-panel'
import { getChatQueryErrorMessage } from '../lib/get-chat-query-error-message'
import { DEMO_CONTACTS, DEMO_MESSAGES } from '../lib/chat-demo-data'

// Set to false to use real API data
const DEMO_MODE = true

type SendMessageMutationError = {
    data?: {
        message?: string
    }
    message?: string
    error?: string
}

const resolveSelectedContact = (
    contacts: ContactPreview[],
    selectedContactId: number | null,
): ContactPreview | null => {
    if (contacts.length === 0) return null
    if (selectedContactId == null) return contacts[0]

    return contacts.find((contact) => contact.id === selectedContactId) ?? contacts[0]
}

function ChatViewDemo() {
    const [contacts, setContacts] = useState<ContactPreview[]>(DEMO_CONTACTS)
    const [selectedContactId, setSelectedContactId] = useState<number | null>(null)
    const [messageInput, setMessageInput] = useState('')
    const [demoMessages, setDemoMessages] = useState<Record<number, ChatMessage[]>>(DEMO_MESSAGES)

    const selectedContact = resolveSelectedContact(contacts, selectedContactId)
    const messages = selectedContact ? (demoMessages[selectedContact.id] ?? []) : []

    const onSubmitMessage = async () => {
        if (!selectedContact) return
        const text = messageInput.trim()
        if (!text) return

        const newMessage: ChatMessage = {
            id: Date.now(),
            senderId: 0,
            text,
            sentAt: new Date().toISOString(),
        }

        setDemoMessages((prev) => ({
            ...prev,
            [selectedContact.id]: [...(prev[selectedContact.id] ?? []), newMessage],
        }))

        setContacts((prev) =>
            prev.map((c) =>
                c.id === selectedContact.id ? { ...c, lastMessagePreview: text, unreadCount: 0 } : c,
            ),
        )

        setMessageInput('')
    }

    return (
        <section className="grid gap-6 lg:min-h-[calc(100dvh-16rem)] lg:grid-cols-[320px_1fr] lg:items-stretch">
            <div className="h-full">
                <ChatContactsPanel
                    contacts={contacts}
                    selectedContactId={selectedContact?.id ?? null}
                    isLoading={false}
                    error={null}
                    onRetry={() => {}}
                    onSelectContact={setSelectedContactId}
                />
            </div>

            <div className="h-full">
                <ChatConversationPanel
                    selectedContact={selectedContact}
                    messages={messages}
                    isLoadingMessages={false}
                    messagesError={null}
                    onRetryMessages={() => {}}
                    messageInput={messageInput}
                    isSendingMessage={false}
                    sendError={null}
                    onChangeMessageInput={(value) => setMessageInput(value)}
                    onSubmitMessage={onSubmitMessage}
                />
            </div>
        </section>
    )
}

function ChatViewReal() {
    const contactsQuery = useGetChatContactsQuery()
    const [selectedContactId, setSelectedContactId] = useState<number | null>(null)
    const [messageInput, setMessageInput] = useState('')
    const [sendError, setSendError] = useState<string | null>(null)
    const [sendChatMessage, sendMessageResult] = useSendChatMessageMutation()

    const contacts = contactsQuery.data?.contacts ?? []
    const selectedContact = resolveSelectedContact(contacts, selectedContactId)

    const messagesQuery = useGetChatMessagesQuery(
        selectedContact
            ? {
                  contactId: selectedContact.id,
                  contact: selectedContact.username,
              }
            : skipToken,
    )

    const onSubmitMessage = async () => {
        if (!selectedContact) return

        const message = messageInput.trim()
        if (!message) return

        setSendError(null)

        try {
            await sendChatMessage({
                contactId: selectedContact.id,
                contact: selectedContact.username,
                message,
            }).unwrap()

            setMessageInput('')
            void messagesQuery.refetch()
        } catch (error) {
            const parsed = error as SendMessageMutationError
            setSendError(
                parsed.data?.message ??
                    parsed.error ??
                    parsed.message ??
                    getChatQueryErrorMessage(error),
            )
        }
    }

    return (
        <section className="grid gap-6 lg:min-h-[calc(100dvh-16rem)] lg:grid-cols-[320px_1fr] lg:items-stretch">
            <div className="h-full">
                <ChatContactsPanel
                    contacts={contacts}
                    selectedContactId={selectedContact?.id ?? null}
                    isLoading={contactsQuery.isLoading}
                    error={contactsQuery.error}
                    onRetry={() => void contactsQuery.refetch()}
                    onSelectContact={setSelectedContactId}
                />
            </div>

            <div className="h-full">
                <ChatConversationPanel
                    selectedContact={selectedContact}
                    messages={messagesQuery.data?.messages ?? []}
                    isLoadingMessages={messagesQuery.isLoading}
                    messagesError={messagesQuery.error}
                    onRetryMessages={() => void messagesQuery.refetch()}
                    messageInput={messageInput}
                    isSendingMessage={sendMessageResult.isLoading}
                    sendError={sendError}
                    onChangeMessageInput={(value) => {
                        setMessageInput(value)
                        if (sendError) setSendError(null)
                    }}
                    onSubmitMessage={onSubmitMessage}
                />
            </div>
        </section>
    )
}

export function ChatView() {
    return DEMO_MODE ? <ChatViewDemo /> : <ChatViewReal />
}
