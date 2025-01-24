import { BACKEND_URL } from "@/lib/constants";
import { extractErrorMessage } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

export const bookTableKey = ["book-table"];
export const useBookTable = () => {
  return useMutation({
    mutationKey: bookTableKey,
    mutationFn: bookTable,
    onSuccess() {
      toast.dismiss();
      toast.success("Booked Successfully");
    },
    onMutate() {
      toast.dismiss();
      toast.loading(`Booking appointment...`);
    },
  });
};

type Options = {
  tableIds: string[];
  startsAt: string;
  hours: number;
  userId: string;
};
const bookTable = async (data: Options): Promise<string> => {
  try {
    const res = await axios.post<{ message: string }>(
      `${BACKEND_URL}/api/bookings`,
      data,
      {
        withCredentials: true,
      },
    );
    return res.data.message;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};
