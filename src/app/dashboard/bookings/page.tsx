"use client";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertCircle, Calendar, Check, Clock } from "lucide-react";
import moment from "moment";
import Avatar from "@/components/utils/avatar";
import { useAdminBookings } from "@/mutations/use-admin-booking";
import { Skeleton } from "@/components/ui/skeleton";
import ErrorMessage from "@/components/layouts/error-message";

const BookingsTable = () => {
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const { data, isLoading, fetchNextPage, hasNextPage, error } =
    useAdminBookings({
      userId: null,
      isCancelled: filterStatus === "all" ? null : filterStatus === "cancelled",
    });

  const bookings = data?.pages.flat() ?? [];

  if (isLoading) {
    return <Skeleton className="h-80 w-full" />;
  }

  if (error) {
    return <ErrorMessage />;
  }

  return (
    <div className="w-full">
      <div className="fmb-4 p-4">
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Bookings</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[200px]">Customer</TableHead>
              <TableHead className="min-w-[150px]">Table</TableHead>
              <TableHead className="min-w-[150px]">Date</TableHead>
              <TableHead className="min-w-[150px]">Time</TableHead>
              <TableHead className="min-w-[120px]">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((booking, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar src={booking.user.image} variant="sm" />
                    <div className="min-w-0">
                      <div className="font-medium truncate">
                        {booking.user.name}
                      </div>
                      <div className="text-sm text-gray-500 truncate">
                        {booking.user.email}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {booking.table ? (
                    <div className="flex items-center gap-2">
                      <span className="font-medium whitespace-nowrap">
                        {booking.table.attribute}
                      </span>
                      <span className="text-sm text-gray-500 whitespace-nowrap">
                        ({booking.table.tag})
                      </span>
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
                    className={`
                    flex items-center gap-2 rounded-full px-2 py-1 w-fit whitespace-nowrap
                    ${
                      booking.isCancelled
                        ? "bg-red-100 text-red-800"
                        : "bg-green-100 text-green-800"
                    }
                  `}
                  >
                    {booking.isCancelled ? (
                      <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    ) : (
                      <Check className="h-4 w-4 flex-shrink-0" />
                    )}
                    {booking.isCancelled ? "Cancelled" : "Active"}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          className="mt-4 w-full py-2 text-center text-sm text-gray-600 hover:text-gray-900"
        >
          Load more bookings
        </button>
      )}
    </div>
  );
};

export default BookingsTable;
