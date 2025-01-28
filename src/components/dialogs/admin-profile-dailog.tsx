import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Avatar from "@/components/utils/avatar";
import { cn } from "@/lib/utils";
import { Dot, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import React from "react";
import { UserProfile } from "../../../typing";
import { dummyUserImage } from "@/lib/constants";

type Props = { children: React.ReactNode; admin: UserProfile };

export default function AdminProfileDialog({ children, admin }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Admin Details</DialogTitle>
        </DialogHeader>

        <section>
          <Avatar src={admin.image || dummyUserImage} variant="xl" />
          <p className="font-semibold">{admin.name}</p>
          <div className="flex items-center">
            <Mail className="mr-2 size-4" /> <span>{admin.email}</span>
          </div>
          <div className="flex items-center">
            <Phone className="mr-2 size-4" />{" "}
            <span>{admin.phone || "Not specified"}</span>
          </div>
          <div className="flex items-center">
            <ShieldCheck className="mr-2 size-4 fill-green-600 text-white" />
            <span>Admin</span>
          </div>
          <div className="flex items-center">
            <MapPin className="mr-2 size-4" />{" "}
            <span>{admin.address || "Not specified"}</span>
          </div>
          <div className="flex items-center">
            <Dot
              className={cn(
                "mr-2 size-4 scale-150 animate-pulse text-green-600",
              )}
            />
            <span className="rounded-sm bg-green-600/20 px-2 text-green-600">
              Active
            </span>
          </div>
        </section>
      </DialogContent>
    </Dialog>
  );
}
