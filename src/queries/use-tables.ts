import { BACKEND_URL } from "@/lib/constants";
import { concatenateSearchParams, extractErrorMessage } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Table } from "../../typing";

export const tableKey = (tag?: string) => ["tables", tag];

export const useTables = (tag?: string) => {
  return useQuery({
    queryKey: tableKey(tag),
    queryFn: ({ signal }) => fetchTables({ tag, signal }),
    refetchOnWindowFocus: true,
  });
};

const fetchTables = async ({
  signal,
  tag,
}: {
  tag: string | undefined;
  signal: AbortSignal;
}): Promise<Table[]> => {
  try {
    const res = await axios.get<{ tables: Table[] }>(
      concatenateSearchParams(`${BACKEND_URL}/api/tables`, { tag }),
      {
        withCredentials: true,
        signal,
      },
    );
    return res.data.tables;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};
