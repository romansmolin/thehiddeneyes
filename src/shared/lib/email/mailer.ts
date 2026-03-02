import 'server-only'
import nodemailer from 'nodemailer'

type SendEmailInput = {
    to: string
    subject: string
    text: string
    html?: string
}

const smtpHost = process.env.SMTP_HOST
const smtpPort = Number(process.env.SMTP_PORT ?? '465')
const smtpSecure = (process.env.SMTP_SECURE ?? 'true') === 'true'
const smtpUser = process.env.SMTP_USER
const smtpPass = process.env.SMTP_PASS

const fromName = process.env.SMTP_FROM_NAME ?? 'Your App'
const fromEmail = process.env.SMTP_FROM_EMAIL ?? smtpUser ?? 'no-reply@yourdomain.com'

let cachedTransporter: nodemailer.Transporter | null = null

const getTransporter = () => {
    if (cachedTransporter) return cachedTransporter

    if (!smtpHost || !smtpUser || !smtpPass) {
        console.error('[Email] Missing SMTP configuration.')
        return null
    }

    cachedTransporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpSecure,
        auth: {
            user: smtpUser,
            pass: smtpPass,
        },
    })

    return cachedTransporter
}

export const sendEmail = async ({ to, subject, text, html }: SendEmailInput) => {
    const transporter = getTransporter()
    if (!transporter) return false

    try {
        await transporter.sendMail({
            from: `"${fromName}" <${fromEmail}>`,
            to,
            subject,
            text,
            html,
        })
        return true
    } catch (error) {
        console.error('[Email] Failed to send email:', error)
        return false
    }
}

export const sendWelcomeEmail = async (email: string, name?: string | null) => {
    const recipient = name?.trim() ? name.trim() : 'there'
    return sendEmail({
        to: email,
        subject: 'Welcome to Our Platform',
        text: `Hi ${recipient},\n\nThanks for signing up! You can now start using the platform right away.\n\nNeed help? Reply to this email and we will assist you.\n\n— The Team`,
    })
}

export const sendPaymentSuccessEmail = async ({
    email,
    credits,
}: {
    email: string
    credits: number
}) => {
    return sendEmail({
        to: email,
        subject: 'Payment successful — credits added',
        text: `Your payment was successful and ${credits} credits have been added to your wallet.\n\nThank you for using our platform.`,
    })
}
