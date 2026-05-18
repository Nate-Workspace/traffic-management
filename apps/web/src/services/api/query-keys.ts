export const queryKeys = {
  drivers: {
    all: ["drivers"] as const,
    list: (query: Record<string, unknown>) => ["drivers", "list", query] as const,
    detail: (id: string) => ["drivers", "detail", id] as const,
  },
  violations: {
    all: ["violations"] as const,
    list: (query: Record<string, unknown>) => ["violations", "list", query] as const,
    detail: (id: string) => ["violations", "detail", id] as const,
  },
  analytics: {
    summary: (query: Record<string, unknown>) => ["analytics", "summary", query] as const,
    trend: (query: Record<string, unknown>) => ["analytics", "trend", query] as const,
    repeatedOffenders: (query: Record<string, unknown>) =>
      ["analytics", "repeated-offenders", query] as const,
    recentViolations: ["analytics", "recent-violations"] as const,
  },
};
