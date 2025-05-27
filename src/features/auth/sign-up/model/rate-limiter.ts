import { Redis } from "ioredis"

class RateLimiter {
  private redis: Redis

  constructor() {
    this.redis = new Redis(
      process.env.REDIS_URL || "redis:///shared-redis:6379"
    )
  }

  async checkLimit(
    key: string,
    limit: number,
    windowMs: number
  ): Promise<boolean> {
    const now = Date.now()
    const window = Math.floor(now / windowMs)
    const redisKey = `rate_limit:${key}:${window}`

    const count = await this.redis.incr(redisKey)
    if (count === 1) {
      await this.redis.expire(redisKey, Math.ceil(windowMs / 1000))
    }

    return count <= limit
  }

  async getRemainingAttempts(
    key: string,
    limit: number,
    windowMs: number
  ): Promise<number> {
    const now = Date.now()
    const window = Math.floor(now / windowMs)
    const redisKey = `rate_limit:${key}:${window}`

    const count = await this.redis.get(redisKey)
    return Math.max(0, limit - parseInt(count || "0", 10))
  }
}

export const rateLimiter = new RateLimiter()
