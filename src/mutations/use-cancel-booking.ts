import { BACKEND_URL } from "@/lib/constants";
import { extractErrorMessage } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

export const cancelBookingKey = ["cancel-booking"];

export const useCancelBooking = () => {
  return useMutation({
    mutationKey: cancelBookingKey,
    mutationFn: ({ bookingId }: { bookingId: string }) =>
      cancelBooking(bookingId),
    onSuccess() {
      toast.dismiss();
      toast.success("Booking Cancelled");
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
    );
    return res.data.message;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};
