import { FormInput } from "@/components/forms/form-input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Avatar from "@/components/utils/avatar";
import { useDebounce } from "@/hooks/use-debounce";
import { dummyUserImage } from "@/lib/constants";
import { getQueryClient } from "@/lib/query-client";
import { KeyOptions } from "@/mutations/use-admin-booking";
import { useUsers } from "@/providers/use-users";
import { createStore } from "@jodd/snap";
import { PopoverClose } from "@radix-ui/react-popover";
import { ChevronsUpDownIcon, SearchIcon } from "lucide-react";
import React, { useState } from "react";
import { Table, User } from "../../../../../typing";
import { userKey } from "@/queries/use-user";
import { tableKey, useTables } from "@/queries/use-tables";

export const useFilters = createStore<KeyOptions>(() => ({}));
export const clearFilters = () => {
  const clearedState = { ...useFilters.getState() };
  for (const key of Object.keys(clearedState)) {
    // @ts-expect-error ...
    clearedState[key] = undefined;
  }
  useFilters.setState({ ...clearedState });
};

export default function Filter() {
  const filters = useFilters();
  const [searchUserInput, setSearchUserInput] = useState("");
  const debouncedSearchUserInput = useDebounce(searchUserInput);

  const [searchTableInput, setSearchTableInput] = useState("");
  const debouncedSearchTableInput = useDebounce(searchTableInput);

  const { data: users, isLoading: isLoadingUsers } = useUsers({
    search: debouncedSearchUserInput.trim(),
    enabled: true,
  });

  const { data: tables, isLoading: isLoadingTables } = useTables(
    debouncedSearchTableInput.trim() || undefined,
  );

  return (
    <div className="flex gap-x-2 gap-y-4">
      <Select
        value={filters.status}
        onValueChange={(val) =>
          useFilters.setState({
            status: val === "all" ? undefined : (val as KeyOptions["status"]),
          })
        }
      >
        <SelectTrigger className="w-44">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Bookings</SelectItem>
          <SelectItem value="pending">Active</SelectItem>
          <SelectItem value="cancelled">Cancelled</SelectItem>
        </SelectContent>
      </Select>

      <Popover>
        <PopoverTrigger asChild>
          <button className="flex h-10 items-center justify-between space-x-6 rounded-md border px-4 text-sm">
            <span>Select Customer</span>
            <ChevronsUpDownIcon className="size-3" />
          </button>
        </PopoverTrigger>

        <PopoverContent>
          <FormInput
            placeholder="Search customer"
            Icon={SearchIcon}
            error={undefined}
            label=""
            value={searchUserInput}
            onChange={(e) => setSearchUserInput(e.target.value)}
          />

          <ScrollArea className="h-60">
            <section className="flex flex-col space-y-0.5 pt-2 text-sm">
              {!isLoadingUsers && users?.pages.at(0)?.length === 0 && (
                <p>No results found.</p>
              )}
              {users?.pages.map((page, i) => (
                <React.Fragment key={i}>
                  {page.map((user) => (
                    <PopoverClose
                      onClick={() => {
                        const queryClient = getQueryClient();
                        queryClient.setQueryData<User>(userKey(user._id), {
                          ...user,
                        });
                        useFilters.setState({ userId: user._id });
                      }}
                      key={user._id}
                      className="flex items-center space-x-2 rounded-md bg-gray-100 px-2 py-1 text-sm font-medium hover:bg-gray-200"
                    >
                      <Avatar src={user.image || dummyUserImage} variant="sm" />
                      <span>{user.name}</span>
                    </PopoverClose>
                  ))}
                </React.Fragment>
              ))}
            </section>
          </ScrollArea>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <button className="flex h-10 items-center justify-between space-x-6 rounded-md border px-4 text-sm">
            <span>Select Table</span>
            <ChevronsUpDownIcon className="size-3" />
          </button>
        </PopoverTrigger>

        <PopoverContent>
          <FormInput
            placeholder="Table tag..."
            Icon={SearchIcon}
            error={undefined}
            label=""
            value={searchTableInput}
            onChange={(e) => setSearchTableInput(e.target.value)}
          />

          <ScrollArea className="h-60">
            <section className="flex flex-col space-y-0.5 pt-2 text-sm">
              {!isLoadingTables && tables?.length === 0 && (
                <p>No results found.</p>
              )}
              {tables?.map((table) => (
                <PopoverClose
                  onClick={() => {
                    const queryClient = getQueryClient();
                    queryClient.setQueryData<Table>(tableKey(table._id), {
                      ...table,
                    });
                    useFilters.setState({ tableId: table._id });
                  }}
                  key={table._id}
                  className="flex items-center space-x-2 rounded-md bg-gray-100 px-2 py-1 text-sm font-medium hover:bg-gray-200"
                >
                  <span>{table.tag}</span>
                </PopoverClose>
              ))}
            </section>
          </ScrollArea>
        </PopoverContent>
      </Popover>
    </div>
  );
}
