"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const data = [
  { month: "Jan", revenue: 100 },
  { month: "Feb", revenue: 300 },
  { month: "Mar", revenue: 600 },
  { month: "Apr", revenue: 900 },
];

export default function RevenueGraph() {
  return (
    <div className="bg-white/5 p-10 rounded-3xl border border-white/10">
      <LineChart width={600} height={300} data={data}>
        <XAxis dataKey="month" stroke="#aaa" />
        <YAxis stroke="#aaa" />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="revenue"
          stroke="#00ff94"
          strokeWidth={3}
        />
      </LineChart>
    </div>
  );
}