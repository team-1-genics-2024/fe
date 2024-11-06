export { auth as middleware } from "@/auth";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

export default auth((req) => {
  const currentPath = req.nextUrl.pathname;

  if (!req.auth) {
    return NextResponse.redirect(
      new URL(`/login?next=${currentPath}`, req.url)
    );
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)", "/dashboard"],
};
