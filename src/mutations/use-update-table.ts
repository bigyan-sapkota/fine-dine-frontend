import { UpdateTableSchema } from "@/lib/form-schema";
import { getQueryClient } from "@/lib/query-client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Table } from "../../typing";
import axios from "axios";
import { BACKEND_URL } from "@/lib/constants";
import { tableKey } from "@/queries/use-tables";
import { extractErrorMessage } from "@/lib/utils";

export const updateTableKey = (id: string) => ["update-table", id];

export const useUpdateTable = (id: string) => {
  const queryClient = getQueryClient();

  return useMutation({
    mutationKey: updateTableKey(id),
    mutationFn: (data: UpdateTableSchema) => updateTable(id, data),
    onMutate() {
      toast.dismiss();
      toast.loading("Updating table...");
    },
    onSuccess(updatedTable) {
      toast.dismiss();
      toast.success("Updated table successfully");
      const oldTablesData = queryClient.getQueryData<Table[]>(tableKey);
      if (!oldTablesData) return;

      const updateTablesData: Table[] = oldTablesData.map((table) => {
        if (table.id !== id) return table;
        return updatedTable as Table;
      });

      queryClient.setQueryData<Table[]>(tableKey, updateTablesData);
    },
  });
};

const updateTable = async (id: string, data: UpdateTableSchema) => {
  try {
    const res = await axios.put<{ table: Table }>(
      `${BACKEND_URL}/api/tables/${id}`,
      data,
      { withCredentials: true },
    );
    return res.data.table;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};
