import React from "react";
import { EditStudentSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "../ui/form";
import InputFormField from "./InputFormField";
import { Prisma } from "@prisma/client";
import { Button } from "../ui/button";
import { editStudent } from "@/actions/student";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { fetchAndSetStudents } from "@/stores/student-store";

type Props = {
  student: Prisma.StudentGetPayload<{}>;
  setOpen?: (value: boolean) => void;
};

const EditStudentForm = ({ student, setOpen }: Props) => {
  const [isPending, startTransition] = React.useTransition();
  const router = useRouter();
  const form = useForm<EditStudentSchema>({
    defaultValues: {
      name: student.name,
      rollNo: student.rollNo,
    },
    resolver: zodResolver(EditStudentSchema),
  });

  const onSubmit = (values: EditStudentSchema) => {
    startTransition(async () => {
      try {
        const newStudent = await editStudent(student.id, values);
        toast.success("Student edited successfully");
        form.reset();
        fetchAndSetStudents();
        setOpen?.(false);
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("Failed to edit student");
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
        <Button type="submit" disabled={isPending}>
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default EditStudentForm;
