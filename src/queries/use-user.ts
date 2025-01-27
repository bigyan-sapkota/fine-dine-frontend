import { apiClient } from "@/lib/api-client";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { UserProfile } from "../../typing";

export const userKey = (userId: string) => ["user", userId];

export const useUser = (
  userId: string,
  queryOptions?: Partial<UseQueryOptions<UserProfile>>,
) => {
  return useQuery({
    queryKey: userKey(userId),
    queryFn: ({ signal }) => fetchUser({ userId, signal }),
    ...queryOptions,
  });
};

type Options = { userId: string; signal: AbortSignal };
export const fetchUser = async ({
  userId,
  signal,
}: Options): Promise<UserProfile> => {
  const res = await apiClient.get<{ user: UserProfile }>(
    `/api/users/${userId}`,
    {
      signal,
    },
  );
  return res.data.user;
};
