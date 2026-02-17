import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export default async function handler(req, res) {
  try {
    const n = await redis.get("global_seen_total");
    return res.status(200).json({ total: Number(n || 0) });
  } catch {
    return res.status(500).json({ error: "redis_error" });
  }
}
