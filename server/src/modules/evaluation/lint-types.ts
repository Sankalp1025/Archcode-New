export type Severity = "LOW" | "MEDIUM" | "HIGH";

export interface LintIssue {
  ruleId: string;
  title: string;
  severity: Severity;
  description: string;
  recommendation: string;
}