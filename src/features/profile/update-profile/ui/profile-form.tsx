'use client'

import Image from 'next/image'
import { Sparkles } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/shared/ui/dialog'
import { getUserInitials } from '@/entities/user/utils/user-display'
import { useProfileForm } from '../model/use-profile-form'

const numberFields = [
    { key: 'height', label: 'Height (cm)' },
    { key: 'weight', label: 'Weight (kg)' },
    { key: 'eyeColor', label: 'Eye Color Code' },
    { key: 'hairColor', label: 'Hair Color Code' },
    { key: 'situation', label: 'Situation Code' },
    { key: 'silhouette', label: 'Silhouette Code' },
    { key: 'personality', label: 'Personality Code' },
    { key: 'schedule', label: 'Schedule Code' },
    { key: 'orientation', label: 'Orientation Code' },
    { key: 'children', label: 'Children Code' },
    { key: 'education', label: 'Education Code' },
    { key: 'profession', label: 'Profession Code' },
] as const

const getQueryErrorMessage = (error: unknown): string => {
    if (!error || typeof error !== 'object') {
        return 'Unable to load profile.'
    }

    const parsed = error as { data?: { message?: string }; message?: string; error?: string }
    return parsed.data?.message ?? parsed.message ?? parsed.error ?? 'Unable to load profile.'
}

export function ProfileForm() {
    const {
        register,
        profile,
        onSubmit,
        formState: { errors },
        isLoadingProfile,
        isLoadingProfileError,
        profileError,
        refetchProfile,
        isSaving,
        successMessage,
        isAnalysisDialogOpen,
        setIsAnalysisDialogOpen,
        analysisResult,
        analysisError,
        isAnalyzing,
        onAnalyze,
    } = useProfileForm()

    if (isLoadingProfile) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>Loading your profile...</CardDescription>
                </CardHeader>
            </Card>
        )
    }

    if (isLoadingProfileError) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription className="text-destructive">
                        {getQueryErrorMessage(profileError)}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button variant="outline" onClick={() => void refetchProfile()}>
                        Retry
                    </Button>
                </CardContent>
            </Card>
        )
    }

    return (
        <div className="flex flex-col gap-5 h-full">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button
                    type="button"
                    variant="secondary"
                    className="h-11 w-full sm:w-auto"
                    onClick={() => void onAnalyze()}
                    disabled={isAnalyzing}
                >
                    <Sparkles />
                    {isAnalyzing ? 'Analyzing...' : 'Analyze with AI'}
                </Button>

                <Button type="submit" className="h-11 w-full sm:w-auto" disabled={isSaving}>
                    {isSaving ? 'Saving...' : 'Save Profile'}
                </Button>
            </div>
            <form className="grid grid-cols-2 gap-5 h-full" onSubmit={onSubmit}>
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle>Identity</CardTitle>
                        <CardDescription>
                            Update your account basics and public intro.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 pb-5 h-full">
                        <div className="flex items-center gap-3">
                            {profile?.avatarUrl ? (
                                <Image
                                    src={profile.avatarUrl}
                                    alt={profile.username}
                                    width={48}
                                    height={48}
                                    className="size-12 rounded-full border border-border object-cover"
                                />
                            ) : (
                                <div className="grid size-12 place-items-center rounded-full border border-border text-sm font-semibold">
                                    {getUserInitials(profile?.username ?? 'User')}
                                </div>
                            )}
                            <div className="min-w-0">
                                <p className="truncate text-sm font-semibold">
                                    {profile?.username ?? 'Member'}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Profile ID: {profile?.id ?? '-'}
                                </p>
                            </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <label className="block space-y-1.5">
                                <span className="text-sm font-medium">Full Name</span>
                                <input
                                    {...register('fullName')}
                                    className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm"
                                    placeholder="Your full name"
                                />
                                {errors.fullName?.message ? (
                                    <p className="text-destructive text-xs">
                                        {errors.fullName.message}
                                    </p>
                                ) : null}
                            </label>

                            <label className="block space-y-1.5">
                                <span className="text-sm font-medium">Email</span>
                                <input
                                    {...register('email')}
                                    type="email"
                                    className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm"
                                    placeholder="you@example.com"
                                />
                                {errors.email?.message ? (
                                    <p className="text-destructive text-xs">
                                        {errors.email.message}
                                    </p>
                                ) : null}
                            </label>
                        </div>

                        <label className="block space-y-1.5">
                            <span className="text-sm font-medium">Description</span>
                            <textarea
                                {...register('description')}
                                rows={5}
                                className="w-full  rounded-md border border-input bg-background px-3 py-2 text-sm"
                                placeholder="Tell people about yourself."
                            />
                            {errors.description?.message ? (
                                <p className="text-destructive text-xs">
                                    {errors.description.message}
                                </p>
                            ) : null}
                        </label>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle>Preferences & Details</CardTitle>
                        <CardDescription>
                            Optional profile attributes. Leave empty if not applicable.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4 pb-5">
                        {numberFields.map((field) => (
                            <label key={field.key} className="block space-y-1.5">
                                <span className="text-sm font-medium">{field.label}</span>
                                <input
                                    {...register(field.key)}
                                    type="number"
                                    className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm"
                                />
                                {errors[field.key]?.message ? (
                                    <p className="text-destructive text-xs">
                                        {errors[field.key]?.message}
                                    </p>
                                ) : null}
                            </label>
                        ))}
                    </CardContent>
                </Card>

                {successMessage ? (
                    <p className="rounded-lg border border-border bg-primary/10 px-4 py-3 text-sm">
                        {successMessage}
                    </p>
                ) : null}

                {errors.root?.message ? (
                    <p className="text-destructive text-sm">{errors.root.message}</p>
                ) : null}

                <Dialog open={isAnalysisDialogOpen} onOpenChange={setIsAnalysisDialogOpen}>
                    <DialogContent className="max-h-[32rem] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>AI Profile Analyzer</DialogTitle>
                            <DialogDescription>
                                Prioritized improvements for photo signals, bio quality, and profile
                                details.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="mt-4 space-y-4">
                            {isAnalyzing ? (
                                <p className="text-sm text-muted-foreground">
                                    Generating advice...
                                </p>
                            ) : null}

                            {analysisError ? (
                                <p className="text-destructive text-sm">{analysisError}</p>
                            ) : null}

                            {analysisResult ? (
                                <div className="space-y-4">
                                    <p className="text-sm leading-relaxed">
                                        {analysisResult.summary}
                                    </p>

                                    <ol className="space-y-3">
                                        {analysisResult.checklist.map((item, index) => (
                                            <li
                                                key={item.id}
                                                className="rounded-lg border border-border p-3"
                                            >
                                                <div className="flex items-center justify-between gap-2">
                                                    <p className="text-sm font-semibold">
                                                        {index + 1}. {item.title}
                                                    </p>
                                                    <span className="rounded bg-muted px-2 py-1 text-xs uppercase">
                                                        {item.priority}
                                                    </span>
                                                </div>
                                                <p className="mt-1 text-xs text-muted-foreground uppercase">
                                                    {item.category}
                                                </p>
                                                <p className="mt-2 text-sm">{item.reason}</p>
                                                <p className="mt-2 text-sm font-medium">
                                                    {item.action}
                                                </p>
                                                {item.example ? (
                                                    <p className="mt-2 text-xs text-muted-foreground">
                                                        Example: {item.example}
                                                    </p>
                                                ) : null}
                                            </li>
                                        ))}
                                    </ol>
                                </div>
                            ) : null}
                        </div>

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" variant="outline">
                                    Close
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </form>
        </div>
    )
}
