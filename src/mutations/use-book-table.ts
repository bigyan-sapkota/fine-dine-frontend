import { getQueryClient } from "@/lib/query-client";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";

export const bookTableKey = ["book-table"];

export const useBookTable = () => {
  const queryClient = getQueryClient();
  const router = useRouter();

  return useMutation({
    mutationKey: bookTableKey,
    mutationFn: bookTable,
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
  } catch (error) {}
};
