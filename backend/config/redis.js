import { createClient } from "redis";
import { config } from "./env-config.js";

const redis = createClient({
  username: config.redisHost,
  password: config.redisPassword,
  socket: {
    host: config.redisCloudUrl,
    port: config.redisPort,
  },
});

redis.on("error", (err) => console.log("Redis Client Error", err));

await redis.connect();

export default redis;
