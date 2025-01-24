"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDebounce } from "@/hooks/use-debounce";
import { useState } from "react";
import InfiniteScrollObserver from "../utils/infinite-scroll-observer";
import { AutoAnimate } from "@jodd/auto-animate";
import { Skeleton } from "../ui/skeleton";
import { UserProfile } from "../../../typing";
import {
  updateUser,
  updateUserKey,
  useUpdateUserAdmin,
} from "@/mutations/use-update-user-admin";
import { useIsMutating } from "@tanstack/react-query";
import { useAdmins } from "@/queries/use-admins";
import Avatar from "../utils/avatar";
import { useUsers } from "@/queries/use-search-users";

export default function AddAdminDialog({
  children,
}: {
  children: React.ReactNode;
}) {
  const [searchInput, setSearchInput] = useState("");
  const enabled = useDebounce(searchInput);
  const { data, isLoading, isFetching, hasNextPage, fetchNextPage } = useUsers({
    search: searchInput,
    enabled,
  });
  const users = data?.pages.flat(1) || [];

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="flex max-h-full flex-col overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-center">Add new admin</DialogTitle>
        </DialogHeader>

        <section className="flex h-full flex-col overflow-y-auto px-2 scrollbar-hide">
          <div className="space-y-2.5 pr-2">
            <Label id="search">Search users</Label>
            <Input
              id="search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search..."
            />
            <div className="text-sm font-semibold">
              <span>Results:</span>
              {!isLoading && users.length === 0 && (
                <span className="text-gray-800">no users found</span>
              )}
            </div>
          </div>

          <AutoAnimate className="mt-3 flex h-full flex-col space-y-2 overflow-y-auto overflow-x-hidden pr-1 scrollbar-thin">
            {(isLoading || !enabled) &&
              new Array(5).fill("nothing").map((item, i) => (
                <div key={i} className="w-full">
                  {skeleton}
                </div>
              ))}

            {users.map((user, i) => (
              <User key={i} user={user} />
            ))}

            <InfiniteScrollObserver
              isFetching={isFetching}
              hasNextPage={hasNextPage}
              fetchNextPage={fetchNextPage}
              showLoader={users.length > 10}
            />
          </AutoAnimate>
        </section>
      </DialogContent>
    </Dialog>
  );
}

function User({ user }: { user: UserProfile }) {
  const { mutate } = useUpdateUserAdmin(user._id);
  const { data: admins } = useAdmins();

  const isAddingAdmin = !!useIsMutating({
    mutationKey: updateUserKey(user.id),
  });

  const addAdmin = () => {
    mutate({ role: "admin" });
  };

  const isAdminAdded = admins?.find((admin) => admin._id === user._id);
  if (isAdminAdded) return null;

  return (
    <div className="flex items-center py-1 text-sm">
      <Avatar src={user.image} className="mr-2" variant="sm" />
      <span className="font-semibold">{user.name}</span>
      <Button
        disabled={isAddingAdmin}
        loading={isAddingAdmin}
        onClick={addAdmin}
        className="relative ml-auto"
        size="sm"
      >
        Make Admin
      </Button>
    </div>
  );
}

const skeleton = (
  <div className="flex items-center">
    <Skeleton className="size-7 rounded-full" />
    <Skeleton className="ml-2 mr-auto h-6 w-40" />
    <Skeleton className="h-8 w-20" />
  </div>
);
