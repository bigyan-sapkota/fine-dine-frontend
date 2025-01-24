import { BACKEND_URL } from "@/lib/constants";
import { getQueryClient } from "@/lib/query-client";
import { extractErrorMessage } from "@/lib/utils";
import { adminsKey } from "@/queries/use-admins";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { UserProfile } from "../../typing";

export const updateUserKey = (id: string) => ["update-user", id];

export const useUpdateUserAdmin = (id: string) => {
  const queryClient = getQueryClient();

  return useMutation({
    mutationKey: updateUserKey(id),
    mutationFn: (data: Omit<Options, "id">) => updateUser({ id, ...data }),

    onSuccess(_, { role }) {
      const oldAdminsData = queryClient.getQueryData<UserProfile[]>(adminsKey);
      if (!oldAdminsData) return;

      let updatedAdminsData: UserProfile[] = oldAdminsData.map((admin) => {
        if (admin.id !== id) return admin;
        return {
          ...admin,
          role: role || admin.role,
        };
      });

      updatedAdminsData = updatedAdminsData.filter(
        (admin) => admin.role !== "user",
      );

      queryClient.setQueryData<UserProfile[]>(adminsKey, updatedAdminsData);
    },

    onSettled() {
      queryClient.invalidateQueries({ queryKey: adminsKey });
    },
  });
};

type Options = {
  role?: "user" | "admin";
  id: string;
};

export const updateUser = async ({ id, ...data }: Options) => {
  try {
    await axios.put(`${BACKEND_URL}/api/users/${id}`, data, {
      withCredentials: true,
    });
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};
