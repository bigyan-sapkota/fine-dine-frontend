"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  addTableSchema,
  AddTableSchema,
  UpdateTableSchema,
} from "@/lib/form-schema";
import { cn } from "@/lib/utils";
import { addTableKey, useAddTable } from "@/mutations/use-add-table";
import { updateTableKey, useUpdateTable } from "@/mutations/use-update-table";
import { zodResolver } from "@hookform/resolvers/zod";
import { useIsMutating } from "@tanstack/react-query";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { Table } from "../../../typing";
import { FormInput } from "../forms/form-input";
import { Button } from "../ui/button";
import DeleteTableDialog from "./delete-table-dialog";

type Props =
  | { children: React.ReactNode; mode: "add"; table?: undefined }
  | { children: React.ReactNode; mode: "update"; table: Table };
export default function AddTableDialog({ children, mode, table }: Props) {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<AddTableSchema>({
    resolver: zodResolver(addTableSchema),
    defaultValues: {
      tag: table?.tag,
      attribute: table?.attribute,
      capacity: table?.capacity,
    },
  });

  const { mutate: addTable } = useAddTable();
  const { mutate: updateTable } = useUpdateTable(table?.id || "");

  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const isAddingTable = !!useIsMutating({ mutationKey: addTableKey });
  const isUpdatingTable = !!useIsMutating({
    mutationKey: updateTableKey(table?.id!),
  });

  const disabled = mode === "add" ? isAddingTable : isUpdatingTable;

  const onSubmit = async (data: AddTableSchema) => {
    if (disabled) return;

    const onSuccess = () => {
      reset();
      closeButtonRef.current?.click();
    };

    if (mode === "add") {
      addTable(data, { onSuccess });
    } else {
      const dataToUpdate: UpdateTableSchema = data;
      for (const [key, value] of Object.entries(table)) {
        // @ts-expect-error ...
        if (dataToUpdate[key] === value) dataToUpdate[key] = undefined;
      }
      updateTable(data, { onSuccess });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="flex max-h-screen flex-col">
        <DialogHeader>
          <DialogTitle className="text-center">
            {mode === "add" ? "Add new Table" : "Update Table"}
          </DialogTitle>
          <DialogDescription className="hidden"></DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-grow flex-col space-y-2 overflow-y-auto px-2 scrollbar-thin"
        >
          <div className="flex flex-grow flex-col space-y-5">
            <FormInput
              id="tag"
              Icon={null}
              error={errors.tag?.message}
              label="Tag"
              placeholder="Tag(e.g.first floor)..."
              {...register("tag")}
            />
            <FormInput
              id="attribute"
              Icon={null}
              error={errors.attribute?.message}
              label="Attribute"
              type="string"
              {...register("attribute")}
              placeholder="Table attribute(e.g.T01)..."
            />
            <FormInput
              id="capacity"
              Icon={null}
              error={errors.capacity?.message}
              label="Capacity"
              type="string"
              {...register("capacity")}
              placeholder="Table Capacity"
            />
          </div>
        </form>

        <DialogFooter>
          <DialogClose asChild ref={closeButtonRef}>
            <Button type="button" variant="outline" className="">
              Close
            </Button>
          </DialogClose>

          {table && (
            <DeleteTableDialog id={table.id}>
              <Button type="button" variant="outline">
                Delete Table
              </Button>
            </DeleteTableDialog>
          )}

          <Button
            disabled={disabled || isUpdatingTable}
            onClick={handleSubmit(onSubmit)}
            type="submit"
            loading={disabled}
            className="relative"
          >
            <span className={cn({ "opacity-0": disabled })}>
              {mode === "add" ? "Add Table" : "Update"} Table
            </span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
