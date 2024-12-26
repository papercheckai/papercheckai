"use client";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Prisma } from "@prisma/client";
import { toast } from "sonner";
import DeleteAlert from "../layouts/delete-alert";
import { deleteStudent } from "@/actions/student";
import { fetchAndSetStudents } from "@/stores/student-store";

export function DeleteStudentDialog({
  student,
}: {
  student: Prisma.StudentGetPayload<{}>;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const onDelete = () => {
    startTransition(async () => {
      try {
        await deleteStudent(student.id);
        toast.success("Student deleted successfully");
        fetchAndSetStudents();
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("Failed to delete class");
        }
      }
    });
  };
  return (
    <DeleteAlert
      loading={isPending}
      info={student.name + " student"}
      onDelete={onDelete}
      triggerOptions={{ iconOnly: true, size: "sm" }}
    />
  );
}
