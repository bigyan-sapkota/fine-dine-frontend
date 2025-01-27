"use client";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { FadeUp } from "@/components/utils/animations";
import { useProfile } from "@/queries/use-profile";
import { useStats } from "@/queries/use-stats";
import dayjs from "dayjs";
import { InfoIcon } from "lucide-react";
import { useMemo } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

type ChartData = { month: string; bookings: number }[];
export default function BookingsHistoryChart() {
  const { data: profile } = useProfile();
  const { data: stats, error } = useStats();

  const chartData = useMemo((): ChartData => {
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
        bookings: currentStat?.booking || 0,
      };
      data.push(chartDataItem);
    }

    return data.reverse();
  }, [stats]);

  const chartConfig = {
    bookings: {
      label: "Bookings",
      color: "tomato",
    },
  };

  return (
    <FadeUp className="w-full scroll-m-20" id="auctions-history">
      <h3 className="px-2 text-xl">Bookings</h3>
      {error && (
        <p className="text-muted-foreground my-2 text-sm">
          <InfoIcon className="mr-0.5 inline size-3 -translate-y-0.5" /> No data
          to show
        </p>
      )}
      <ChartContainer
        config={chartConfig}
        className="mt-4 h-96 min-h-96 w-full"
      >
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="bookings" fill="tomato" radius={4} />
        </BarChart>
      </ChartContainer>
    </FadeUp>
  );
}
