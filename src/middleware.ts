import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const authToken = request.cookies.get('auth_token')?.value;
    const userRole = request.cookies.get('user_role')?.value;
    const currentPath = request.nextUrl.pathname;

    // Rutas públicas que no requieren autenticación
    const publicRoutes = ['/', '/login'];
    const isPublicRoute = publicRoutes.includes(currentPath);

    // Si no hay token y la ruta requiere autenticación
    if (!authToken && !isPublicRoute) {
        const loginUrl = new URL('/login', request.url);
        return NextResponse.redirect(loginUrl);
    }

    // Si hay token y el usuario intenta acceder a login
    if (authToken && currentPath === '/login') {
        const redirectUrl = new URL(
            userRole === 'ADMIN' ? '/dashboard' : '/customers',
            request.url
        );
        return NextResponse.redirect(redirectUrl);
    }

    // Proteger rutas de admin
    if (currentPath.startsWith('/dashboard') && userRole !== 'ADMIN') {
        const customerUrl = new URL('/customers', request.url);
        return NextResponse.redirect(customerUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|logo.png).*)',
    ],
};