import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // Accept either Better Auth session or dating session cookie
    const betterAuthToken = request.cookies.get('better-auth.session_token')?.value
    const datingSessionId = request.cookies.get('dating_session_id')?.value
    const hasSession = Boolean(betterAuthToken ?? datingSessionId)

    const isProtectedRoute =
        pathname.startsWith('/dashboard') ||
        pathname.startsWith('/wallet') ||
        pathname.startsWith('/match') ||
        pathname.startsWith('/chat') ||
        pathname.startsWith('/profile') ||
        pathname.startsWith('/gifts')
    const isAuthRoute = pathname.startsWith('/auth')

    if (isProtectedRoute && !hasSession) {
        return NextResponse.redirect(new URL('/auth', request.url))
    }

    if (isAuthRoute && hasSession) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico|public|api|gifts-1|gifts-2|gifts-3).*)'],
}
