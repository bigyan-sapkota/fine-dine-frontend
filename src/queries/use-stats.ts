import { apiClient } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";

export const statsKey = ["stats"];

export const useStats = () => {
  return useQuery({
    queryKey: statsKey,
    queryFn: ({ signal }) => fetchStats({ signal }),
  });
};

export type StatsResult = {
  revenue: number;
  booking: number;
  date: string;
}[];

export const fetchStats = async ({ signal }: { signal: AbortSignal }) => {
  const res = await apiClient.get<{ stats: StatsResult }>(
    "/api/stats",
    { withCredentials: true, signal },
  );
  return res.data.stats;
};
