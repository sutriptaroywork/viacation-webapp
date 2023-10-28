import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
    return NextResponse.redirect('/login')
    //     console.log(request.nextUrl, response)
    //     return response.redirect("/login");
}