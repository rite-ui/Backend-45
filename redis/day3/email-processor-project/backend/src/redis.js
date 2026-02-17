import Redis from "ioredis";
import { config } from "./config.js";


export const redis = new Redis(config.redisUrl);
export const subscriber = new Redis(config.redisUrl)