import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PROTECTED_PREFIXES = ['/dashboard', '/wallet', '/gifts', '/profile', '/match', '/chat']

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    const hasSession = request.cookies.has('dating_session_id')

    const isProtectedRoute = PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix))
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
