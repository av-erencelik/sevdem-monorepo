import { authMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default authMiddleware({
  afterAuth(auth, req, evt) {
    const isAuthPage = req.nextUrl.pathname.startsWith("/giris");
    const { userId } = auth;
    if (!isAuthPage) {
      if (!userId) {
        return NextResponse.redirect(new URL("/giris", req.url));
      } else {
        return NextResponse.next();
      }
    } else {
      if (userId) {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }
  },
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
