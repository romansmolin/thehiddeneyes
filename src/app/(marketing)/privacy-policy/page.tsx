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
                        information when you use our services. We are committed to safeguarding
                        your privacy and ensuring transparency in how we handle your personal
                        data.
                    </p>
                    <p>
                        By accessing or using our service, you agree to the collection and use
                        of information as described in this policy. If you do not agree, please
                        discontinue use of the service.
                    </p>
                </section>

                <section className="mt-10 space-y-4">
                    <h2 className="text-xl font-semibold text-foreground">Information we collect</h2>
                    <p className="text-muted-foreground">
                        We collect several types of information to provide and improve our
                        service:
                    </p>
                    <ul className="list-disc pl-5 text-muted-foreground space-y-2">
                        <li>Account information such as name, email address, and profile details you provide during registration.</li>
                        <li>Usage data including pages visited, features used, actions taken, timestamps, and referring URLs.</li>
                        <li>Device information such as browser type, operating system, IP address, and device identifiers.</li>
                        <li>Payment details processed securely by our third-party payment provider. We do not store full payment card numbers on our servers.</li>
                        <li>Communications data from support requests, feedback, or other correspondence you send to us.</li>
                    </ul>
                </section>

                <section className="mt-10 space-y-4">
                    <h2 className="text-xl font-semibold text-foreground">How we use data</h2>
                    <p className="text-muted-foreground">
                        The information we collect is used for the following purposes:
                    </p>
                    <ul className="list-disc pl-5 text-muted-foreground space-y-2">
                        <li>Provide, operate, and maintain the service.</li>
                        <li>Improve, personalize, and expand the service based on usage patterns.</li>
                        <li>Communicate important updates, security alerts, and support messages.</li>
                        <li>Process transactions and send related billing information.</li>
                        <li>Detect, prevent, and address fraud, abuse, and technical issues.</li>
                        <li>Comply with legal obligations and enforce our terms of service.</li>
                    </ul>
                </section>

                <section className="mt-10 space-y-4">
                    <h2 className="text-xl font-semibold text-foreground">Data sharing and disclosure</h2>
                    <p className="text-muted-foreground">
                        We do not sell your personal information. We may share data in the
                        following limited circumstances:
                    </p>
                    <ul className="list-disc pl-5 text-muted-foreground space-y-2">
                        <li>With service providers who assist in operating our platform, subject to confidentiality agreements.</li>
                        <li>When required by law, regulation, or legal process.</li>
                        <li>To protect the rights, safety, or property of our users or the public.</li>
                        <li>In connection with a merger, acquisition, or sale of assets, with prior notice to affected users.</li>
                    </ul>
                </section>

                <section className="mt-10 space-y-4">
                    <h2 className="text-xl font-semibold text-foreground">Data security</h2>
                    <p className="text-muted-foreground">
                        We implement industry-standard security measures to protect your
                        information, including encryption in transit and at rest, access
                        controls, and regular security assessments. However, no method of
                        transmission over the internet is completely secure, and we cannot
                        guarantee absolute security.
                    </p>
                </section>

                <section className="mt-10 space-y-4">
                    <h2 className="text-xl font-semibold text-foreground">Data retention</h2>
                    <p className="text-muted-foreground">
                        We retain your personal data only for as long as necessary to fulfill
                        the purposes described in this policy, comply with legal obligations,
                        resolve disputes, and enforce our agreements. When data is no longer
                        needed, it is securely deleted or anonymized.
                    </p>
                </section>

                <section className="mt-10 space-y-4">
                    <h2 className="text-xl font-semibold text-foreground">Your rights and choices</h2>
                    <p className="text-muted-foreground">
                        Depending on your jurisdiction, you may have the following rights
                        regarding your personal data:
                    </p>
                    <ul className="list-disc pl-5 text-muted-foreground space-y-2">
                        <li>Access the personal data we hold about you.</li>
                        <li>Request correction of inaccurate or incomplete data.</li>
                        <li>Request deletion of your personal data, subject to legal retention requirements.</li>
                        <li>Object to or restrict certain types of data processing.</li>
                        <li>Request a portable copy of your data in a structured, machine-readable format.</li>
                        <li>Withdraw consent at any time where processing is based on consent.</li>
                    </ul>
                    <p className="text-muted-foreground">
                        To exercise any of these rights, please contact our support team. We
                        will respond to your request within a reasonable time frame.
                    </p>
                </section>

                <section className="mt-10 space-y-4">
                    <h2 className="text-xl font-semibold text-foreground">Changes to this policy</h2>
                    <p className="text-muted-foreground">
                        We may update this Privacy Policy from time to time. When we make
                        changes, we will revise the effective date at the top of this page and,
                        where appropriate, notify you via email or through the service. We
                        encourage you to review this policy periodically.
                    </p>
                </section>

                <section className="mt-10 space-y-4">
                    <h2 className="text-xl font-semibold text-foreground">Contact</h2>
                    <p className="text-muted-foreground">
                        If you have questions or concerns about this policy or our data
                        practices, contact support. We take every inquiry seriously and will
                        work to address your concerns promptly.
                    </p>
                </section>
            </div>
        </main>
    )
}
