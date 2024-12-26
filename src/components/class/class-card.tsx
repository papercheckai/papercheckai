"use client";
import { Card } from "@/components/ui/card";
import { Prisma } from "@prisma/client";
import EditClassDialog from "../modal/edit-class";
import { DeleteClassDialog } from "../modal/delete-class";
import { useRouter } from "next/navigation";

interface ClassCardProps {
  classInfo: Prisma.ClassGetPayload<{}>;
  active?: boolean;
  onSelect?: () => void;
}

export function ClassCard({
  classInfo,
  active = false,
  onSelect,
}: ClassCardProps) {
  const { id, name, section, subject } = classInfo;
  const router = useRouter();
  return (
    <Card className="w-full p-0 cursor-pointer hover:scale-[1.02] transform transition-all duration-300">
      <div className="space-x-2 flex items-center justify-between">
        <div
          className="p-2 flex-grow"
          role="button"
          onClick={() => {
            router.push("/dashboard/classes/" + id);
            onSelect?.();
          }}
        >
          <h1>
            {name} | {section} | {subject}
          </h1>
        </div>
        <div className="flex items-center gap-2 p-2">
          <EditClassDialog classInfo={classInfo} />
          <DeleteClassDialog classInfo={classInfo} />
        </div>
      </div>
    </Card>
  );
}
