import { redisPublisher } from "./redisPubSub";

const CHANNEL = "submission-updates";

export const publishSubmissionUpdate = async (
  submissionId: string,
  status: string,
  extraData?: Record<string, unknown>
) => {
  await redisPublisher.publish(
    CHANNEL,
    JSON.stringify({
      submissionId,
      status,
      extraData,
    })
  );
};