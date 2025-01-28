import { BACKEND_URL } from "@/lib/constants";
import { getQueryClient } from "@/lib/query-client";
import { extractErrorMessage } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { adminBookingsKey } from "./use-admin-booking";
import { useFilters } from "@/app/dashboard/bookings/table/filter";

export const cancelBookingKey = ["cancel-booking"];

export const useCancelBooking = () => {
  return useMutation({
    mutationKey: cancelBookingKey,
    mutationFn: async ({ bookingId }: { bookingId: string }) => {
      console.log({ bookingId });
      cancelBooking(bookingId);
    },
    onSuccess() {
      toast.dismiss();
      toast.success("Booking Cancelled");
      const queryClient = getQueryClient();
      queryClient.invalidateQueries({
        queryKey: adminBookingsKey(useFilters.getState()),
      });
    },
    onError(error: unknown) {
      toast.error(`Failed to cancel booking: ${extractErrorMessage(error)}`);
    },
  });
};

const cancelBooking = async (bookingId: string): Promise<string> => {
  try {
    const res = await axios.put<{ message: string }>(
      `${BACKEND_URL}/api/bookings/${bookingId}/cancel`,
      undefined,
      { withCredentials: true },
    );
    return res.data.message;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};
