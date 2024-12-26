import React, { useState } from "react";
import { Loader2, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";

type Props = {
  loading?: boolean;
  onDelete: () => void;
  info?: string;
  triggerOptions?: {
    iconOnly?: boolean;
    size: "sm" | "lg" | "icon";
  };
};

const DeleteAlert = ({ loading, info, onDelete, triggerOptions }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <AlertDialog open={open}>
      <AlertDialogTrigger asChild>
        <Button
          size={triggerOptions?.size}
          variant="outline"
          className="w-fit"
          onClick={() => setOpen(true)}
        >
          <Trash2 className="h-4 w-4 text-destructive" />
          {!triggerOptions?.iconOnly && <span className="">Delete</span>}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete {info}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(false)}>
            Cancel
          </AlertDialogCancel>
          {loading ? (
            <Button disabled>
              <Loader2 className="animate-spin" />
              Please wait
            </Button>
          ) : (
            <AlertDialogAction
              disabled={loading}
              onClick={() => {
                onDelete();
                setOpen(false);
              }}
            >
              Continue
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAlert;
