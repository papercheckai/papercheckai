"use client";
import { useForm } from "react-hook-form";
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
import { zodResolver } from "@hookform/resolvers/zod";
import InputFormField from "@/components/form/InputFormField";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Prisma } from "@prisma/client";
import SelectFormField from "../form/SelectFormField";
import AddClassDialog from "./add-class";
import FormFileUploader from "../form/UploaderFormField";
import { addEvaluator, editEvaluator } from "@/actions/evaluator";
import { fetchAndSetEvaluators } from "@/stores/evaluator-store";

type Props = {
  classes: Prisma.ClassGetPayload<{}>[];
  evaluator: Prisma.EvaluatorGetPayload<{}>;
};
export default function EditEvaluator({ classes, evaluator }: Props) {
  const [isOpen, setOpen] = useState(false);

  const [isPending, startTransition] = useTransition();
  const form = useForm<AddEvaluatorSchema>({
    resolver: zodResolver(AddEvaluatorSchema),
    defaultValues: {
      title: evaluator.title,
      questionPapers: evaluator.questionPapers,
      answerKeys: evaluator.answerKeys,
      classId: evaluator.classId,
    },
  });

  //  make submit function using startTransition
  const onSubmit = (values: AddEvaluatorSchema) => {
    startTransition(async () => {
      try {
        const newEvaluator = await editEvaluator(evaluator.id, values);
        toast.success("Evaluator saved successfully");
        form.reset();
        setOpen(false);
        fetchAndSetEvaluators();
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("Failed to save Evaluator");
        }
      }
    });
  };
  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          Edit Evaluator
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Edit Evaluator</DialogTitle>
              <DialogDescription>
                Edit Evaluator to your account
              </DialogDescription>
            </DialogHeader>
            <InputFormField
              control={form.control}
              name="title"
              label="Title"
              placeholder="Title"
            />
            {classes.length ? (
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
              <AddClassDialog />
            )}
            <FormFileUploader
              control={form.control}
              name="questionPapers"
              label="Question Papers"
            />
            <FormFileUploader
              control={form.control}
              name="answerKeys"
              label="Answer Keys"
            />
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
