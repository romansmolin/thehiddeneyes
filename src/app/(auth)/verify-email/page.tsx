import { Alert } from '@/shared/ui/alert'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card'
import { Suspense } from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'TheHiddenEyes — Verify Email',
    description: 'Verify your email address to activate your TheHiddenEyes account.',
}

function VerifyEmailContent() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Email Verification</CardTitle>
                <CardDescription>Verifying your email address</CardDescription>
            </CardHeader>
            <CardContent>
                <Alert>
                    Email verification is handled by Better Auth automatically. You will be
                    redirected after verification.
                </Alert>
            </CardContent>
        </Card>
    )
}

export default function VerifyEmailPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <VerifyEmailContent />
        </Suspense>
    )
}
