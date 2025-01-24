import { useQuery } from "@tanstack/react-query";
import { Table } from "../../typing";
import axios from "axios";
import { BACKEND_URL } from "@/lib/constants";
import { extractErrorMessage } from "@/lib/utils";

type KeyOptions = {
  date: string | null;
  hours: number | null;
  tag?: string | null;
};

export const availableTableKeys = (options: KeyOptions) => [
  "available-tables",
  options,
];

export const useAvailableTables = ({ date, hours, tag }: KeyOptions) => {
  return useQuery({
    queryKey: availableTableKeys({ date, hours, tag }),
    queryFn: ({ signal }) => fetchAvailableTables({ signal, date, hours, tag }),
    enabled: !!(date && hours),
    refetchOnMount: true,
  });
};

type Options = { signal: AbortSignal } & KeyOptions;

const fetchAvailableTables = async ({ signal, date, hours, tag }: Options) => {
  try {
    let url;

    url = `${BACKEND_URL}/api/tables?date=${date}&hours=${hours?.toString()}`;
    if (tag) {
      url = `${BACKEND_URL}/api/tables?date=${date}&hours=${hours?.toString()}&tag=${tag}`;
    }

    const res = await axios.get<{ tables: Table[] }>(url, {
      withCredentials: true,
      signal,
    });
    return res.data.tables;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};
