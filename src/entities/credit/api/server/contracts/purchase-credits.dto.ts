import { z } from 'zod'

export const purchaseCreditsSchema = z.object({
    credits: z.number().int().min(1),
})

export type PurchaseCreditsDto = z.infer<typeof purchaseCreditsSchema>
