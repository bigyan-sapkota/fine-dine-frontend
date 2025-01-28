import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUpdateUserAdmin } from "@/mutations/use-update-user-admin";
import { Ban, CircleUser } from "lucide-react";
import { toast } from "sonner";
import { UserProfile } from "../../../typing";
import { useCancelBooking } from "@/mutations/use-cancel-booking";

export default function CancelBookingDropDown({
  bookingId,
  children,
}: {
  bookingId: string;
  children: React.ReactNode;
}) {
  const { mutate: cancelBooking } = useCancelBooking();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel></DropdownMenuLabel>
        <DropdownMenuItem className="bg-fuchsia-600/10">
          <button
            onClick={() => cancelBooking({ bookingId: bookingId })}
            className="flex items-center"
          >
            <Ban className="mr-2 size-4 text-red-600" />
            <span>Cancel Booking</span>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
