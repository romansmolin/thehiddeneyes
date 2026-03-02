import { cookies } from 'next/headers';
import { auth } from './auth.config';

export async function getSession() {
  const cookieStore = await cookies();

  // 1. Check dating session cookies (external API auth)
  const datingSessionId = cookieStore.get('dating_session_id')?.value;
  const datingUserId = cookieStore.get('dating_user_id')?.value;

  if (datingSessionId && datingUserId) {
    return {
      session: { id: datingSessionId, userId: datingUserId },
      user: { id: datingUserId },
    };
  }

  // 2. Fallback to BetterAuth session
  const secureSessionToken = cookieStore.get('__Secure-better-auth.session_token')?.value;
  const sessionToken = cookieStore.get('better-auth.session_token')?.value;
  const token = secureSessionToken ?? sessionToken;

  if (!token) {
    return null;
  }

  try {
    const session = await auth.api.getSession({
      headers: {
        cookie: `${secureSessionToken ? '__Secure-better-auth.session_token' : 'better-auth.session_token'}=${token}`,
      },
    });

    return session;
  } catch (error) {
    console.error('[Auth] Failed to get session:', error);
    return null;
  }
}
