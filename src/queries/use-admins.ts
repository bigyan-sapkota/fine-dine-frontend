import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { UserProfile } from "../../typing";
import { BACKEND_URL } from "@/lib/constants";
import { extractErrorMessage } from "@/lib/utils";

export const adminsKey = ["admins"];

export const useAdmins = () => {
  return useQuery({
    queryKey: adminsKey,
    queryFn: fetchAdmins,
    refetchOnWindowFocus: true,
  });
};

const fetchAdmins = async ({ signal }: { signal: AbortSignal }) => {
  try {
    const res = await axios.get<{ users: UserProfile[] }>(
      `${BACKEND_URL}/api/users?role=admin`,
      { withCredentials: true, signal }
    );
    return res.data.users;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
};
