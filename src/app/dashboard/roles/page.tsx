"use client";
import AddAdminDialog from "@/components/dialogs/add-admin-dialog";
import AdminProfileDialog from "@/components/dialogs/admin-profile-dailog";
import AdminOptionsDropdown from "@/components/dropdowns/admin-options-dropdown";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Avatar from "@/components/utils/avatar";
import { updateUserKey } from "@/mutations/use-update-user-admin";
import { useAdmins } from "@/queries/use-admins";
import { useProfile } from "@/queries/use-profile";
import { useIsMutating } from "@tanstack/react-query";
import {
  AlertCircle,
  EllipsisVertical,
  Loader2,
  Mail,
  ShieldCheck,
  UserRoundPlus,
} from "lucide-react";
import { UserProfile } from "../../../../typing";
import { dummyUserImage } from "@/lib/constants";

const Page = () => {
  const { data: admins, isLoading, error } = useAdmins();

  return (
    <main className="w-full flex-1 overflow-x-auto p-4">
      <section className="flex justify-between">
        <h3 className="text-lg font-semibold">All Admins</h3>

        <AddAdminDialog>
          <Button Icon={UserRoundPlus} className="flex items-center space-x-2">
            Add new Staff
          </Button>
        </AddAdminDialog>
      </section>

      <div className="scrollbar-thin w-full max-w-full overflow-x-auto">
        {error && (
          <Alert variant="destructive" className="mt-2">
            <AlertCircle className="size-4" />
            <AlertTitle>Could not load staffs!</AlertTitle>
            <AlertDescription>{error.message}</AlertDescription>
          </Alert>
        )}

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Admins</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Mail</TableHead>
              <TableHead>Change Role</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="font-medium">
            {admins?.map((admin, i) => <Admin admin={admin} key={i} />)}
          </TableBody>
        </Table>

        {isLoading && <Skeleton className="mt-2 h-80 w-full" />}
      </div>
    </main>
  );
};
function Admin({ admin }: { admin: UserProfile }) {
  const { data: profile } = useProfile();
  const isUpdatingAdmin = !!useIsMutating({
    mutationKey: updateUserKey(admin._id),
  });

  return (
    <TableRow key={admin._id}>
      <TableCell>
        <AdminProfileDialog admin={admin}>
          <button className="flex items-center space-x-3">
            <Avatar src={admin.image || dummyUserImage} />
            <span className="text-base font-semibold">{admin.name}</span>
          </button>
        </AdminProfileDialog>
      </TableCell>
      <TableCell className="capitalize">
        <div className="flex items-center space-x-1">
          <ShieldCheck className="size-5 fill-green-600 text-white" />
          <span>Admin</span>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center space-x-1">
          <Mail className="size-5 fill-gray-800 text-white" />
          <span>{admin.email}</span>
        </div>
      </TableCell>
      <TableCell>
        {profile?._id !== admin._id && (
          <AdminOptionsDropdown admin={admin}>
            <button>
              {isUpdatingAdmin ? (
                <Loader2 className="size-4 animate-spin text-gray-900" />
              ) : (
                <EllipsisVertical className="size-4 text-gray-900" />
              )}
            </button>
          </AdminOptionsDropdown>
        )}
      </TableCell>
    </TableRow>
  );
}

export default Page;
