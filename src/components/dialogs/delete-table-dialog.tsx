import { deleteTableKey, useDeleteTable } from "@/mutations/use-delete-table";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useIsMutating } from "@tanstack/react-query";
import { useRef } from "react";
import { Button } from "../ui/button";

type Props = { children: React.ReactNode; id: string };

export default function DeleteTableDialog({ children, id }: Props) {
  const { mutate } = useDeleteTable(id);
  const isDeletingTable = !!useIsMutating({ mutationKey: deleteTableKey(id) });
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const deleteTable = () => {
    mutate(undefined, {
      onSuccess() {
        closeButtonRef.current?.click();
      },
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This is will delete the Table permanently from the system!
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild ref={closeButtonRef}>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            onClick={deleteTable}
            loading={isDeletingTable}
            disabled={isDeletingTable}
          >
            Confirm Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
