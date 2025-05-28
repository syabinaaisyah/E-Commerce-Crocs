import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { readPayloadJose } from "./db/helpers/jwt";

export async function middleware(request: NextRequest) {
  // console.log("masuk middleware lahhh");

  const cookieStore  = await cookies()
  const authorization = cookieStore.get("authorization")?.value || "";

  if (request.nextUrl.pathname.startsWith("/api/wishlists")) {
    if (!authorization)
      return NextResponse.json(
        {
          message: "unauthorized, login first!",
        },
        { status: 401 }
      );

    const [type, token] = authorization.split(" ");
    if (type !== "Bearer")
      return NextResponse.json(
        {
          message: "unauthorized, invalid token!",
        },
        { status: 401 }
      );

    const decoded = await readPayloadJose<{ _id: string; email: string }>(
      token
    );
    console.log(decoded);

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-id", decoded._id);
    requestHeaders.set("x-user-email", decoded.email);

    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

    return response;
  }

  if (request.nextUrl.pathname.startsWith("/wishlists")) {
    if (!authorization) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
}

export const config = {
  matcher: ["/api/wishlists/:path*", "/wishlists/:path*"],
};
