import RedisStore from "connect-redis";
import IORedis from "ioredis";

// Initialize client.
const redisClient = new IORedis(
  process.env.REDIS_URL || "redis://127.0.0.1:6379"
);

// Initialize store.
const redisStore = new RedisStore({ client: redisClient });

export { redisClient, redisStore };
