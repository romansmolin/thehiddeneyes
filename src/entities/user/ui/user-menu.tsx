'use client'

import { useGetCurrentUserQuery } from '../api/client/endpoints'

export function UserMenu() {
    const { data: user, isLoading } = useGetCurrentUserQuery()

    if (isLoading) return <div className="text-sm text-muted-foreground">Loading...</div>

    if (!user) return null

    return (
        <div className="flex items-center gap-3">
            <div className="text-sm">
                <div className="font-medium">{user.name}</div>
                <div className="text-muted-foreground">{user.email}</div>
            </div>
        </div>
    )
}
