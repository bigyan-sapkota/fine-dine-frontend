import { BACKEND_URL } from "@/lib/constants";
import { UpdateProfileSchema } from "@/lib/form-schema";
import { getQueryClient } from "@/lib/query-client";
import { extractErrorMessage } from "@/lib/utils";
import { profileKey } from "@/queries/use-profile";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { UserProfile } from "../../typing";

export const updateProfileKey = ["update-profile"];

export const useUpdateProfile = () => {
  const queryClient = getQueryClient();

  return useMutation({
    mutationKey: updateProfileKey,
    mutationFn: updateProfile,
    onMutate() {
      toast.dismiss();
      toast.loading("Updating profile...");
    },
    onSuccess(user) {
      toast.dismiss();
      toast.success("Profile updated successfully");
      queryClient.setQueryData<UserProfile>(profileKey, user);
    },
    onError(err) {
      toast.dismiss();
      toast.error(`Could not update profile! ${err.message}`);
    },
  });
};

export const updateProfile = async (
  data: Partial<UpdateProfileSchema>,
): Promise<UserProfile> => {
  try {
    const res = await axios.put<{ user: UserProfile }>(
      `${BACKEND_URL}/api/users/profile`,
      data,
      {
        withCredentials: true,
      },
    );
    return res.data.user;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};
