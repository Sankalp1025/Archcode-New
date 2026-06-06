import { redisSubscriber } from "./redisPubSub";
import { emitSubmissionUpdate } from "./submissionEvents";

const CHANNEL = "submission-updates";

export const initializeRedisSubscriber = async () => {
  await redisSubscriber.subscribe(CHANNEL);

  redisSubscriber.on("message", (_channel, message) => {
    const event = JSON.parse(message);

    emitSubmissionUpdate(
      event.submissionId,
      event.status,
      event.extraData
    );
  });

  console.log("Redis subscriber initialized");
};