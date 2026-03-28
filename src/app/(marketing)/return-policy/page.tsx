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
                        accordance with the policy below. We aim to handle all refund requests
                        fairly and transparently.
                    </p>
                    <p>
                        Requests must be submitted within 14 days of the original purchase date.
                        Refunds are processed to the original payment method and may take 5 to
                        10 business days to appear on your statement, depending on your
                        financial institution.
                    </p>
                </section>

                <section className="mt-10 space-y-4">
                    <h2 className="text-xl font-semibold text-foreground">Eligible refunds</h2>
                    <p className="text-muted-foreground">
                        Refunds may be granted in the following circumstances:
                    </p>
                    <ul className="list-disc pl-5 text-muted-foreground space-y-2">
                        <li>Duplicate or accidental charges where you were billed more than once for the same item.</li>
                        <li>Billing errors confirmed by our support team after investigation.</li>
                        <li>Service unavailability that materially impacted your ability to use paid features during the billing period.</li>
                        <li>Technical issues on our end that prevented you from accessing core functionality for an extended period.</li>
                        <li>Subscription charges incurred after a cancellation request was submitted but not processed in time.</li>
                    </ul>
                </section>

                <section className="mt-10 space-y-4">
                    <h2 className="text-xl font-semibold text-foreground">Non-refundable items</h2>
                    <p className="text-muted-foreground">
                        The following are not eligible for refunds:
                    </p>
                    <ul className="list-disc pl-5 text-muted-foreground space-y-2">
                        <li>Usage-based charges that have already been incurred and consumed.</li>
                        <li>Accounts terminated due to violations of our Terms of Service.</li>
                        <li>Purchases made more than 14 days prior to the refund request.</li>
                        <li>Promotional or discounted purchases, unless otherwise stated in the offer terms.</li>
                        <li>Fees for add-on services that have already been fully delivered.</li>
                    </ul>
                </section>

                <section className="mt-10 space-y-4">
                    <h2 className="text-xl font-semibold text-foreground">Partial refunds</h2>
                    <p className="text-muted-foreground">
                        In some cases, we may issue a partial refund based on the unused portion
                        of your subscription or service. Partial refunds are calculated
                        pro-rata from the date of the refund request to the end of the current
                        billing period.
                    </p>
                </section>

                <section className="mt-10 space-y-4">
                    <h2 className="text-xl font-semibold text-foreground">How to request a refund</h2>
                    <p className="text-muted-foreground">
                        To request a refund, contact our support team with the following
                        information:
                    </p>
                    <ul className="list-disc pl-5 text-muted-foreground space-y-2">
                        <li>Your account email address.</li>
                        <li>The date and amount of the charge in question.</li>
                        <li>A brief description of the reason for the refund request.</li>
                        <li>Any relevant screenshots or documentation that support your claim.</li>
                    </ul>
                    <p className="text-muted-foreground">
                        Our support team will review your request and respond within 5 business
                        days. If additional information is needed, we will reach out to you
                        directly.
                    </p>
                </section>

                <section className="mt-10 space-y-4">
                    <h2 className="text-xl font-semibold text-foreground">Disputes</h2>
                    <p className="text-muted-foreground">
                        If you disagree with a refund decision, you may request a secondary
                        review by contacting support and referencing your original request. We
                        encourage you to work with us directly before initiating a chargeback
                        with your payment provider, as chargebacks may result in account
                        suspension.
                    </p>
                </section>

                <section className="mt-10 space-y-4">
                    <h2 className="text-xl font-semibold text-foreground">Changes to this policy</h2>
                    <p className="text-muted-foreground">
                        We may update this Return Policy from time to time. Any changes will be
                        reflected by updating the effective date at the top of this page. We
                        encourage you to review this policy periodically.
                    </p>
                </section>
            </div>
        </main>
    )
}
