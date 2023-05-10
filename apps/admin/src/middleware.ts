import { authMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { env } from "./env.mjs";
const redis = new Redis({
  url: env.UPSTASH_REDIS_REST_URL,
  token: env.UPSTASH_REDIS_REST_TOKEN,
});

const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(3, "1 s"),
});

export default authMiddleware({
  beforeAuth: async (req, evt) => {
    const ip = req.ip ?? "127.0.0.1";
    if (req.nextUrl.pathname.startsWith("/api") || req.nextUrl.pathname.startsWith("/")) {
      const { success } = await ratelimit.limit(ip);
      if (!success) {
        return NextResponse.redirect(new URL("/blocked", req.url));
      }
    }
  },
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
