// import { NextResponse } from "next/server";

// export function middleware(request) {
//   // Swagger UI 경로를 예외로 처리
//   if (request.nextUrl.pathname.startsWith("/swagger")) {
//     return NextResponse.next();
//   }

//   return NextResponse.rewrite(new URL("/404", request.url));
// }

// // 이 미들웨어를 전체 사이트에 적용합니다.
// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
// };
