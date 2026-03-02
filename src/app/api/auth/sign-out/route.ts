import { NextResponse } from 'next/server'
import { clearSessionCookies } from '@/shared/lib/auth/session-cookies'
import { asyncHandler } from '@/shared/http/async-handler'

export const POST = asyncHandler(async () => {
    const response = NextResponse.json({ ok: true })
    clearSessionCookies(response)
    return response
})
