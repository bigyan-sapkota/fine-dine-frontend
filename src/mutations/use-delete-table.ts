import { BACKEND_URL } from "@/lib/constants";
import { getQueryClient } from "@/lib/query-client";
import { extractErrorMessage } from "@/lib/utils";
import { tableKey } from "@/queries/use-tables";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { Table } from "../../typing";

export const deleteTableKey = (id: string) => ["delete-tables", id];

export const useDeleteTable = (id: string) => {
  const queryClient = getQueryClient();

  return useMutation({
    mutationKey: deleteTableKey(id),
    mutationFn: () => deleteTable(id),

    onMutate() {
      toast.dismiss();
      toast.loading("Deleting table...");
    },

    onSuccess() {
      toast.dismiss();
      toast.success("Table deleted successfully");
      const oldTables = queryClient.getQueryData<Table[]>(tableKey);
      if (!oldTables) return;
      const updatedTables = oldTables.filter((table) => table.id !== id);
      queryClient.setQueryData<Table[]>(tableKey, updatedTables);
    },
  });
};

const deleteTable = async (id: string) => {
  try {
    await axios.delete(`${BACKEND_URL}/api/tables/${id}`, {
      withCredentials: true,
    });
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};
