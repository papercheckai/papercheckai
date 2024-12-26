"use client";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Prisma } from "@prisma/client";
import { toast } from "sonner";
import DeleteAlert from "../layouts/delete-alert";
import { deleteEvaluator } from "@/actions/evaluator";

export function DeleteEvaluatorDialog({
  evaluator,
}: {
  evaluator: Prisma.EvaluatorGetPayload<{}>;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const onDelete = () => {
    startTransition(async () => {
      try {
        await deleteEvaluator(evaluator.id);
        toast.success("Class deleted successfully");
        router.refresh();
        if (typeof window !== "undefined") {
          window.location.reload();
        }
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
      info={evaluator.title + " evaluator"}
      onDelete={onDelete}
    />
  );
}
