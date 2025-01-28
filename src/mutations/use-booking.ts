import { BACKEND_URL } from "@/lib/constants";
import { getStripe } from "@/lib/stripe";
import { extractErrorMessage } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

export const bookingKey = ["booking-checkout"];
export const useBooking = () => {
  return useMutation({
    mutationKey: bookingKey,
    mutationFn: checkoutBooking,
    onError(err) {
      toast.error(`Could not reserve table! ${extractErrorMessage(err)}`);
    },
  });
};

type Options = {
  tableIds: string[];
  startsAt: string;
  hours: number;
  userId: string;
  successUrl: string;
  cancelUrl: string;
};

const checkoutBooking = async (data: Options) => {
  const res = await axios.post<{ checkoutSessionId: string }>(
    `${BACKEND_URL}/api/bookings`,
    data,
    {
      withCredentials: true,
    },
  );
  const stripe = await getStripe();
  await stripe?.redirectToCheckout({ sessionId: res.data.checkoutSessionId });
};
