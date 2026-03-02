'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'

import { useSignUpMutation } from '../api/client/endpoints'
import { SignUpDto, signUpSchema } from '@/features/auth/auth-sign-up/contracts/sign-up.dto'
import { normalizeError } from '@/shared/api/client/error-normalizer'
import { Alert } from '@/shared/ui/alert'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'

const genderOptions: Array<{ value: SignUpDto['gender']; label: string }> = [
    { value: 'man', label: 'Man' },
    { value: 'woman', label: 'Woman' },
    { value: 'non_binary', label: 'Non-binary' },
    { value: 'other', label: 'Other' },
]

const lookingForOptions: Array<{ value: SignUpDto['lookingFor']; label: string }> = [
    { value: 'man', label: 'Man' },
    { value: 'women', label: 'Women' },
    { value: 'couple', label: 'Couple' },
    { value: 'other', label: 'Other' },
]

export function SignUpForm() {
    const router = useRouter()
    const [signUp, { isLoading }] = useSignUpMutation()
    const [error, setError] = useState<string | null>(null)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpDto>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            username: '',
            email: '',
            password: '',
            gender: 'woman',
            lookingFor: 'man',
            dateOfBirth: '',
            city: '',
            consent: false,
        },
    })

    const onSubmit = async (data: SignUpDto) => {
        try {
            setError(null)
            await signUp(data).unwrap()
            router.push('/dashboard')
        } catch (err) {
            const normalized = normalizeError(err)
            setError(normalized.message)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" data-testid="sign-up-form">
            {error && (
                <Alert variant="destructive" data-testid="error-message">
                    {error}
                </Alert>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                        id="username"
                        type="text"
                        placeholder="your.username"
                        autoComplete="username"
                        {...register('username')}
                        data-testid="username-input"
                    />
                    {errors.username && (
                        <p className="text-sm text-destructive">{errors.username.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        autoComplete="email"
                        {...register('email')}
                        data-testid="email-input"
                    />
                    {errors.email && (
                        <p className="text-sm text-destructive">{errors.email.message}</p>
                    )}
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                    id="password"
                    type="password"
                    placeholder="Create a strong password"
                    autoComplete="new-password"
                    {...register('password')}
                    data-testid="password-input"
                />
                {errors.password && (
                    <p className="text-sm text-destructive">{errors.password.message}</p>
                )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="gender">I am</Label>
                    <select
                        id="gender"
                        {...register('gender')}
                        className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                    >
                        {genderOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                    {errors.gender && (
                        <p className="text-sm text-destructive">{errors.gender.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="lookingFor">Looking for</Label>
                    <select
                        id="lookingFor"
                        {...register('lookingFor')}
                        className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                    >
                        {lookingForOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                    {errors.lookingFor && (
                        <p className="text-sm text-destructive">{errors.lookingFor.message}</p>
                    )}
                </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of birth</Label>
                    <Input
                        id="dateOfBirth"
                        type="date"
                        {...register('dateOfBirth')}
                        data-testid="date-of-birth-input"
                    />
                    {errors.dateOfBirth && (
                        <p className="text-sm text-destructive">{errors.dateOfBirth.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="city">City code (optional)</Label>
                    <Input
                        id="city"
                        type="text"
                        placeholder="123"
                        {...register('city')}
                        data-testid="city-input"
                    />
                    {errors.city && (
                        <p className="text-sm text-destructive">{errors.city.message}</p>
                    )}
                </div>
            </div>

            <div className="space-y-1">
                <div className="flex items-start gap-2">
                    <input
                        id="consent"
                        type="checkbox"
                        className="mt-1 h-4 w-4 rounded border-slate-300"
                        {...register('consent')}
                        data-testid="sign-up-consent-checkbox"
                    />
                    <Label
                        htmlFor="consent"
                        className="text-sm font-normal leading-snug text-slate-600"
                    >
                        I agree to the{' '}
                        <a href="/terms-of-service" target="_blank" rel="noreferrer" className="underline hover:text-slate-900">
                            Terms of Service
                        </a>
                        ,{' '}
                        <a href="/privacy-policy" target="_blank" rel="noreferrer" className="underline hover:text-slate-900">
                            Privacy Policy
                        </a>
                        , and{' '}
                        <a href="/return-policy" target="_blank" rel="noreferrer" className="underline hover:text-slate-900">
                            Return Policy
                        </a>
                        .
                    </Label>
                </div>
                {errors.consent && (
                    <p className="text-sm text-destructive" data-testid="sign-up-consent-error">
                        {errors.consent.message}
                    </p>
                )}
            </div>

            <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
                data-testid="submit-button"
            >
                {isLoading ? 'Creating account...' : 'Create account'}
            </Button>
        </form>
    )
}
