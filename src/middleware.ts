import { getCookie, hasCookie } from "cookies-next";
import { NextRequest, NextResponse } from "next/server";
import PocketBase from 'pocketbase';
import { POCKETBASE_URL, UNPROTECTED_ROUTES } from "./constants";

export async function middleware(req: NextRequest) {

    // const res = NextResponse.next();

    // if (req.nextUrl.pathname && UNPROTECTED_ROUTES.includes(req.nextUrl.pathname) && !hasCookie('pb_auth', { req, res })) {
    //     return res
    // }

    // let isLoggedIn = false
    // try {
    //     let token: any = getCookie('pb_auth', { req, res })
    //     const temp = new PocketBase(POCKETBASE_URL)
    //     temp.authStore.save(token, null)
    //     // Verify the jwt token
    //     if (temp.authStore.isValid) {
    //         isLoggedIn = true

    //     }
    // } catch (error) {
    //     console.log('Error verifying token:', error)
    // }


    // // 2. Case - Route is unprotected and there is a jwt token
    // if (req.nextUrl.pathname && UNPROTECTED_ROUTES.includes(req.nextUrl.pathname) && hasCookie('pb_auth', { req, res })) {
    //     // if the user go to an unprotected route and isLoggedIn, redirect to home
    //     if (isLoggedIn) {
    //         const url = req.nextUrl.clone()
    //         url.pathname = '/home'
    //         // url needs to be an absolute URL,
    //         // thats why its not possible to give relative path directly
    //         return NextResponse.redirect(url)
    //     }
    //     // else, just return the route user want to go to (either /signin, /signup, /forgetpassword)
    //     return res
    // }

    // // 3. Case - Route is protected
    // if (req.nextUrl.pathname && !UNPROTECTED_ROUTES.includes(req.nextUrl.pathname)) {
    //     // if the user go to a protected route and isLoggedIn, return the route user want to go to
    //     if (isLoggedIn) {
    //         return res
    //     }
    //     // else, redirect to /signin
    //     const url = req.nextUrl.clone()
    //     url.pathname = '/signin'
    //     return NextResponse.redirect(url)
    // }
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
