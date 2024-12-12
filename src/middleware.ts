import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token');
    const isAuthPage = request.nextUrl.pathname.startsWith('/login');

    if (!token && !isAuthPage) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (token && isAuthPage) {
        return NextResponse.redirect(new URL('/customers', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/login',
        '/customers/:path*',
        '/employees/:path*',
        '/profile',
    ],
};