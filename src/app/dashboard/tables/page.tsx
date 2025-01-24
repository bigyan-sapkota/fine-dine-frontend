"use client";

import AddTableDialog from "@/components/dialogs/add-table-dialog";
import ErrorMessage from "@/components/layouts/error-message";
import Table from "@/components/tables/table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useTables } from "@/queries/use-tables";
import { PackagePlus } from "lucide-react";
import { useState } from "react";

const Page = () => {
  const { data: tables, isLoading, error } = useTables();

  const [selectedFloor, setSelectedFloor] = useState("all");
  const uniqueFloors = ["all", ...new Set(tables?.map((table) => table.tag))];

  const filteredTables =
    selectedFloor === "all"
      ? tables
      : tables?.filter((table) => table.tag === selectedFloor);

  if (error) {
    return <ErrorMessage />;
  }

  if (isLoading) {
    return <TableSkeleton />;
  }

  return (
    <main>
      <div className="sticky left-0 top-16 z-10 flex items-center justify-between bg-white/80 px-4 py-3 filter backdrop-blur-2xl lg:left-60">
        <Select value={selectedFloor} onValueChange={setSelectedFloor}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select floor" />
          </SelectTrigger>
          <SelectContent>
            {uniqueFloors.map((floor) => (
              <SelectItem key={floor} value={floor}>
                {floor.charAt(0).toUpperCase() + floor.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <AddTableDialog mode="add">
          <Button Icon={PackagePlus}>Add new Table</Button>
        </AddTableDialog>
      </div>

      <div className="p-4 py-0">
        <Card className="bg-white">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-12 xl:grid-cols-4 sm:gap-8 md:gap-10 lg:gap-x-10 lg:gap-y-16 justify-items-center py-10">
            {filteredTables?.map((table, i) => (
              <Table key={i} table={table} />
            ))}
          </div>
        </Card>
      </div>
    </main>
  );
};

export default Page;

const TableSkeleton = () => {
  const arr = Array.from({ length: 8 }, (_, index) => index + 1);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-12 xl:grid-cols-4 sm:gap-8 md:gap-10 lg:gap-x-10 lg:gap-y-16 justify-items-center mt-10 lg:mt-24">
      {arr.map((item) => (
        <div key={item} className="relative">
          <Skeleton className="w-32 h-32 rounded-full shadow" />
          <Skeleton className="size-8 absolute top-0 left-0 rounded-full shadow" />
          <Skeleton className="size-8 absolute top-0 right-0 rounded-full shadow" />
          <Skeleton className="size-8 absolute bottom-0 left-0 rounded-full shadow" />
          <Skeleton className="size-8 absolute bottom-0 right-0 rounded-full shadow" />
        </div>
      ))}
    </div>
  );
};
