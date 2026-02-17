import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export default async function handler(req, res) {
  try {
    // aceita GET/POST (mais simples)
    const n = await redis.incr("global_seen_total");
    return res.status(200).json({ total: Number(n) });
  } catch {
    return res.status(500).json({ error: "redis_error" });
  }
}
