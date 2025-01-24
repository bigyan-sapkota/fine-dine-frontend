import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUpdateUserAdmin } from "@/mutations/use-update-user-admin";
import { CircleUser } from "lucide-react";
import { toast } from "sonner";
import { UserProfile } from "../../../typing";

type Props = {
  admin: UserProfile;
  children: React.ReactNode;
};

export default function AdminOptionsDropdown({ admin, children }: Props) {
  const { mutate } = useUpdateUserAdmin(admin._id);

  const updateAdmin = (options: { role?: "admin" | "user" }) => {
    mutate(options, {
      onError(err) {
        toast.dismiss();
        toast.error(`Could not update admin! ${err.message}`);
      },
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuLabel>{admin.name}</DropdownMenuLabel>

        {admin.role !== "user" && (
          <DropdownMenuItem className="bg-fuchsia-600/10">
            <button
              onClick={() => updateAdmin({ role: "user" })}
              className="flex items-center"
            >
              <CircleUser className="mr-2 size-4 fill-fuchsia-600 text-white" />
              <span>Demote to user</span>
            </button>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
