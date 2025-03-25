import { NextRequest, NextResponse } from "next/server";


export function middleware(req: NextRequest) {

  const url = req.nextUrl.clone();
  const token = req.cookies.get("token")?.value;
  const userDataCookie = req.cookies.get("userData")?.value;
  const token_expiry= req.cookies.get("token_expiry")?.value;
  const userData = userDataCookie ? JSON.parse(userDataCookie) : null;

  ///login player open for registration
  if (url.pathname.startsWith("/playerRegistration")) {
    if (
      !token ||
      !token_expiry ||
      parseInt(token_expiry) < Date.now() 
      // (userData.role !== "Admin" && userData.role !== "SuperAdmin")
    ) {
      const loginUrl = new URL("/Auth/login", req.url);
      loginUrl.searchParams.set("message", "Please login first");
      return NextResponse.redirect(loginUrl);

    }
  }
  ///admin page restriction
  if (url.pathname.startsWith("/admin")) {
    if (
      !token ||
      !token_expiry ||
      parseInt(token_expiry) < Date.now() ||
      (userData.role !== "Admin" && userData.role !== "SuperAdmin")
    ) {
      const loginUrl = new URL("/", req.url);
      // loginUrl.searchParams.set("message", "Please login first");
      return NextResponse.redirect(loginUrl);
    }
  }
  return NextResponse.next();
}


export const config = {
  matcher: ["/playerRegistration","/admin"],
};
