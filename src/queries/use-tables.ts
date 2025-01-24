import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Table } from "../../typing";
import { BACKEND_URL } from "@/lib/constants";
import { extractErrorMessage } from "@/lib/utils";

export const tableKey = ["tables"];

export const useTables = () => {
  return useQuery({
    queryKey: tableKey,
    queryFn: fetchTables,
    refetchOnWindowFocus: true,
  });
};

const fetchTables = async ({
  signal,
}: {
  signal: AbortSignal;
}): Promise<Table[]> => {
  try {
    const res = await axios.get<{ tables: Table[] }>(
      `${BACKEND_URL}/api/tables`,
      {
        withCredentials: true,
        signal,
      }
    );
    return res.data.tables;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};
