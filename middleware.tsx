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
  matcher: ["/profile:path*"],
};
