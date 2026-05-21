import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

export const parseDateString = (value?: string): Date | null => {
  if (!value?.trim()) {
    return null;
  }

  const parsed = dayjs(value, "YYYY-MM-DD", true);
  return parsed.isValid() ? parsed.toDate() : null;
};

export const formatDateString = (value: Date | null): string => {
  if (!value) {
    return "";
  }

  return dayjs(value).format("YYYY-MM-DD");
};
