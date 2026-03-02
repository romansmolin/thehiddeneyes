import { CurrentGiftsSection } from './components/current-gifts-section'
import { GiftShopSection } from './components/gift-shop-section'

export function GiftsView() {
    return (
        <section className="space-y-8">
            <GiftShopSection />
            <CurrentGiftsSection />
        </section>
    )
}
