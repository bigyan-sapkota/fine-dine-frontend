"use client";
import { useProfile } from "@/queries/use-profile";
import { useEffect, useMemo, useState } from "react";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { bookTableKey } from "@/mutations/use-book-table";
import { useAvailableTables } from "@/queries/use-available-tables";
import { useIsMutating } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useBooking } from "@/mutations/use-booking";
import { AlertCircle, CalendarIcon, Loader2 } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";

// Type for time slot
interface TimeSlot {
  label: string;
  value: string;
}

const Page = () => {
  const { data: user } = useProfile();
  const { mutate } = useBooking();

  const [date, onChange] = useState<Date | undefined>(new Date());
  const [capacity, setCapacity] = useState<number>(1);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedTables, setSelectedTables] = useState<string[] | null>(null);
  const [hours, setHours] = useState<number>(1);

  // Generate time slots for the day (9 AM to 5 PM with 15-minute intervals)
  const timeSlots: TimeSlot[] = useMemo(() => {
    const slots: TimeSlot[] = [];
    const currentDate = new Date();
    const selectedDate = date || currentDate;

    // Check if the selected date is today
    const isToday = selectedDate.toDateString() === currentDate.toDateString();

    // Get current time plus 30 minutes
    const currentHour = currentDate.getHours();
    const currentMinute = currentDate.getMinutes();
    const minTimeInMinutes = currentHour * 60 + currentMinute + 30;

    for (let hour = 9; hour < 18; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const timeInMinutes = hour * 60 + minute;

        // Skip times that are less than 30 minutes from now (only for today)
        if (isToday && timeInMinutes <= minTimeInMinutes) {
          continue;
        }

        const isPM = hour >= 12;
        const displayHour = hour % 12 || 12;
        const timeValue = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
        const label = `${displayHour}:${minute.toString().padStart(2, "0")} ${isPM ? "PM" : "AM"}`;
        slots.push({ label, value: timeValue });
      }
    }
    return slots;
  }, [date]);

  const fullDate = useMemo(() => {
    if (!date || !selectedTime) return new Date().toISOString();

    const [hours, minutes] = selectedTime.split(":").map(Number);
    const selectedDate = new Date(date);
    selectedDate.setHours(hours);
    selectedDate.setMinutes(minutes);
    selectedDate.setSeconds(0);
    selectedDate.setMilliseconds(0);
    return selectedDate.toISOString();
  }, [date, selectedTime]);

  const { data: availableTables, isLoading: isAvailableTablesLoading } =
    useAvailableTables({
      date: fullDate,
      hours: 1,
    });

  useEffect(() => {
    setSelectedTables(null);
  }, [availableTables, fullDate]);

  const canSelectTable = date && selectedTime && capacity;
  const isBookingTable = !!useIsMutating({ mutationKey: bookTableKey });
  const disabled =
    !((selectedTables?.length || 0) > 0) ||
    !selectedTime ||
    !date ||
    isBookingTable;

  const checkTableSelection = (id: string) => {
    return selectedTables?.includes(id);
  };

  const tableClickHandler = (id: string) => {
    let updatedTables = null;
    if (checkTableSelection(id)) {
      updatedTables = selectedTables?.filter((item) => item !== id);
    } else {
      updatedTables = [...(selectedTables || []), id];
    }
    setSelectedTables(updatedTables!);
  };

  const reserveTable = () => {
    if (!user?._id || !selectedTables) return;
    mutate({
      tableIds: selectedTables!,
      startsAt: fullDate,
      userId: user?._id,
      hours: 1,
      successUrl: `${location.origin}`,
      cancelUrl: `${location.origin}`,
    });
  };

  if (!user) {
    return (
      <div className="mt-14 flex items-center justify-center lg:mt-0 lg:h-96">
        <div className="flex flex-col justify-center rounded-xl border p-6 shadow-md lg:p-10">
          <h2 className="font-bold">Login to proceed</h2>
          <p className="my-4">Only registered users can reserve table</p>
          <Link href="/login" className="flex justify-center">
            <Button variant="common">Log In</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="section-padding-x max-width section-padding-y flex flex-col bg-gray-100 lg:flex-row">
      <div className="hidden lg:block lg:w-1/2">
        <Image
          src="/reserve-table/booking.svg"
          width="600"
          height="500"
          alt="reserve-table"
        />
      </div>

      <div className="rounded-xl border bg-white p-4 shadow lg:w-1/2 lg:p-10">
        <h2 className="mb-4 text-center">Book Table</h2>

        <div className="flex items-center gap-2">
          <Label>Pick the data : </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                <div className="items-centers flex gap-4">
                  {date ? moment(date).format("MMMM D, YYYY") : "Pick a date"}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </div>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                fromDate={new Date(Date.now() + 1 * 60 * 60 * 1000)}
                toDate={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)}
                selected={date}
                onSelect={onChange}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="mt-8 flex flex-col space-y-2">
          <Label>Select time</Label>
          <Select value={selectedTime} onValueChange={setSelectedTime}>
            <SelectTrigger>
              <SelectValue placeholder="Select Time" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                {timeSlots.map((slot) => (
                  <SelectItem key={slot.value} value={slot.value}>
                    {slot.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Capacity Slider */}
        <div className="mt-8 flex flex-col space-y-2">
          <Label>Number of People</Label>
          <div className="flex flex-col space-y-2">
            <Slider
              min={1}
              max={10}
              step={1}
              value={[capacity]}
              onValueChange={(value) => setCapacity(value[0])}
            />
            <span className="text-sm text-gray-500">
              Selected: {capacity} people
            </span>
          </div>
        </div>

        {/* Hours Slider */}
        <div className="mt-8 flex flex-col space-y-2">
          <Label>Duration (hours)</Label>
          <div className="flex flex-col space-y-2">
            <Slider
              min={1}
              max={4}
              step={1}
              value={[hours]}
              onValueChange={(value) => setHours(value[0])}
            />
            <span className="text-sm text-gray-500">
              Selected: {hours} hour(s)
            </span>
          </div>
        </div>

        <div className="mt-8 flex flex-col space-y-2">
          <Label className="mb-2">Select table</Label>
          {canSelectTable && isAvailableTablesLoading && (
            <div className="border-border flex h-9 w-full items-center justify-between rounded-lg border px-3 text-sm">
              <span>Finding available tables...</span>
              <Loader2 className="size-4 animate-spin text-gray-700" />
            </div>
          )}
          {!canSelectTable && (
            <div className="flex items-center gap-3 rounded-md border border-yellow-400 bg-yellow-100 p-4 text-yellow-800">
              <AlertCircle className="h-5 w-5" />
              <span className="text-sm font-medium">
                Select the capacity, time and date first to book table
              </span>
            </div>
          )}
          {!isAvailableTablesLoading && availableTables?.length === 0 && (
            <div className="border-border flex h-9 items-center rounded-lg border px-3 text-sm">
              <span>No any table available on the selected date & time</span>
            </div>
          )}

          {canSelectTable && (availableTables?.length || 0) > 0 && (
            <div className="grid grid-cols-3 gap-10 md:grid-cols-4 lg:grid-cols-5">
              {availableTables?.map((table, i) => (
                <div
                  key={i}
                  className={`size-20 ${checkTableSelection(table._id) && "bg-secondary"} cursor-pointer p-4`}
                  onClick={() => tableClickHandler(table._id)}
                >
                  <div className="relative">
                    <Image
                      src="/reserve-table/round-table.png"
                      width="64"
                      height="64"
                      alt="table"
                    />
                    <div className="w-10 rounded-lg bg-black px-1 py-0.5 text-center text-xs font-semibold text-white">
                      Table
                    </div>
                    <div className="absolute -right-4 bottom-8">
                      <Image
                        src="/reserve-table/chair.png"
                        width="30"
                        height="30"
                        alt="chair"
                      />
                      <div
                        className={`absolute -right-2 -top-2 flex size-5 items-center justify-center rounded-full bg-primary text-sm text-white`}
                      >
                        {table.capacity}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-10 flex items-center gap-4">
          <Button
            variant="outline"
            className="custom-transition hover:bg-gray-200"
          >
            Cancel
          </Button>
          <Button
            disabled={disabled}
            loading={isBookingTable}
            onClick={reserveTable}
          >
            Reserve Table
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
