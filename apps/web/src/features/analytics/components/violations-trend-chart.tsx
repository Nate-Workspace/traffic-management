"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartCard } from "./chart-card";
import type { ViolationsTrendPoint } from "../types/analytics";
import { formatShortDate } from "@/lib/date";

const formatTick = (value: string) => formatShortDate(value);

export function ViolationsTrendChart({
  data,
  isLoading,
}: {
  data: ViolationsTrendPoint[];
  isLoading?: boolean;
}) {
  return (
    <ChartCard
      title="Violation trends"
      description="Status distribution across the selected range."
      isLoading={isLoading}
      isEmpty={!isLoading && data.length === 0}
    >
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="date" tickFormatter={formatTick} stroke="#64748b" />
            <YAxis stroke="#64748b" width={32} />
            <Tooltip
              formatter={(value: number, name: string) => [value, name]}
              labelFormatter={(label) => formatShortDate(label)}
            />
            <Area
              type="monotone"
              dataKey="pending"
              stackId="1"
              stroke="#eab308"
              fill="#fde68a"
              name="Pending"
            />
            <Area
              type="monotone"
              dataKey="notified"
              stackId="1"
              stroke="#38bdf8"
              fill="#bae6fd"
              name="Notified"
            />
            <Area
              type="monotone"
              dataKey="reviewed"
              stackId="1"
              stroke="#2dd4bf"
              fill="#99f6e4"
              name="Reviewed"
            />
            <Area
              type="monotone"
              dataKey="dismissed"
              stackId="1"
              stroke="#94a3b8"
              fill="#e2e8f0"
              name="Dismissed"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}
