"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartCard } from "./chart-card";
import type { ViolationsTrendPoint } from "../types/analytics";
import { formatShortDate } from "@/lib/date";

const formatTick = (value: string) => formatShortDate(value);

export function ViolationsOverTimeChart({
  data,
  isLoading,
}: {
  data: ViolationsTrendPoint[];
  isLoading?: boolean;
}) {
  return (
    <ChartCard
      title="Violations over time"
      description="Daily totals for the selected range."
      isLoading={isLoading}
      isEmpty={!isLoading && data.length === 0}
    >
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="date" tickFormatter={formatTick} stroke="#64748b" />
            <YAxis stroke="#64748b" width={32} />
            <Tooltip
              formatter={(value: number) => [value, "Violations"]}
              labelFormatter={(label) => formatShortDate(label)}
            />
            <Line
              type="monotone"
              dataKey="total"
              stroke="#0f172a"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}
