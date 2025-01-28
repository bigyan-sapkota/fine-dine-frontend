import { apiClient } from "@/lib/api-client";
import { getQueryClient } from "@/lib/query-client";
import { extractErrorMessage, uploadImage } from "@/lib/utils";
import { profileKey } from "@/queries/use-profile";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { UserProfile } from "../../typing";
import { RegistrationSchema } from "@/lib/form-schema";

export const useRegister = () => {
  const queryClient = getQueryClient();
  return useMutation({
    mutationKey: ["register"],
    mutationFn: async ({
      image,
      ...data
    }: RegistrationSchema & { image: string | File | undefined }) => {
      console.log({ image, data });
      // const imageUrl =
      //   image instanceof File ? await uploadImage(image) : undefined;
      // console.log({ imageUrl });
      const res = await apiClient.post<{ user: UserProfile }>(
        "/api/auth/register",
        { ...data, image: typeof image === "string" ? image : undefined },
        {
          withCredentials: true,
        },
      );
      return res.data.user;
    },

    onError(err) {
      toast.error(`Could not register account! ${extractErrorMessage(err)}`);
    },
    onSuccess(data) {
      toast.success(`User account registered successfully`)
      queryClient.setQueryData<UserProfile>(profileKey, data);
    },
  });
};
