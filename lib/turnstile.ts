/**
 * Verify a Cloudflare Turnstile token on the server-side
 * @param token The token from the client-side Turnstile widget
 * @returns Object with success boolean and optional error message
 */
export async function verifyTurnstileToken(token: string): Promise<{
  success: boolean;
  error?: string;
  errorCodes?: string[];
}> {
  const secretKey = process.env.CLOUDFLARE_TURNSTILE_SECRET;

  if (!secretKey) {
    console.error('CLOUDFLARE_TURNSTILE_SECRET is not configured');
    return {
      success: false,
      error: 'Server configuration error',
    };
  }

  if (!token) {
    return {
      success: false,
      error: 'Token is required',
    };
  }

  try {
    const response = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          secret: secretKey,
          response: token,
        }),
      }
    );

    const data = await response.json() as {
      success: boolean;
      error_codes?: string[];
      challenge_ts?: string;
      hostname?: string;
    };

    if (!data.success) {
      return {
        success: false,
        error: 'Token verification failed',
        errorCodes: data.error_codes,
      };
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error('Error verifying Turnstile token:', error);
    return {
      success: false,
      error: 'Failed to verify token',
    };
  }
}
