import { redisConnection } from "../config/redis";

export const redisPublisher = redisConnection.duplicate();

export const redisSubscriber = redisConnection.duplicate();