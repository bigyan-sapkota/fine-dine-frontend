// components/BookingHistory.tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import moment from "moment";
import { Clock, DollarSign, Loader2, MapPin, Users } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "../ui/badge";
import { BACKEND_URL } from "@/lib/constants";

interface BookingHistoryProps {
  userId: string;
  children: React.ReactNode;
}

interface Booking {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
    image: string;
  };
  table: {
    _id: string;
    tag: string;
    attribute: string;
    hourRate: number;
    capacity: number;
    available: boolean;
  };
  price: number;
  startsAt: string;
  endsAt: string;
  isCancelled: boolean;
}

const BookingHistory = ({ userId, children }: BookingHistoryProps) => {
  const { data: bookings, isLoading } = useQuery({
    queryKey: ["bookings", userId],
    queryFn: async () => {
      const { data } = await axios.get(`${BACKEND_URL}/api/bookings`, {
        params: { userId },
      });
      return data.bookings as Booking[];
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Booking History</DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-[70vh] pr-4">
          {isLoading ? (
            <div className="flex h-40 items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
            </div>
          ) : bookings?.length === 0 ? (
            <div className="mt-10 text-center text-gray-500">
              No booking history found
            </div>
          ) : (
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {bookings?.map((booking) => (
                <div
                  key={booking._id}
                  className="bg-card text-card-foreground rounded-lg border p-4 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold capitalize">
                        {booking.table.tag}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {moment(booking.startsAt).format("MMM D, YYYY")}
                      </p>
                    </div>
                    <Badge className="capitalize">
                      {booking.isCancelled ? "Cancelled" : "Active"}
                    </Badge>
                  </div>

                  <div className="mt-4 space-y-2">
                    <div className="text-muted-foreground flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4" />
                      <span>
                        {moment(booking.startsAt).format("h:mm A")} -{" "}
                        {moment(booking.endsAt).format("h:mm A")}
                      </span>
                    </div>

                    <div className="text-muted-foreground flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4" />
                      <span className="capitalize">
                        {booking.table.attribute}
                      </span>
                    </div>

                    <div className="text-muted-foreground flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4" />
                      <span>Capacity: {booking.table.capacity} persons</span>
                    </div>

                    <div className="text-muted-foreground flex items-center gap-2 text-sm">
                      <DollarSign className="h-4 w-4" />
                      <span>Rs. {booking.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default BookingHistory;
