import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'TheHiddenEyes — Cookies Policy',
    description: 'Learn how TheHiddenEyes uses cookies and similar technologies.',
}

export default function CookiesPolicyPage() {
    return (
        <main className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-16 max-w-3xl">
                <h1 className="text-3xl font-bold tracking-tight">Cookies Policy</h1>
                <p className="mt-4 text-sm text-muted-foreground">
                    Effective date: January 26, 2026
                </p>

                <section className="mt-8 space-y-4 text-muted-foreground">
                    <p>
                        This Cookies Policy explains what cookies and similar tracking
                        technologies are, why we use them, and how you can control them when
                        visiting our website and using our services.
                    </p>
                    <p>
                        By continuing to use our website, you consent to the use of cookies
                        as described in this policy. You can change your cookie preferences at
                        any time using your browser settings.
                    </p>
                </section>

                <section className="mt-10 space-y-4">
                    <h2 className="text-xl font-semibold text-foreground">What are cookies</h2>
                    <p className="text-muted-foreground">
                        Cookies are small text files that are stored on your device when you
                        visit a website. They are widely used to make websites work more
                        efficiently, provide a better browsing experience, and supply
                        information to the owners of the site. Cookies can be
                        &quot;persistent&quot; (remaining on your device until deleted or
                        expired) or &quot;session&quot; (deleted when you close your browser).
                    </p>
                </section>

                <section className="mt-10 space-y-4">
                    <h2 className="text-xl font-semibold text-foreground">Types of cookies we use</h2>
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-base font-medium text-foreground">Essential cookies</h3>
                            <p className="mt-2 text-muted-foreground">
                                These cookies are strictly necessary for the website to function.
                                They enable core functionality such as authentication, session
                                management, and security features. You cannot opt out of these
                                cookies as the service would not work without them.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-base font-medium text-foreground">Analytics cookies</h3>
                            <p className="mt-2 text-muted-foreground">
                                We use analytics cookies to understand how visitors interact with
                                our website. These cookies collect information such as the number
                                of visitors, the pages visited, and the time spent on each page.
                                All data is aggregated and anonymous. This helps us improve the
                                performance and usability of our service.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-base font-medium text-foreground">Functional cookies</h3>
                            <p className="mt-2 text-muted-foreground">
                                Functional cookies allow our website to remember choices you make,
                                such as your preferred language, region, or display settings. They
                                provide enhanced, personalized features and help us tailor the
                                service to your needs.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-base font-medium text-foreground">Third-party cookies</h3>
                            <p className="mt-2 text-muted-foreground">
                                Some cookies are placed by third-party services that appear on our
                                pages. We use third-party cookies for payment processing and
                                security verification. We do not control these cookies and
                                recommend reviewing the respective third-party privacy policies.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="mt-10 space-y-4">
                    <h2 className="text-xl font-semibold text-foreground">How long cookies stay on your device</h2>
                    <p className="text-muted-foreground">
                        Session cookies are temporary and are deleted when you close your
                        browser. Persistent cookies remain on your device for a set period or
                        until you manually delete them. The duration varies depending on the
                        cookie and its purpose, but we aim to keep retention periods as short
                        as reasonably necessary.
                    </p>
                </section>

                <section className="mt-10 space-y-4">
                    <h2 className="text-xl font-semibold text-foreground">Managing your cookie preferences</h2>
                    <p className="text-muted-foreground">
                        Most web browsers allow you to control cookies through their settings.
                        You can typically configure your browser to block or delete cookies, or
                        to notify you when a cookie is being set. Please note that disabling
                        certain cookies may affect the functionality of our website and limit
                        your ability to use some features.
                    </p>
                    <ul className="list-disc pl-5 text-muted-foreground space-y-2">
                        <li>Check your browser&apos;s help section for instructions on managing cookies.</li>
                        <li>Use your browser&apos;s privacy or incognito mode to browse without storing cookies.</li>
                        <li>Clear your existing cookies at any time through your browser settings.</li>
                    </ul>
                </section>

                <section className="mt-10 space-y-4">
                    <h2 className="text-xl font-semibold text-foreground">Updates to this policy</h2>
                    <p className="text-muted-foreground">
                        We may update this Cookies Policy from time to time to reflect changes
                        in technology, legislation, or our business operations. When we make
                        changes, we will update the effective date at the top of this page. We
                        encourage you to review this policy periodically.
                    </p>
                </section>

                <section className="mt-10 space-y-4">
                    <h2 className="text-xl font-semibold text-foreground">Contact</h2>
                    <p className="text-muted-foreground">
                        If you have questions about our use of cookies, contact support.
                    </p>
                </section>
            </div>
        </main>
    )
}
