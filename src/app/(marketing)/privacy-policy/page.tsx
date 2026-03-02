import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'TheHiddenEyes — Privacy Policy',
    description: 'Learn how TheHiddenEyes collects, uses, and protects your data.',
}

export default function PrivacyPolicyPage() {
    return (
        <main className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-16 max-w-3xl">
                <h1 className="text-3xl font-bold tracking-tight">Privacy Policy</h1>
                <p className="mt-4 text-sm text-muted-foreground">
                    Effective date: January 26, 2026
                </p>

                <section className="mt-8 space-y-4 text-muted-foreground">
                    <p>
                        This Privacy Policy explains how we collect, use, and protect your
                        information when you use our services.
                    </p>
                </section>

                <section className="mt-10 space-y-4">
                    <h2 className="text-xl font-semibold text-foreground">Information we collect</h2>
                    <ul className="list-disc pl-5 text-muted-foreground space-y-2">
                        <li>Account information such as name and email address.</li>
                        <li>Usage data including pages visited and actions taken.</li>
                        <li>Payment details processed by our payment provider.</li>
                    </ul>
                </section>

                <section className="mt-10 space-y-4">
                    <h2 className="text-xl font-semibold text-foreground">How we use data</h2>
                    <ul className="list-disc pl-5 text-muted-foreground space-y-2">
                        <li>Provide and improve the service.</li>
                        <li>Communicate important updates and support messages.</li>
                        <li>Maintain security and prevent abuse.</li>
                    </ul>
                </section>

                <section className="mt-10 space-y-4">
                    <h2 className="text-xl font-semibold text-foreground">Your choices</h2>
                    <p className="text-muted-foreground">
                        You can update your account information or request deletion by contacting
                        support. We retain data only as necessary to provide the service and meet
                        legal obligations.
                    </p>
                </section>

                <section className="mt-10 space-y-4">
                    <h2 className="text-xl font-semibold text-foreground">Contact</h2>
                    <p className="text-muted-foreground">
                        If you have questions about this policy, contact support.
                    </p>
                </section>
            </div>
        </main>
    )
}
