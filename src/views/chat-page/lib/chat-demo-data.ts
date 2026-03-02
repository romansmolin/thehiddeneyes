import type { ContactPreview, ChatMessage } from '@/entities/chat/model/types'

export const DEMO_CONTACTS: ContactPreview[] = [
    {
        id: 1,
        username: 'Sophie',
        onlineStatus: 'online',
        unreadCount: 2,
        lastMessagePreview: 'Are you free this weekend?',
    },
    {
        id: 2,
        username: 'Emma',
        onlineStatus: 'recent',
        unreadCount: 0,
        lastMessagePreview: 'That sounds like a great plan!',
    },
    {
        id: 3,
        username: 'Mia',
        onlineStatus: 'offline',
        unreadCount: 0,
        lastMessagePreview: 'Haha yes, totally agree',
    },
    {
        id: 4,
        username: 'Olivia',
        onlineStatus: 'online',
        unreadCount: 1,
        lastMessagePreview: 'Just got back from Paris',
    },
]

const now = new Date()
const ago = (minutes: number) => new Date(now.getTime() - minutes * 60 * 1000).toISOString()

export const DEMO_MESSAGES: Record<number, ChatMessage[]> = {
    1: [
        { id: 101, senderId: 1, text: 'Hey! How are you doing?', sentAt: ago(120) },
        { id: 102, senderId: 0, text: 'Hi Sophie! I\'m great, thanks for asking.', sentAt: ago(118) },
        { id: 103, senderId: 1, text: 'Doing really well! Just got back from a hiking trip', sentAt: ago(115) },
        { id: 104, senderId: 0, text: 'Oh wow, that sounds amazing! Where did you go?', sentAt: ago(110) },
        { id: 105, senderId: 1, text: 'Lake District in England — absolutely breathtaking views', sentAt: ago(108) },
        { id: 106, senderId: 0, text: 'I\'ve always wanted to go there!', sentAt: ago(60) },
        { id: 107, senderId: 1, text: 'Are you free this weekend?', sentAt: ago(5) },
    ],
    2: [
        { id: 201, senderId: 0, text: 'Hey Emma, loved your profile!', sentAt: ago(1440) },
        { id: 202, senderId: 2, text: 'Thank you! You seem really interesting too', sentAt: ago(1430) },
        { id: 203, senderId: 0, text: 'Maybe we should plan something!', sentAt: ago(235) },
        { id: 204, senderId: 2, text: 'That sounds like a great plan!', sentAt: ago(230) },
    ],
    3: [
        { id: 301, senderId: 3, text: 'Hi there! I saw you like jazz music', sentAt: ago(2880) },
        { id: 302, senderId: 0, text: 'Hey Mia! Yes, huge fan. Do you play?', sentAt: ago(2870) },
        { id: 303, senderId: 3, text: 'I play piano! Been taking lessons since I was 8', sentAt: ago(2865) },
        { id: 304, senderId: 3, text: 'Haha yes, totally agree', sentAt: ago(2845) },
    ],
    4: [
        { id: 401, senderId: 4, text: 'Just got back from Paris', sentAt: ago(30) },
        { id: 402, senderId: 4, text: 'The food was absolutely incredible', sentAt: ago(28) },
    ],
}
