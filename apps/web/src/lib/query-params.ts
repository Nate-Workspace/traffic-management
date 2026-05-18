export type QueryValue = string | number | boolean | undefined | null;

export const parseNumber = (value: string | null, fallback: number) => {
  if (!value) {
    return fallback;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

export const parseString = (value: string | null) =>
  value && value.trim().length > 0 ? value : undefined;

export const buildSearchParams = (params: Record<string, QueryValue>) => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") {
      return;
    }

    searchParams.set(key, String(value));
  });

  return searchParams;
};
