"use client";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Prisma } from "@prisma/client";
import { toast } from "sonner";
import { deleteClass } from "@/actions/class";
import DeleteAlert from "../layouts/delete-alert";
import { fetchAndSetClasses } from "@/stores/class-store";

export function DeleteClassDialog({
  classInfo,
}: {
  classInfo: Prisma.ClassGetPayload<{}>;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const onDelete = () => {
    startTransition(async () => {
      try {
        await deleteClass(classInfo.id);
        toast.success("Class deleted successfully");
        fetchAndSetClasses();
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
      info={classInfo.name + " class with all students of the class"}
      onDelete={onDelete}
      triggerOptions={{ iconOnly: true, size: "sm" }}
    />
  );
}
