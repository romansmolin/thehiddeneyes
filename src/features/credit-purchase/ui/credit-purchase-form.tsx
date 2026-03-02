'use client'

import { useState } from 'react'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'

type CreditPurchaseFormProps = {
    presets: readonly number[]
    selectedPreset: number | null
    customAmount: string
    customCredits: number | null
    customError: string | null
    selectedCredits: number | null
    checkoutUrl: string | null
    isSubmitting: boolean
    onSelectPreset: (credits: number) => void
    onCustomAmountChange: (value: string) => void
    onPurchase: () => void
    onCloseCheckout: () => void
}

const EURO_PER_CREDIT = 0.02

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'EUR',
        maximumFractionDigits: 2,
    }).format(value)
}

export const CreditPurchaseForm = ({
    presets,
    selectedPreset,
    customAmount,
    customCredits,
    customError,
    selectedCredits,
    checkoutUrl,
    isSubmitting,
    onSelectPreset,
    onCustomAmountChange,
    onPurchase,
    onCloseCheckout,
}: CreditPurchaseFormProps) => {
    const estimatedAmount = selectedCredits ? selectedCredits * EURO_PER_CREDIT : null
    const [isConsentOpen, setIsConsentOpen] = useState(false)
    const [consentChecked, setConsentChecked] = useState(false)

    const handleOpenConsent = () => {
        setConsentChecked(false)
        setIsConsentOpen(true)
    }

    const handleCloseConsent = () => {
        setConsentChecked(false)
        setIsConsentOpen(false)
    }

    const handleConfirmConsent = () => {
        if (!consentChecked) return
        setIsConsentOpen(false)
        setConsentChecked(false)
        onPurchase()
    }

    return (
        <div className="space-y-6">
            <div className="space-y-3">
                <p className="text-sm font-semibold text-slate-800">Choose a credits pack</p>
                <div className="grid gap-3 sm:grid-cols-3">
                    {presets.map((credits) => {
                        const isActive = selectedPreset === credits
                        return (
                            <button
                                key={credits}
                                type="button"
                                onClick={() => onSelectPreset(credits)}
                                className={`rounded-2xl border px-4 py-3 text-left transition ${
                                    isActive
                                        ? 'border-slate-900 bg-slate-900 text-white'
                                        : 'border-slate-200 bg-white text-slate-900 hover:border-slate-400'
                                }`}
                            >
                                <p className="text-xs uppercase tracking-[0.2em] opacity-70">
                                    Credits
                                </p>
                                <p className="mt-2 text-2xl font-semibold">{credits}</p>
                                <p className="mt-1 text-xs opacity-70">
                                    {formatCurrency(credits * EURO_PER_CREDIT)}
                                </p>
                            </button>
                        )
                    })}
                </div>
            </div>

            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-slate-800">Custom amount</p>
                    <span className="text-xs text-slate-500">€0.02 per credit</span>
                </div>
                <Input
                    type="number"
                    inputMode="decimal"
                    step="0.02"
                    min="0"
                    placeholder="Enter amount in EUR"
                    value={customAmount}
                    onChange={(event) => onCustomAmountChange(event.target.value)}
                />
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                    <span>
                        {customCredits ? `${customCredits} credits` : 'Enter an amount to see credits'}
                    </span>
                    {customError && <span className="text-rose-500">{customError}</span>}
                </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Summary</p>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <p className="text-sm text-slate-600">Credits</p>
                        <p className="text-xl font-semibold text-slate-900">
                            {selectedCredits ?? 0}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-slate-600">Amount</p>
                        <p className="text-xl font-semibold text-slate-900">
                            {estimatedAmount ? formatCurrency(estimatedAmount) : '—'}
                        </p>
                    </div>
                    <Button
                        type="button"
                        onClick={handleOpenConsent}
                        disabled={!selectedCredits || Boolean(customError) || isSubmitting}
                        data-testid="buy-credits-button"
                        className="min-w-[160px]"
                    >
                        {isSubmitting ? 'Starting checkout...' : 'Buy credits'}
                    </Button>
                </div>
            </div>

            {isConsentOpen && (
                <div
                    className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/40 p-4"
                    data-testid="credits-consent-modal"
                >
                    <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
                        <div className="space-y-2">
                            <p className="text-sm font-semibold text-slate-900">
                                Confirm consent
                            </p>
                            <p className="text-sm text-slate-600">
                                Please confirm you agree before proceeding to checkout.
                            </p>
                        </div>
                        <div className="mt-4 flex items-start gap-2">
                            <input
                                id="credits-consent"
                                type="checkbox"
                                className="mt-1 h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                                checked={consentChecked}
                                onChange={(event) => setConsentChecked(event.target.checked)}
                                data-testid="credits-consent-checkbox"
                            />
                            <label
                                htmlFor="credits-consent"
                                className="text-sm leading-snug text-slate-600"
                            >
                                I agree to the{' '}
                                <a
                                    href="/terms-of-service"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="underline hover:text-slate-900"
                                    data-testid="credits-terms-link"
                                >
                                    Terms of Service
                                </a>
                                ,{' '}
                                <a
                                    href="/privacy-policy"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="underline hover:text-slate-900"
                                    data-testid="credits-privacy-link"
                                >
                                    Privacy Policy
                                </a>
                                , and{' '}
                                <a
                                    href="/return-policy"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="underline hover:text-slate-900"
                                    data-testid="credits-return-link"
                                >
                                    Return Policy
                                </a>
                                .
                            </label>
                        </div>
                        <div className="mt-6 flex flex-wrap justify-end gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleCloseConsent}
                                data-testid="credits-consent-cancel"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="button"
                                onClick={handleConfirmConsent}
                                disabled={!consentChecked}
                                data-testid="credits-consent-confirm"
                            >
                                Continue to checkout
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {checkoutUrl && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
                    <div className="relative h-[80vh] w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-xl">
                        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
                            <div>
                                <p className="text-sm font-semibold text-slate-900">
                                    Secure checkout
                                </p>
                                <p className="text-xs text-slate-500">
                                    Complete payment to add credits
                                </p>
                            </div>
                            <Button variant="outline" size="sm" onClick={onCloseCheckout}>
                                Close
                            </Button>
                        </div>
                        <iframe
                            title="Secure Processor checkout"
                            src={checkoutUrl}
                            className="h-full w-full"
                        />
                    </div>
                </div>
            )}
        </div>
    )
}
