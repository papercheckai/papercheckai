"use client";
import React, { act, useEffect } from "react";
import { PrinterIcon } from "lucide-react";

import StudentList from "@/components/layouts/student-list";
import AddStudentDialog from "@/components/modal/add-student";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useClassStore } from "@/stores/class-store";
import { useStudentStore } from "@/stores/student-store";

type Props = { classId: string };

const ClassInformation = ({ classId }: Props) => {
  const _class = useClassStore((state) =>
    state.classes.find((cls) => cls.id === classId)
  );

  const classStudents = useStudentStore((state) => state.students).filter(
    (student) => student.classId === _class?.id
  );

  if (!_class) {
    return <div>no class</div>;
  }

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };
  return (
    <div className="container mx-auto p-4">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Class Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <h3 className="font-semibold text-sm text-muted-foreground">
                Subject
              </h3>
              <p className="text-lg">{_class.subject}</p>
            </div>
            <div>
              <h3 className="font-semibold text-sm text-muted-foreground">
                Class
              </h3>
              <p className="text-lg">{_class.name}</p>
            </div>
            <div>
              <h3 className="font-semibold text-sm text-muted-foreground">
                Section
              </h3>
              <p className="text-lg">{_class.section}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between mb-6">
        <Button onClick={handlePrint}>
          <PrinterIcon className="mr-2 h-4 w-4" />
          Print
        </Button>
        <AddStudentDialog _class={_class} />
      </div>

      {/* Placeholder for student list or other content */}
      <StudentList students={classStudents} />
    </div>
  );
};

export default ClassInformation;
