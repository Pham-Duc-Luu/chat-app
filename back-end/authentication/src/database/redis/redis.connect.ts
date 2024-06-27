import RedisStore from "connect-redis";
import IORedis from "ioredis";
import { createClient } from "redis";
import AppConfigEnv from "../../config/app.config";
import Logger from "../../lib/logger";

// Initialize client.
const redisClient = createClient({ url: AppConfigEnv.REDIS_URL });

redisClient
  .connect()
  .then(() => {
    console.log("Connected to Redis");
  })
  .catch((err) => {
    Logger.error("Error connecting to Redis");
    Logger.error(err);
  });
// Initialize store.
const redisStore = new RedisStore({ client: redisClient });

export { redisClient, redisStore };
