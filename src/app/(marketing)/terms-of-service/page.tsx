import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'TheHiddenEyes — Terms of Service',
    description: 'Read the TheHiddenEyes terms of service.',
}

export default function TermsOfServicePage() {
    return (
        <main className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-16 max-w-3xl">
                <h1 className="text-3xl font-bold tracking-tight">Terms of Service</h1>
                <p className="mt-4 text-sm text-muted-foreground">
                    Effective date: January 26, 2026
                </p>

                <section className="mt-8 space-y-4 text-muted-foreground">
                    <p>
                        These Terms of Service govern your access to and use of our application,
                        website, and related services. By using the service, you agree to these
                        terms.
                    </p>
                    <p>
                        You are responsible for all activity that occurs under your account. You
                        must provide accurate information and keep your credentials secure.
                    </p>
                </section>

                <section className="mt-10 space-y-4">
                    <h2 className="text-xl font-semibold text-foreground">Acceptable use</h2>
                    <ul className="list-disc pl-5 text-muted-foreground space-y-2">
                        <li>Use the service only for lawful purposes.</li>
                        <li>Do not attempt to reverse engineer or disrupt the service.</li>
                        <li>Respect intellectual property and privacy rights.</li>
                    </ul>
                </section>

                <section className="mt-10 space-y-4">
                    <h2 className="text-xl font-semibold text-foreground">Payments and refunds</h2>
                    <p className="text-muted-foreground">
                        If you purchase paid features, you agree to our pricing and billing terms.
                        Refund eligibility is described in our Return Policy.
                    </p>
                </section>

                <section className="mt-10 space-y-4">
                    <h2 className="text-xl font-semibold text-foreground">Termination</h2>
                    <p className="text-muted-foreground">
                        We may suspend or terminate access if we reasonably believe you have
                        violated these terms or if required by law.
                    </p>
                </section>

                <section className="mt-10 space-y-4">
                    <h2 className="text-xl font-semibold text-foreground">Contact</h2>
                    <p className="text-muted-foreground">
                        For questions about these terms, contact support.
                    </p>
                </section>
            </div>
        </main>
    )
}
