import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { prisma } from '../database/prisma'
import { sendWelcomeEmail } from '@/shared/lib/email/mailer'

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: 'postgresql',
    }),
    databaseHooks: {
        user: {
            create: {
                async after(user) {
                    await sendWelcomeEmail(user.email, user.name)
                },
            },
        },
    },
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: false,
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
            enabled: Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET),
        },
    },
    session: {
        expiresIn: 60 * 60 * 24 * 7, // 7 days
        updateAge: 60 * 60 * 24, // 1 day
    },
    secret: process.env.BETTER_AUTH_SECRET || 'fallback-secret-for-development',
    baseURL: process.env.BETTER_AUTH_URL || 'http://localhost:3000',
})

export type Session = typeof auth.$Infer.Session
