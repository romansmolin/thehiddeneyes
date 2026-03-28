# Task 08 — Chat Page

## Goal

Build a chat page with a contacts list and conversation panel.

## Data Flow

```
useGetChatContactsQuery()
  → Returns ContactPreview[]
  → User selects a contact
  → useGetChatMessagesQuery({ contactId })
  → Display messages
  → useSendChatMessageMutation({ contactId, message })
  → Refetch messages after send
```

## API Endpoints Used

### 1. Get contacts
- `GET /api/chat/contacts`
- Returns:
```json
{
  "contacts": [{
    "id": 123,
    "username": "jane",
    "avatarUrl": "https://...",
    "unreadCount": 2,
    "onlineStatus": "online",
    "isFriend": true,
    "lastMessagePreview": "Hey there!"
  }]
}
```

### 2. Get messages
- `GET /api/chat/messages?contactId=123`
- Returns:
```json
{
  "messages": [{
    "id": 1,
    "senderId": 456,
    "text": "Hello!",
    "sentAt": "2026-03-07T10:00:00Z",
    "extra": null
  }]
}
```

### 3. Send message
- `POST /api/chat/send`
- Body: `{ "contactId": 123, "message": "Hi!" }`
- Returns: `{ "message": "Hi!", "date": "2026-03-07T10:01:00Z" }`

## Components to Build

### 1. Contacts Panel

**Displays a list of contacts:**
- Username
- Avatar (or initials placeholder)
- Last message preview (truncated)
- Unread count badge
- Online status indicator (green dot for online, yellow for recent, gray for offline)

**Behavior:**
- Clicking a contact selects it (highlighted)
- Selected contact's messages are loaded in the conversation panel
- Loading state with skeletons
- Error state with retry button
- Empty state: "No contacts yet"

### 2. Conversation Panel

**Displays messages for the selected contact:**
- Messages styled differently for sent vs received:
  - Sent messages: aligned right, accent color background
  - Received messages: aligned left, muted background
- Timestamp for each message (formatted as time, e.g. "10:30 AM")
- Auto-scroll to bottom on new messages

**Message input:**
- Text input field at the bottom
- Send button (or Enter key to send)
- Disable while sending
- Clear input after successful send

**States:**
- No contact selected: "Select a contact to start chatting"
- Loading messages: Skeleton/spinner
- Error loading: Error message with retry
- Empty conversation: "No messages yet. Say hello!"

### 3. Chat View — `src/views/chat-page/ui/chat-view.tsx`

Composes contacts and conversation panels:
- Two-column layout: contacts on left, conversation on right
- Tracks `selectedContactId` state
- Passes selected contact to conversation panel
- On mobile: could show one panel at a time (optional)

## Structure

```
src/views/chat-page/
├── index.ts
└── ui/
    ├── chat-view.tsx
    └── components/
        ├── chat-contacts-panel.tsx
        └── chat-conversation-panel.tsx
```

## Page Route

Update `src/app/(app)/chat/page.tsx`:
```typescript
import { ChatView } from '@/views/chat-page'

export default function Page() {
    return <ChatView />
}
```

## Important Implementation Details

- The `senderId` in messages corresponds to the contact's user ID. Messages where `senderId` matches the contact ID are **received** messages; messages where it doesn't match are **sent** messages.
- Use `useGetChatMessagesQuery({ contactId }, { skip: !contactId })` to conditionally fetch messages only when a contact is selected.
- After sending a message, the `'Chat'` tag is invalidated which auto-refetches contacts and messages.

## Design Notes

- Design the layout however you want
- The key is a functional two-panel chat interface
- Consider using shadcn ScrollArea for the messages container
- All components are `'use client'`
