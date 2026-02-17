import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

export default async function handler(req, res) {
  try {
    const n = await redis.incr("global_seen_total");
    return res.status(200).json({ total: Number(n) });
  } catch (e) {
    return res.status(500).json({ error: "redis_error", detail: String(e) });
  }
}
