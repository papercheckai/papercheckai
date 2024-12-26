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
import { addClass, editClass } from "@/actions/class";
import { toast } from "sonner";
import { Prisma } from "@prisma/client";
import { EditIcon } from "lucide-react";
import { fetchAndSetClasses } from "@/stores/class-store";

type Props = {
  classInfo: Prisma.ClassGetPayload<{}>;
};
export default function EditClassDialog({
  classInfo: { id, name, section, subject },
}: Props) {
  const [isOpen, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const form = useForm<AddClassSchema>({
    resolver: zodResolver(AddClassSchema),
    defaultValues: {
      name: name,
      section: section,
      subject: subject,
    },
  });

  //  make submit function using startTransition
  const onSubmit = (values: AddClassSchema) => {
    startTransition(async () => {
      try {
        const newClass = await editClass(id, values);
        toast.success("Class edited successfully");
        form.reset();
        fetchAndSetClasses();
        setOpen(false);
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("Failed to Edit class");
        }
      }
    });
  };
  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size={"sm"} className="w-fit">
          <EditIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Edit Class</DialogTitle>
              <DialogDescription>Edit Class to your account</DialogDescription>
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
              <Button type="submit" disabled={isPending}>
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
