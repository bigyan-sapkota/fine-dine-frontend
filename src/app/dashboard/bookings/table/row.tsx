"use client";
import CancelBookingDropDown from "@/components/dropdowns/cancel-bookings-dropdown";
import { TableCell, TableRow } from "@/components/ui/table";
import Avatar from "@/components/utils/avatar";
import { dummyUserImage } from "@/lib/constants";
import {
  AlertCircle,
  Calendar,
  Check,
  Clock,
  EllipsisVertical,
} from "lucide-react";
import moment from "moment";
import { Booking } from "../../../../../typing";

export default function Row({ booking }: { booking: Booking }) {
  
  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-2">
          <Avatar src={booking.user.image || dummyUserImage} variant="sm" />
          <div className="min-w-0">
            <div className="truncate font-medium">{booking.user.name}</div>
            <div className="truncate text-sm text-gray-500">
              {booking.user.email}
            </div>
          </div>
        </div>
      </TableCell>
      <TableCell>
        {booking.table ? (
          <div className="flex min-w-0 items-center">
            <div className="whitespace-nowrap font-medium">
              {booking.table.attribute}
            </div>

            <div className="whitespace-nowrap text-sm text-gray-500">
              ({booking.table.tag})
            </div>
          </div>
        ) : (
          <span className="text-gray-500">No table assigned</span>
        )}
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2 whitespace-nowrap">
          <Calendar className="h-4 w-4 flex-shrink-0" />
          {moment(booking.startsAt).format("MMM DD, YYYY")}
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2 whitespace-nowrap">
          <Clock className="h-4 w-4 flex-shrink-0" />
          {moment(booking.startsAt).format("HH:mm")} -
          {moment(booking.endsAt).format("HH:mm")}
        </div>
      </TableCell>
      <TableCell>
        <div
          className={`flex w-fit items-center gap-2 whitespace-nowrap rounded-full px-2 py-1 ${
            booking.isCancelled
              ? "bg-red-100 text-red-800"
              : "bg-green-100 text-green-800"
          } `}
        >
          {booking.isCancelled ? (
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
          ) : (
            <Check className="h-4 w-4 flex-shrink-0" />
          )}
          {booking.isCancelled ? "Cancelled" : "Active"}
        </div>
      </TableCell>

      {!booking.isCancelled && (
        <TableCell>
          <CancelBookingDropDown bookingId={booking?._id}>
            <button>
              <EllipsisVertical className="size-4 text-gray-900" />
            </button>
          </CancelBookingDropDown>
        </TableCell>
      )}
    </TableRow>
  );
}
