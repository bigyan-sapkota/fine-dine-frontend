import { BACKEND_URL } from "@/lib/constants";
import { extractErrorMessage } from "@/lib/utils";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { Booking } from "../../typing";

export type KeyOptions = Partial<{
  status: "pending" | "completed" | "cancelled";
  userId: string;
  tableId: string;
}>;

export const adminBookingsKey = (options: KeyOptions) => [
  "admin-bookings",
  options,
];

export const useAdminBookings = (options: KeyOptions) => {
  return useInfiniteQuery({
    queryKey: adminBookingsKey(options),
    queryFn: ({ signal, pageParam }) =>
      fetchBookings({ signal, cursor: pageParam, ...options }),
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
  status,
  tableId,
}: Options): Promise<Booking[]> => {
  try {
    const url = new URL(`${BACKEND_URL}/api/bookings`);
    if (cursor) url.searchParams.set("cursor", cursor);
    if (userId) url.searchParams.set("userId", userId);
    if (status) url.searchParams.set("status", status);
    if (tableId) url.searchParams.set("tableId", tableId);
    const res = await axios.get<{ bookings: Booking[] }>(url.href, {
      signal,
      withCredentials: true,
    });
    return res.data.bookings;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};
