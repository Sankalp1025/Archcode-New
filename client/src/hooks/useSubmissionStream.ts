import { useEffect, useState } from "react";

export const useSubmissionStream = (
  submissionId: string
) => {

  const [status, setStatus] = useState("");
  const [score, setScore] = useState<number | null>(null);
  const [feedback, setFeedback] = useState("");
  const [strengths, setStrengths] = useState<string[]>([]);
  const [weaknesses, setWeaknesses] = useState<string[]>([]);
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [detectedPatterns, setDetectedPatterns] = useState<string[]>([]);
  const [lintIssues, setLintIssues] = useState<any[]>([]);

  useEffect(() => {
    if (!submissionId) return;

    const eventSource = new EventSource(
      `http://localhost:5000/api/submissions/${submissionId}/stream`
    );

  eventSource.onmessage = (event) => {

   const data = JSON.parse(event.data);
    
    if (data.score !== undefined) {
      setScore(data.score);
    }
    if (data.feedback !== undefined) {
      setFeedback(data.feedback);
    }
    if (data.strengths !== undefined) {
      setStrengths(data.strengths);
    }
    if (data.weaknesses !== undefined) {
      setWeaknesses(data.weaknesses);
    }
    if (data.recommendations !== undefined) {
      setRecommendations(data.recommendations);
    }
    if (data.detectedPatterns !== undefined) {
      setDetectedPatterns(data.detectedPatterns);
    }
    if (data.lintIssues !== undefined) {
      setLintIssues(data.lintIssues);
    }

   setStatus(data.status);

   if (typeof data.score === "number") {
     setScore(data.score);
    }

   if (typeof data.feedback === "string") {
     setFeedback(data.feedback);
    } 

  console.log("Realtime update:", data);
};

    eventSource.onerror = () => {
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [submissionId]);

  return{ status,
          score,
          feedback,
          strengths,
          weaknesses,
          recommendations,
          detectedPatterns,
          lintIssues
        };
};