"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "../ui/label";
import { Prisma } from "@prisma/client";
import AddClassDialog from "../modal/add-class";
import { Control, FieldValues, Path, useController } from "react-hook-form";

interface Props<T extends FieldValues> {
  classes: Prisma.ClassGetPayload<{}>[];
  control: Control<T>;
  name: Path<T>;
}

export function SelectClass<T extends FieldValues>({
  classes,
  control,
  name,
}: Props<T>) {
  const [triggerWidth, setTriggerWidth] = React.useState<number | null>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  // Use react-hook-form's useController to control the field
  const {
    field: { value, onChange },
  } = useController({ control, name });

  // Update trigger width dynamically on mount and resize
  React.useEffect(() => {
    const updateWidth = () => {
      if (triggerRef.current) {
        setTriggerWidth(triggerRef.current.offsetWidth);
      }
    };
    updateWidth(); // Initial run
    window.addEventListener("resize", updateWidth);

    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  function getClassLabel() {
    if (value) {
      const selectedClass = classes.find((c) => c.id === value);
      if (selectedClass) {
        return [
          selectedClass.name,
          selectedClass.section,
          selectedClass.subject,
        ].join(" - ");
      }
    }
    return "Select Class";
  }
  return (
    <DropdownMenu>
      <Label>Class</Label>
      <DropdownMenuTrigger ref={triggerRef} asChild>
        <Button variant="outline" className="w-full">
          {getClassLabel()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent style={{ width: triggerWidth ?? "auto" }}>
        <DropdownMenuRadioGroup value={value} onValueChange={onChange}>
          {classes.map((c) => (
            <DropdownMenuRadioItem key={c.id} value={c.id}>
              {[c.name, c.section, c.subject].join(" - ")}
            </DropdownMenuRadioItem>
          ))}
          <DropdownMenuSeparator />
          <AddClassDialog btnVariant="default" />
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
