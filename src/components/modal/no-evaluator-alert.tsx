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
import { useEvaluatorStore } from "@/stores/evaluator-store";
import Link from "next/link";

export default function EvaluatorAlert() {
  const { isNoEvaluatorAlertOpen, setNoEvaluatorAlertOpen } = useEvaluatorStore(
    (state) => state
  );

  return (
    <AlertDialog
      open={isNoEvaluatorAlertOpen}
      onOpenChange={setNoEvaluatorAlertOpen}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>No Evaluator Left</AlertDialogTitle>
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
