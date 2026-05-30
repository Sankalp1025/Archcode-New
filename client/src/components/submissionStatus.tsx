"use client";

import { useSubmissionStream } from "../hooks/useSubmissionStream";

interface Props {
  submissionId: string;
}

export default function SubmissionStatus({
  submissionId,
}: Props) {
  const { status } = useSubmissionStream(submissionId);

  return (
    <div>
      <p>Status: {status}</p>
    </div>
  );
}