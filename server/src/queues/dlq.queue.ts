import { Queue } from 'bullmq';
import { redisConnection } from '../config/redis';

export const dlqQueue = new Queue('dlq', { connection: redisConnection });