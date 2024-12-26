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
import { PencilIcon } from "lucide-react";
import EditStudentForm from "../form/EditStudentForm";
import { Prisma } from "@prisma/client";

type Props = { student: Prisma.StudentGetPayload<{}> };

const EditStudentDialog = ({ student }: Props) => {
  const [isOpen, setOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <PencilIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Student</DialogTitle>
          <DialogDescription>Edit Student to the class</DialogDescription>
        </DialogHeader>
        <EditStudentForm setOpen={setOpen} student={student} />
      </DialogContent>
    </Dialog>
  );
};

export default EditStudentDialog;
