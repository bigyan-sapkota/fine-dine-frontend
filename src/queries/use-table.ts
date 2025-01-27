import { apiClient } from "@/lib/api-client";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { Table } from "../../typing";

export const tableKey = (tableId: string) => ["table", tableId];

export const useTable = (
  tableId: string,
  queryOptions?: Partial<UseQueryOptions<Table>>,
) => {
  return useQuery({
    queryKey: tableKey(tableId),
    queryFn: ({ signal }) => fetchTable({ tableId, signal }),
    ...queryOptions,
  });
};

type Options = { tableId: string; signal: AbortSignal };
export const fetchTable = async ({
  tableId,
  signal,
}: Options): Promise<Table> => {
  const res = await apiClient.get<{ table: Table }>(`/api/tables/${tableId}`, {
    signal,
  });
  return res.data.table;
};
