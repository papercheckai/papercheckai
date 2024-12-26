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
import { AddClassSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import InputFormField from "@/components/form/InputFormField";
import { useState, useTransition } from "react";
import { addClass } from "@/actions/class";
import { toast } from "sonner";
import { fetchAndSetClasses } from "@/stores/class-store";

type Props = {
  btnVariant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null;
};
export default function AddClassDialog({ btnVariant = "outline" }: Props) {
  const [isOpen, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const form = useForm<AddClassSchema>({
    resolver: zodResolver(AddClassSchema),
    defaultValues: {
      name: "",
      section: "",
      subject: "",
    },
  });

  const onSubmit = (values: AddClassSchema) => {
    startTransition(async () => {
      try {
        const newClass = await addClass(values);
        toast.success("Class added successfully");
        form.reset();
        fetchAndSetClasses();
        setOpen(false);
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("Failed to add class");
        }
      }
    });
  };
  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={btnVariant} className="w-full">
          Add Class
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Add Class</DialogTitle>
              <DialogDescription>
                Add new Class to your account
              </DialogDescription>
            </DialogHeader>
            <InputFormField
              control={form.control}
              name="name"
              label="Name"
              placeholder="name"
            />
            <InputFormField
              control={form.control}
              name="section"
              label="Section"
              placeholder="section"
            />
            <InputFormField
              control={form.control}
              name="subject"
              label="Subject"
              placeholder="subject"
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
