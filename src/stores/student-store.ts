import { getStudents } from "@/actions/student";
import { Prisma } from "@prisma/client";
import { create } from "zustand";

type Student = Prisma.StudentGetPayload<{}>;

export type StudentState = {
  students: Student[];
};

export type StudentActions = {
  setStudents: (students: Student[]) => void;
  addStudent: (student: Student) => void;
  deleteStudent: (studentId: string) => void;
};

export const defaultInitState: StudentState = {
  students: [],
};

export const useStudentStore = create<StudentState & StudentActions>(
  (set, get) => ({
    ...defaultInitState,
    setStudents: (students) => set({ students }),
    deleteStudent: (studentId) =>
      set((state) => ({
        students: state.students.filter((s) => s.id !== studentId),
      })),
    addStudent: (student) =>
      set((state) => ({ students: [...state.students, student] })),
  })
);

export const fetchAndSetStudents = async () => {
  const students = await getStudents();
  useStudentStore.getState().setStudents(students);
};
