import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from './shared/lib/auth/auth.config'
import { headers } from 'next/headers'

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    const hasSession = await auth.api.getSession({
        headers: await headers(),
    })

    const isProtectedRoute = pathname.startsWith('/dashboard')
    const isAuthRoute = pathname.startsWith('/auth')

    if (isProtectedRoute && !hasSession) {
        return NextResponse.redirect(new URL('/auth', request.url))
    }

    if (isAuthRoute && hasSession) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    return NextResponse.next()
}

export const runtime = 'nodejs'

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico|public|api|gifts-1|gifts-2|gifts-3).*)'],
}
