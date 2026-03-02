'use client'

import { useEffect, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import { toast } from 'sonner'
import { GenericCard } from '@/shared/components'
import { CreditPurchaseForm, useCreditPurchase } from '@/features/credit-purchase'
import { WalletSummary, WalletTransactions, useWallet } from '@/features/credit-wallet'

export const WalletPage = () => {
    const searchParams = useSearchParams()
    const notifiedRef = useRef(false)

    const { wallet, isLoading, refreshWallet } = useWallet()

    const {
        presets,
        selectedPreset,
        customAmount,
        customCredits,
        customError,
        selectedCredits,
        checkoutUrl,
        isSubmitting,
        selectPreset,
        updateCustomAmount,
        startPurchase,
        closeCheckout,
    } = useCreditPurchase({
        onCheckoutReady: refreshWallet,
    })

    useEffect(() => {
        if (notifiedRef.current) return
        const status = searchParams.get('status')
        if (!status) return

        notifiedRef.current = true

        if (status === 'successful') {
            toast.success('Payment successful. Credits will be added shortly.')
            void refreshWallet()
            return
        }

        if (status === 'pending') {
            toast('Payment is pending. We will update your balance soon.')
            void refreshWallet()
            return
        }

        toast.error('Payment failed or was declined.')
        void refreshWallet()
    }, [searchParams, refreshWallet])

    const handleCloseCheckout = () => {
        closeCheckout()
        void refreshWallet()
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="mx-auto w-full max-w-6xl space-y-8 px-4 pb-16 pt-10">
                <header className="space-y-2">
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Wallet</p>
                    <h1 className="text-3xl font-semibold text-slate-900">Manage your credits</h1>
                    <p className="text-sm text-slate-600">
                        Buy credits to use platform features. Top up your balance anytime.
                    </p>
                </header>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <GenericCard
                        cardTitle="Buy credits"
                        cardDescription="Pick a pack or enter a custom amount."
                        cardContent={
                            <CreditPurchaseForm
                                presets={presets}
                                selectedPreset={selectedPreset}
                                customAmount={customAmount}
                                customCredits={customCredits}
                                customError={customError}
                                selectedCredits={selectedCredits}
                                checkoutUrl={checkoutUrl}
                                isSubmitting={isSubmitting}
                                onSelectPreset={selectPreset}
                                onCustomAmountChange={updateCustomAmount}
                                onPurchase={startPurchase}
                                onCloseCheckout={handleCloseCheckout}
                            />
                        }
                    />

                    <GenericCard
                        cardTitle="Wallet summary"
                        cardDescription="Overview of your credits."
                        cardContent={
                            wallet ? (
                                <WalletSummary summary={wallet.wallet} />
                            ) : (
                                <div className="grid gap-3">
                                    <div className="h-24 animate-pulse rounded-2xl bg-slate-100" />
                                    <div className="h-24 animate-pulse rounded-2xl bg-slate-100" />
                                </div>
                            )
                        }
                    />
                </div>

                <GenericCard
                    cardTitle="Transactions"
                    cardDescription="Latest credit activity and payment status."
                    cardContent={
                        <WalletTransactions
                            transactions={wallet?.transactions ?? []}
                            isLoading={isLoading}
                        />
                    }
                />
            </div>
        </div>
    )
}
