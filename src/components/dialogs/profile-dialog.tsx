import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Avatar from "@/components/utils/avatar";
import { useProfile } from "@/queries/use-profile";
import { Mail, MapPin, Phone, User } from "lucide-react";
import React from "react";
import { openUpdateProfileDialog } from "./update-profile-dialog";

export default function ProfileDialog({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: profile } = useProfile();

  if (!profile) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent onKeyDown={(e) => e.stopPropagation()}>
        <DialogHeader>
          <DialogTitle className="text-center">Your Profile</DialogTitle>
        </DialogHeader>

        <section>
          <Avatar src={profile.image} variant="xl" />
          <p className="font-semibold mt-1">{profile.name}</p>
          <div className="flex items-center my-1">
            <Mail className="mr-2 size-4" /> <span>{profile.email}</span>
          </div>
          <div className="flex items-center">
            <User className="mr-2 size-4" />
            <span>
              <span>Role - </span> {profile.role}
            </span>
          </div>
        </section>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>

          <Button onClick={openUpdateProfileDialog}>Update Profile</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
