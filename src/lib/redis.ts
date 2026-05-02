import { Redis } from "@upstash/redis";

const g = global as unknown as { redis?: Redis };

export const redis = g.redis ?? Redis.fromEnv();

if (process.env.NODE_ENV !== "production") g.redis = redis;
