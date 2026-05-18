"use client";

import { useMemo } from "react";
import { useQueryState } from "@/hooks/use-query-state";
import { parseString } from "@/lib/query-params";

const toDateInput = (value: Date) => value.toISOString().slice(0, 10);

const addDays = (value: Date, days: number) => {
  const date = new Date(value);
  date.setDate(date.getDate() + days);
  return date;
};

export const useAnalyticsDateRange = () => {
  const { searchParams, setQuery } = useQueryState();
  const today = useMemo(() => new Date(), []);
  const defaultEnd = toDateInput(today);
  const defaultStart = toDateInput(addDays(today, -29));

  const startDate = parseString(searchParams.get("startDate")) ?? defaultStart;
  const endDate = parseString(searchParams.get("endDate")) ?? defaultEnd;

  const setRange = (nextStart: string, nextEnd: string) => {
    setQuery({ startDate: nextStart, endDate: nextEnd });
  };

  const setStartDate = (nextStart: string) => {
    const adjustedEnd = endDate && nextStart > endDate ? nextStart : endDate;
    setRange(nextStart, adjustedEnd);
  };

  const setEndDate = (nextEnd: string) => {
    const adjustedStart = startDate && nextEnd < startDate ? nextEnd : startDate;
    setRange(adjustedStart, nextEnd);
  };

  return {
    startDate,
    endDate,
    setRange,
    setStartDate,
    setEndDate,
  };
};
