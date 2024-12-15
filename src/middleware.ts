import {NextRequest, NextResponse} from "next/server";
import {redirect} from "next/navigation";
import {updateSession} from "@/lib/auth";
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico, sitemap.xml, robots.txt (metadata files)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
}
export async function middleware(request: NextRequest){
    const res =  await updateSession(request);
    // 如果没有session，如果位于欢迎页或者登录页，则不重定向，否则重定向至登录页面
    if (!res ) {
        if (request.nextUrl.pathname == '/' || request.nextUrl.pathname == '/login') return;
        return NextResponse.redirect(new URL('/login',request.url));
    }
    // 如果有session，且位于欢迎页或者登录页，则自动跳转至主页
    if (request.nextUrl.pathname == '/' || request.nextUrl.pathname == '/login') return NextResponse.redirect(new URL('/dashboard',request.url));
    return res
}