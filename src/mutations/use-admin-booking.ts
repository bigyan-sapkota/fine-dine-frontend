import { BACKEND_URL } from "@/lib/constants";
import { extractErrorMessage } from "@/lib/utils";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { Booking } from "../../typing";

type KeyOptions = {
  userId: string | null;
  isCancelled: boolean | null;
};

export const adminBookingsKey = (options: KeyOptions) => [
  "admin-bookings",
  options,
];

export const useAdminBookings = ({ userId, isCancelled }: KeyOptions) => {
  return useInfiniteQuery({
    queryKey: adminBookingsKey({ userId, isCancelled }),
    queryFn: ({ signal, pageParam }) =>
      fetchBookings({ signal, cursor: pageParam, userId, isCancelled }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam(lastPage) {
      return lastPage[lastPage.length - 1]?.startsAt;
    },
  });
};

type Options = { signal: AbortSignal; cursor: string | undefined } & KeyOptions;

const fetchBookings = async ({
  signal,
  cursor,
  userId,
  isCancelled,
}: Options): Promise<Booking[]> => {
  try {
    const url = new URL(`${BACKEND_URL}/api/bookings`);
    if (cursor) url.searchParams.set("cursor", cursor);
    if (userId) url.searchParams.set("userId", userId);
    if (isCancelled)
      url.searchParams.set("isCancelled", isCancelled.toString());
    const res = axios.get<{ bookings: Booking[] }>(url.href, {
      signal,
      withCredentials: true,
    });
    return (await res).data.bookings;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};
