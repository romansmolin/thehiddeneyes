import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'TheHiddenEyes — Return Policy',
    description: 'Review refund eligibility and the TheHiddenEyes return policy.',
}

export default function ReturnPolicyPage() {
    return (
        <main className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-16 max-w-3xl">
                <h1 className="text-3xl font-bold tracking-tight">Return Policy</h1>
                <p className="mt-4 text-sm text-muted-foreground">
                    Effective date: January 26, 2026
                </p>

                <section className="mt-8 space-y-4 text-muted-foreground">
                    <p>
                        If you are not satisfied with a purchase, you may request a refund in
                        accordance with the policy below.
                    </p>
                    <p>
                        Requests must be submitted within 14 days of the original purchase date.
                        Refunds are processed to the original payment method.
                    </p>
                </section>

                <section className="mt-10 space-y-4">
                    <h2 className="text-xl font-semibold text-foreground">Eligible refunds</h2>
                    <ul className="list-disc pl-5 text-muted-foreground space-y-2">
                        <li>Duplicate or accidental charges.</li>
                        <li>Billing errors confirmed by our support team.</li>
                        <li>Service unavailability that materially impacted your use.</li>
                    </ul>
                </section>

                <section className="mt-10 space-y-4">
                    <h2 className="text-xl font-semibold text-foreground">Non-refundable items</h2>
                    <ul className="list-disc pl-5 text-muted-foreground space-y-2">
                        <li>Usage-based charges already incurred.</li>
                        <li>Accounts terminated for policy violations.</li>
                    </ul>
                </section>

                <section className="mt-10 space-y-4">
                    <h2 className="text-xl font-semibold text-foreground">How to request</h2>
                    <p className="text-muted-foreground">
                        Contact support with your order details and a brief description of the
                        issue. We will respond within a reasonable time frame.
                    </p>
                </section>
            </div>
        </main>
    )
}
