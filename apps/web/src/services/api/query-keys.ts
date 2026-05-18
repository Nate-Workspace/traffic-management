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
};
