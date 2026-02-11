import next from "next";
import { NextRequest, NextResponse } from "next/server";


export default function proxy(req: NextRequest){
    const  tokenCookie = req.cookies.get('accessToken')
    if(!tokenCookie) return NextResponse.redirect(new URL('/login', req.url));
    NextResponse.next()
}

export const config = {
    matcher: ['/', '/student/:path*', '/payment/:path*']
}