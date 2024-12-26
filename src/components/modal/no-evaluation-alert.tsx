"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useEvaluationStore } from "@/stores/evaluation-store";
import Link from "next/link";

export default function EvaluationAlert() {
  const { isNoEvaluationAlertOpen, setNoEvaluationAlertOpen } =
    useEvaluationStore((state) => state);

  return (
    <AlertDialog
      open={isNoEvaluationAlertOpen}
      onOpenChange={setNoEvaluationAlertOpen}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>No Evaluations Left</AlertDialogTitle>
          <AlertDialogDescription>
            You have no evaluations left. Would you like to purchase more?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button asChild>
              <Link href={"/shop"}>Shop Now</Link>
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
