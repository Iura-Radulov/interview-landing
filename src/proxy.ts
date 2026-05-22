import { type NextRequest, NextResponse } from 'next/server';

const COOKIE_NAME = 'session';

const ALLOWED_ORIGINS = ['https://mini.techinterviewai.com', 'https://techinterviewai.com'];

function addCorsHeaders(response: NextResponse, origin: string): NextResponse {
  if (ALLOWED_ORIGINS.includes(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin);
    response.headers.set('Access-Control-Allow-Credentials', 'true');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  }
  return response;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const origin = request.headers.get('origin') || '';

  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    const response = new NextResponse(null, { status: 204 });
    return addCorsHeaders(response, origin);
  }

  // Add CORS headers to API responses
  if (pathname.startsWith('/api/')) {
    const response = NextResponse.next();
    return addCorsHeaders(response, origin);
  }

  // Protect dashboard routes
  if (pathname.startsWith('/dashboard')) {
    const session = request.cookies.get(COOKIE_NAME);
    if (!session?.value) {
      const response = NextResponse.redirect(new URL('/auth/login', request.url));
      return addCorsHeaders(response, origin);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/:path*'],
};
