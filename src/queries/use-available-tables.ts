import { BACKEND_URL } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type KeyOptions = {
  date: string | null;
  hours: string | null;
  tag?: string | null;
};

export const availableTablesKey = (options: KeyOptions) => [
  "available-tables",
  options,
];

export const useAvailableTables = ({ date, hours, tag }: KeyOptions) => {
  return useQuery({
    queryKey: availableTablesKey({ date, hours, tag }),
    queryFn: ({ signal }) =>
      fetchAvailableTable({ signal, date: date!, hours: hours!, tag }),
  });
};

type Options = KeyOptions & { signal: AbortSignal };

const fetchAvailableTable = async ({ signal, date, tag, hours }: Options) => {
  try {
    let url;
    if (tag) {
      url = `${BACKEND_URL}/api/tables/available?date=${date}&hours=${hours}&tag=${tag}`;
    } else {
      url = `${BACKEND_URL}/api/tables/available?date=${date}&hours=${hours}`;
    }
    const res = await axios.get<{}>(url, { withCredentials: true, signal });
  } catch (error) {}
};
