"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useClassStore } from "@/stores/class-store";
import { ClassCard } from "../class/class-card";
import AddClassDialog from "./add-class";

type Props = { trigger?: React.ReactNode };

const ManageClassDialog = ({ trigger }: Props) => {
  const [open, setOpen] = React.useState(false);
  const { classes } = useClassStore();
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button className="w-full" variant="outline">
            Classes
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Classes</DialogTitle>
          <DialogDescription>List of classes</DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          {classes.map((cls) => {
            return (
              <ClassCard
                onSelect={() => setOpen(false)}
                key={cls.id}
                classInfo={cls}
              />
            );
          })}
        </div>
        <AddClassDialog />
      </DialogContent>
    </Dialog>
  );
};

export default ManageClassDialog;
