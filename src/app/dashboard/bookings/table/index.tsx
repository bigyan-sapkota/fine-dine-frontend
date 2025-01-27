"use client";
import ErrorMessage from "@/components/layouts/error-message";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
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
import { dummyUserImage } from "@/lib/constants";
import { useAdminBookings } from "@/mutations/use-admin-booking";
import { useTable } from "@/queries/use-table";
import { useUser } from "@/queries/use-user";
import { AlertCircle, Calendar, Check, Clock, XIcon } from "lucide-react";
import moment from "moment";
import Filter, { useFilters } from "./filter";

const BookingsTable = () => {
  const filters = useFilters();

  const { data, isLoading, fetchNextPage, hasNextPage, error } =
    useAdminBookings(filters);

  const bookings = data?.pages.flat() ?? [];

  const { data: selectedCustomer } = useUser(filters.userId!, {
    enabled: !!filters.userId,
  });
  const { data: selectedTable } = useTable(filters.tableId!, {
    enabled: !!filters.tableId,
  });

  if (isLoading) {
    return <Skeleton className="h-80 w-full" />;
  }

  if (error) {
    return <ErrorMessage />;
  }

  return (
    <div className="w-full">
      <div className="p-4">
        <Filter />
      </div>

      <div className="flex flex-wrap gap-x-2 gap-y-1 px-4">
        {selectedCustomer && (
          <div className="my-2 flex items-center space-x-2 rounded-md bg-rose-500/10 px-4 py-1 text-sm text-rose-500">
            <span>All results for customer {selectedCustomer?.name}</span>
            <Avatar
              src={selectedCustomer?.image || dummyUserImage}
              variant="xs"
            />
            <button onClick={() => useFilters.setState({ userId: undefined })}>
              <XIcon className="size-4" />
            </button>
          </div>
        )}
        {selectedTable && (
          <div className="my-2 flex items-center space-x-2 rounded-md bg-rose-500/10 px-4 py-1 text-sm text-rose-500">
            <span>Showing all results for table - {selectedTable.tag}</span>
            <button onClick={() => useFilters.setState({ tableId: undefined })}>
              <XIcon className="size-4" />
            </button>
          </div>
        )}
      </div>

      <div className="mt-4 overflow-x-auto rounded-md border">
        <ScrollArea>
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
              {!isLoading && bookings.length === 0 && (
                <TableRow>
                  <TableCell colSpan={10} className="text-center">
                    No results found
                  </TableCell>
                </TableRow>
              )}

              {bookings.map((booking, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar
                        src={booking.user.image || dummyUserImage}
                        variant="sm"
                      />
                      <div className="min-w-0">
                        <div className="truncate font-medium">
                          {booking.user.name}
                        </div>
                        <div className="truncate text-sm text-gray-500">
                          {booking.user.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {booking.table ? (
                      <div className="flex items-center gap-2">
                        <span className="whitespace-nowrap font-medium">
                          {booking.table.attribute}
                        </span>
                        <span className="whitespace-nowrap text-sm text-gray-500">
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
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <ScrollBar orientation="horizontal" />
        </ScrollArea>
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
