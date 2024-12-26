"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { AddEvaluatorSchema } from "@/schema";
import InputFormField from "@/components/form/InputFormField";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import FormFileUploader from "../form/UploaderFormField";
import { addEvaluator } from "@/actions/evaluator";
import { SelectClass } from "../class/class-select";
import { useLimitStore } from "@/stores/limit-store";
import { useEvaluatorStore } from "@/stores/evaluator-store";
import { useClassStore } from "@/stores/class-store";

type Props = {};
export default function AddEvaluatorDialog({}: Props) {
  const [isOpen, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const limit = useLimitStore((state) => state.limit);
  const classes = useClassStore((state) => state.classes);
  const setNoEvaluatorAlertOpen = useEvaluatorStore(
    (state) => state.setNoEvaluatorAlertOpen
  );
  const form = useForm<AddEvaluatorSchema>({
    resolver: zodResolver(AddEvaluatorSchema),
    defaultValues: {
      title: "",
      questionPapers: [],
      answerKeys: [],
      classId: "",
    },
  });

  //  make submit function using startTransition
  const onSubmit = (values: AddEvaluatorSchema) => {
    if (limit && limit?.evaluatorLimit <= 0) {
      return setNoEvaluatorAlertOpen(true);
    }
    startTransition(async () => {
      try {
        const newEvaluator = await addEvaluator(values);
        toast.success("Evaluator added successfully");
        form.reset();
        if (typeof window !== "undefined") {
          window.location.reload();
        }
      } catch (error) {
        if (error instanceof Error) {
          if (error.message === "Evaluator limit exceeded") {
            setNoEvaluatorAlertOpen(true);
          }
          toast.error(error.message);
        } else {
          toast.error("Failed to add Evaluator");
        }
      }
    });
  };
  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          Add Evaluator
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Add Evaluator</DialogTitle>
              <DialogDescription>
                Add new Evaluator to your account
              </DialogDescription>
            </DialogHeader>
            <InputFormField
              control={form.control}
              name="title"
              label="Title"
              placeholder="Title"
            />
            <SelectClass
              classes={classes}
              control={form.control}
              name="classId"
            />

            {
              <FormFileUploader
                control={form.control}
                name="questionPapers"
                label="Question Papers"
              />
            }
            <FormFileUploader
              control={form.control}
              name="answerKeys"
              label="Answer Keys"
            />
            <DialogFooter>
              <Button disabled={isPending} type="submit">
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
