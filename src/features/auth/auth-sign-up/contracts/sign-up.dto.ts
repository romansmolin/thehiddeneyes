import { z } from 'zod'
import { emailSchema, passwordSchema } from '@/shared/lib/validation/common-schemas'
import { GENDER_VALUES, LOOKING_FOR_VALUES } from '@/shared/lib/auth/external-auth.types'

export const signUpSchema = z.object({
    username: z.string().trim().min(1, 'Username is required'),
    email: emailSchema,
    password: passwordSchema,
    gender: z.enum(GENDER_VALUES),
    lookingFor: z.enum(LOOKING_FOR_VALUES),
    dateOfBirth: z.string().min(1, 'Date of birth is required'),
    city: z
        .string()
        .trim()
        .refine((value) => value === '' || /^\d+$/.test(value), {
            message: 'City must be numeric',
        })
        .optional(),
    consent: z.boolean().refine((value) => value, {
        message: 'Consent is required',
    }),
})

export type SignUpDto = z.infer<typeof signUpSchema>
