"use client";
import { useStudentStore } from "@/stores/student-store";
import { Prisma } from "@prisma/client";
import { useEffect } from "react";

type Props = { students: Prisma.StudentGetPayload<{}>[] };

const StudentInitializer = ({ students }: Props) => {
  const setStudents = useStudentStore((state) => state.setStudents);
  useEffect(() => {
    setStudents(students);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setStudents]);
  return null;
};

export default StudentInitializer;
