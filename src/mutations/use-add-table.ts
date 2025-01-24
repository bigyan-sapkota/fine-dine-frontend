import { BACKEND_URL } from "@/lib/constants";
import { AddTableSchema } from "@/lib/form-schema";
import { extractErrorMessage } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

export const addTableKey = ["add-table"];

export const useAddTable = () => {
  return useMutation({
    mutationKey: addTableKey,
    mutationFn: (data: AddTableSchema) => addTable(data),
    onMutate() {
      toast.dismiss();
      toast.loading("Adding new table...");
    },
    onSuccess() {
      toast.dismiss();
      toast.success("Table added successfully");
    },
    onError(err) {
      toast.dismiss();
      toast.error(`Could not add table! ${err.message}`);
    },
  });
};

const addTable = async (data: AddTableSchema) => {
  try {
    await axios.post(`${BACKEND_URL}/api/tables`, data, {
      withCredentials: true,
    });
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};
