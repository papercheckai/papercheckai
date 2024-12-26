import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { PlusCircleIcon } from "lucide-react";
import AddStudentForm from "../form/AddStudentForm";
import { Prisma } from "@prisma/client";

type Props = {
  _class: Prisma.ClassGetPayload<{}>;
  trigger?: React.ReactNode;
};

const AddStudentDialog = ({ _class, trigger }: Props) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button>
            <PlusCircleIcon className="mr-2 h-4 w-4" /> Add Student
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Student</DialogTitle>
          <DialogDescription>Add new Student to the class</DialogDescription>
        </DialogHeader>
        <AddStudentForm setOpen={setOpen} _class={_class} />
      </DialogContent>
    </Dialog>
  );
};

export default AddStudentDialog;
