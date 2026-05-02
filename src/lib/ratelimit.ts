import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "./redis";

const g = global as unknown as { ratelimit?: Ratelimit };

export const ratelimit =
  g.ratelimit ??
  new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10, "1 m"),
    prefix: "ratelimit",
    analytics: false,
  });

if (process.env.NODE_ENV !== "production") g.ratelimit = ratelimit;

export function getClientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}
