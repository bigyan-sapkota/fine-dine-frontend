"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { FadeUp } from "@/components/utils/animations";
import { formatPrice } from "@/lib/utils";
import { StatsResult, useStats } from "@/queries/use-stats";
import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import { useMemo } from "react";

export default function StatsCards() {
  const { isLoading, data: stats } = useStats();

  return (
    <div>
      <FadeUp className="grid grid-cols-1 gap-x-4 gap-y-2 md:grid-cols-2">
        {isLoading && (
          <>
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
          </>
        )}
        {stats && (
          <>
            <RevenueCard stats={stats} />
            <BookingStatsCard stats={stats} />
          </>
        )}
      </FadeUp>
    </div>
  );
}

function RevenueCard({ stats }: { stats: StatsResult }) {
  const { revenueCurrentMonth, revenueLastMonth } = useMemo(() => {
    const currentMonthDate = new Date();
    const lastMonthDate = new Date(currentMonthDate);
    lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);

    const revenueLastMonth =
      stats.find(
        (stat) => stat.date === lastMonthDate.toISOString().slice(0, 7),
      )?.revenue || 0;

    const revenueCurrentMonth =
      stats.find(
        (stat) => stat.date === currentMonthDate.toISOString().slice(0, 7),
      )?.revenue || 0;

    const totalRevenue = stats.reduce((prev, curr) => prev + curr.revenue, 0);
    return { revenueCurrentMonth, revenueLastMonth, totalRevenue };
  }, [stats]);

  const increment = revenueCurrentMonth - revenueLastMonth;
  const incrementPercentage = ((increment * 100) / revenueLastMonth).toFixed(0);

  return (
    <section className="rounded-lg bg-gray-200/40 p-6 shadow-lg shadow-gray-200/40">
      <div className="flex items-end justify-between">
        <h3 className="text-sm">Total Revenue</h3>
        {increment > 0 && <TrendingUpIcon className="size-5" />}
        {increment < 0 && <TrendingDownIcon className="size-5" />}
      </div>
      <p className="mt-2 text-2xl font-semibold">
        {formatPrice(revenueCurrentMonth)}
      </p>
      {increment === 0 ? (
        <p className="text-muted-foreground mt-1 text-xs">
          No changes compared to past month
        </p>
      ) : (
        <p className="text-muted-foreground mt-1 text-xs">
          {increment > 0 && "+"}
          {Number(incrementPercentage) === Infinity
            ? formatPrice(increment, false)
            : `${incrementPercentage}%`}{" "}
          compared to past month
        </p>
      )}
    </section>
  );
}

function BookingStatsCard({ stats }: { stats: StatsResult }) {
  const { totalBookings, totalBookingsCurrentMonth, totalBookingsLastMonth } =
    useMemo(() => {
      const currentMonthDate = new Date();
      const lastMonthDate = new Date();
      lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);

      const lastMonthStats = stats.find(
        (stat) => stat.date === lastMonthDate.toISOString().slice(0, 7),
      ) || { booking: 0, date: "", revenue: 0 };

      const currentMonthStats = stats.find(
        (stat) => stat.date === currentMonthDate.toISOString().slice(0, 7),
      ) || { booking: 0, date: "", revenue: 0 };

      const totalBookingsLastMonth = lastMonthStats.booking;
      const totalBookingsCurrentMonth = currentMonthStats.booking;
      const totalBookings = stats.reduce((a, b) => a + b.booking, 0);

      return {
        totalBookings,
        totalBookingsLastMonth,
        totalBookingsCurrentMonth,
      };
    }, [stats]);

  return (
    <section className="rounded-lg bg-gray-200/40 p-6 shadow-lg shadow-gray-200/40">
      <h3 className="text-sm">Bookings</h3>
      <div className="mt-2">
        <p className="text-2xl font-semibold">
          {totalBookingsCurrentMonth || totalBookingsLastMonth || totalBookings}
        </p>
        <p className="text-muted-foreground mt-1 text-xs">
          {totalBookingsCurrentMonth !== 0 && (
            <span>Booking done this month</span>
          )}
          {totalBookingsCurrentMonth === 0 && totalBookingsLastMonth !== 0 && (
            <span>Booking done last month</span>
          )}
          {totalBookingsCurrentMonth === 0 && totalBookingsLastMonth === 0 && (
            <span>Booking done from past one year</span>
          )}
        </p>
      </div>
    </section>
  );
}
