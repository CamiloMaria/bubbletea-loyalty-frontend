import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // Obtener la cookie de autenticación
    const authToken = request.cookies.get('auth_token')?.value;
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
        const dashboardUrl = new URL('/customers', request.url);
        return NextResponse.redirect(dashboardUrl);
    }

    return NextResponse.next();
}

// Configurar las rutas que el middleware debe procesar
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder
         */
        '/((?!api|_next/static|_next/image|favicon.ico|logo.png).*)',
    ],
};