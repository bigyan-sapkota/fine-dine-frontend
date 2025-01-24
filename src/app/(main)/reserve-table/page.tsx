"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Table } from "../../../../typing";
import { useProfile } from "@/queries/use-profile";

import { useAvailableTables } from "@/queries/use-available-tables";
import { useIsMutating } from "@tanstack/react-query";
import { bookTableKey } from "@/mutations/use-book-table";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectGroup,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

import { AlertCircle, CalendarIcon, Loader2 } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import moment from "moment";

type CalendarDate = Date | null | [Date | null, Date | null];

const Page = () => {
  const { data: user } = useProfile();

  const [date, onChange] = useState<Date | undefined>(new Date());
  const [capacity, setCapacity] = useState<number>(1);
  const [time, setTime] = useState(9);
  const [selectedTables, setSelectedTables] = useState<string[] | null>(null);

  const fullDate = useMemo(() => {
    const selectedDate = new Date(date?.toString() || Date.now());
    const minutes = Math.round(time) > time ? 0.5 : 0;
    selectedDate.setHours(time);
    selectedDate.setMinutes(minutes);
    selectedDate.setSeconds(0);
    selectedDate.setMilliseconds(0);
    return selectedDate.toISOString();
  }, [date, time]);

  const {
    data: availableTables,
    isLoading: isAvailableTablesLoading,
    refetch: refetchAvailableTables,
  } = useAvailableTables({
    date: fullDate,
    hours: 1,
    tag: "first floor",
  });

  useEffect(() => {
    setSelectedTables(null);
  }, [availableTables, fullDate]);

  const canSelectTable = date && time && (selectedTables?.length || 0) > 0;
  const isBookingTable = !!useIsMutating({ mutationKey: bookTableKey });
  const disabled =
    !((selectedTables?.length || 0) > 0) || !time || !date || isBookingTable;

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

  return (
    <div className="section-padding-x max-width section-padding-y flex flex-col bg-gray-100 lg:flex-row">
      <div className="hidden lg:block lg:w-1/2">
        <img src="/reserve-table/booking.svg" alt="reserve-table" />
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

        <div className="mt-8 flex items-start justify-between gap-4">
          <div className="flex w-full flex-col space-y-4">
            <Label>Select Capacity</Label>
            <Slider
              defaultValue={[1]}
              max={12}
              step={1}
              onValueChange={(values) => setCapacity(values[0])}
              className="w-full"
            />
          </div>
          <div className="flex size-8 items-center justify-center rounded-full bg-gray-300 p-2">
            {capacity}
          </div>
        </div>

        <div className="mt-8 flex flex-col space-y-2">
          <Label>Select time</Label>
          <Select
            value={time.toString()}
            onValueChange={(val) => setTime(Number(val) || 9)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Time" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                {new Array(9).fill("nothing").map((_, i) => (
                  <SelectItem key={i} value={(i + 9).toString()}>
                    {(i + 9) % 12 || 12}
                    {i + 9 >= 12 ? "pm" : "am"}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
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
                Select the service and date first to select the staff
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
                  className={`size-20 ${checkTableSelection(table._id) && "bg-gray-200"} cursor-pointer p-4`}
                  onClick={() => tableClickHandler(table._id)}
                >
                  <div className="relative">
                    <Image
                      src="/reserve-table/round-table.png"
                      width="64"
                      height="64"
                      alt="table"
                    />
                    <div className="rounded-lg bg-black px-2 py-0.5 text-center text-white">
                      {table.attribute}
                    </div>
                    <div className="absolute -right-4 bottom-8">
                      <Image
                        src="/reserve-table/chair.png"
                        width="30"
                        height="30"
                        alt="chair"
                      />
                      <div className="absolute -right-2 -top-2 flex size-5 items-center justify-center rounded-full bg-primary text-sm text-white">
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
          <Button disabled={disabled} loading={isBookingTable}>
            Reserve Table
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
