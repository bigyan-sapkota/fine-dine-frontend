import { BACKEND_URL } from "@/lib/constants";
import { getStripe } from "@/lib/stripe";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const bookingKey = ["booking-checkout"];
export const useBooking = () => {
  useMutation({
    mutationKey: bookingKey,
    mutationFn: checkoutBooking,
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
  stripe?.redirectToCheckout({ sessionId: res.data.checkoutSessionId });
};
