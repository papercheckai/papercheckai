"use client";
import { useClassStore } from "@/stores/class-store";
import { Prisma } from "@prisma/client";
import { useEffect } from "react";

export default function ClassInitializer({
  classes,
}: {
  classes: Prisma.ClassGetPayload<{}>[];
}) {
  const setClasses = useClassStore((state) => state.setClasses);

  useEffect(() => {
    setClasses(classes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setClasses]);

  return null;
}
