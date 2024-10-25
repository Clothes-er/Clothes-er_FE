import { NextResponse, type NextRequest } from "next/server";

export default function middleware(request: NextRequest) {
  const { nextUrl, cookies } = request;
  const accessToken = cookies.get("accessToken")?.value;
  const isFirstLogin = cookies.get("isFirstLogin")?.value;
  
  /* 정적 파일 요청인지 확인 */
  if (
    request.nextUrl.pathname.startsWith("/images") ||
    request.nextUrl.pathname.endsWith(".svg") ||
    request.nextUrl.pathname === "/manifest.json"
  ) {
    return NextResponse.next();
  }

  /* 로그인 필요 없는 페이지 */
  if (
    request.nextUrl.pathname === "/" ||
    request.nextUrl.pathname.startsWith("/join")
  ) {
    // 로그인 되어 있는 경우 메인 페이지로 리다이렉트
    if (accessToken) {
      const redirectUrl = isFirstLogin === "true" ? "/first/step1" : "/home";
      return NextResponse.redirect(new URL(redirectUrl, request.url));
    } else {
      // 로그인이 필요 없는 페이지는 그냥 다음 요청으로 진행
      return NextResponse.next();
    }
  }

  /* 로그인 필요한 페이지 */
  if (!accessToken) {
    // 로그인 페이지로 리다이렉트
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 로그인 되어 있는 경우 요청 페이지로 진행
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - robots.txt (robots file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|images|manifest.json).*)",
  ],
};
