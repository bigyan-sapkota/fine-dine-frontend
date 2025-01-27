"use client";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useProfile } from "@/queries/use-profile";
import { useStats } from "@/queries/use-stats";
import dayjs from "dayjs";
import { useMemo, useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

type ChartData = { month: string; revenue: number }[];
export default function RevenueLineChart() {
  const { data: profile } = useProfile();
  const { data: stats } = useStats();

  const chartData = useMemo(() => {
    const date = new Date();
    const data: ChartData = [];

    for (let i = 0; i < 12; i++) {
      const currentDate = new Date(date);
      currentDate.setMonth(currentDate.getMonth() - i);
      const currentStat = stats?.find(
        (stat) => stat.date === currentDate.toISOString().slice(0, 7),
      );
      const chartDataItem: ChartData[number] = {
        month: dayjs(currentDate).format("MMMM"),
        revenue: currentStat?.revenue || 0,
      };
      data.push(chartDataItem);
    }

    return data.reverse();
  }, [stats]);

  const chartConfig = {
    revenue: {
      label: "Revenue",
      color: "tomato",
    },
  };

  return (
    <section className="mt-16">
      <h3 className="px-2 text-xl">Revenue</h3>

      <ChartContainer
        config={chartConfig}
        className="mt-4 h-96 min-h-96 w-full"
      >
        <AreaChart
          accessibilityLayer
          data={chartData}
          margin={{ left: 12, right: 12 }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(val) => val.slice(0, 3)}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="line" />}
          />
          <Area
            dataKey="revenue"
            type="natural"
            fill="tomato"
            fillOpacity={0.4}
            stroke="tomato"
          />
        </AreaChart>
      </ChartContainer>
    </section>
  );
}
