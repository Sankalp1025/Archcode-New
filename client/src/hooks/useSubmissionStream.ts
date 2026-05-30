import { useEffect, useState } from "react";

export const useSubmissionStream = (
  submissionId: string
) => {
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!submissionId) return;

    const eventSource = new EventSource(
      `http://localhost:5000/api/submissions/${submissionId}/stream`
    );

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);

      setStatus(data.status);

      console.log("Realtime update:", data);
    };

    eventSource.onerror = () => {
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [submissionId]);

  return { status };
};