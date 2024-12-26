"use client";
import { AddStudentSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form } from "../ui/form";
import InputFormField from "./InputFormField";
import { Prisma } from "@prisma/client";
import SelectFormField from "./SelectFormField";
import AddClassDialog from "../modal/add-class";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { addStudent, getStudents } from "@/actions/student";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useStudentStore } from "@/stores/student-store";

type Props = {
  classes?: Prisma.ClassGetPayload<{}>[];
  _class?: Prisma.ClassGetPayload<{}>;
  setOpen: (value: boolean) => void;
};

const AddStudentForm = ({ classes, _class, setOpen }: Props) => {
  const [isPending, startTransition] = React.useTransition();
  const { addStudent: addStudentInStore, students } = useStudentStore(
    (state) => state
  );
  const router = useRouter();
  const form = useForm<AddStudentSchema>({
    defaultValues: {
      name: "",
      rollNo: 1,
      classId: _class?.id || "",
    },
    resolver: zodResolver(AddStudentSchema),
  });

  const onSubmit = (values: AddStudentSchema) => {
    startTransition(async () => {
      try {
        const newStudent = await addStudent(values);
        toast.success("Student added successfully");
        addStudentInStore(newStudent);
        form.reset();
        setOpen(false);
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("Failed to add student");
        }
      }
    });
  };

  return (
    <Form {...form}>
      <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
        <InputFormField
          control={form.control}
          name="name"
          label="Name"
          type="text"
        />
        <InputFormField
          control={form.control}
          name="rollNo"
          label="Roll No"
          type="number"
        />
        {classes &&
          (classes.length ? (
            <SelectFormField
              control={form.control}
              name="classId"
              label="Class"
              options={classes.map(({ id, name, section, subject }) => ({
                value: id,
                label: `${name} - ${section} - ${subject}`,
              }))}
            />
          ) : (
            <div className="space-y-2">
              <Label>Class</Label>
              <AddClassDialog />
            </div>
          ))}
        <Button type="submit" disabled={isPending}>
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default AddStudentForm;
