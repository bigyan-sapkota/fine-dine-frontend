import { apiClient } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";
import { UserProfile } from "../../typing";

export const profileKey = ["profile"];
export const useProfile = () => {
  return useQuery<UserProfile | null>({
    queryKey: profileKey,
    queryFn: fetchProfile,
    refetchOnWindowFocus: true,
    refetchInterval: 60000,
    throwOnError(err, query) {
      query.setData(null);
      return false;
    },
  });
};

export const fetchProfile = async ({
  signal,
}: {
  signal: AbortSignal;
}): Promise<UserProfile> => {
  const { data } = await apiClient.get<{ user: UserProfile }>(
    "/api/users/profile",
    {
      withCredentials: true,
      signal,
    }
  );

  return data.user;
};
