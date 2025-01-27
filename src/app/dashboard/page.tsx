import BookingsHistoryChart from "./sections/bookings-history-chart";
import RevenueLineChart from "./sections/revenue-line-chart";
import StatsCards from "./sections/stats-cards";

export default function page() {
  return (
    <main className="relative scroll-m-16 p-4" id="analytics">
      <StatsCards />
      <div className="mt-10 flex w-full flex-col items-start gap-x-6 gap-y-16 md:mt-8 2xl:flex-row">
        <BookingsHistoryChart />
      </div>
      <RevenueLineChart />
    </main>
  );
}
