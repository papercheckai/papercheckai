import { Prisma, Student } from "@prisma/client";
import { create } from "zustand";

export type Evaluation = Prisma.EvaluationGetPayload<{}>;

export type EvaluationState = {
  evaluating: null | { student: Student; total: number; current: number };
  isNoEvaluationAlertOpen: boolean;
};

export type EvaluationActions = {
  setNoEvaluationAlertOpen: (open: boolean) => void;
  setEvaluating: (
    info: {
      student: Student;
      total: number;
      current: number;
    } | null
  ) => void;
};

export const defaultInitState: EvaluationState = {
  evaluating: null,
  isNoEvaluationAlertOpen: false,
};

export const useEvaluationStore = create<EvaluationState & EvaluationActions>(
  (set) => ({
    ...defaultInitState,
    setEvaluating: (evaluating) => set({ evaluating }),
    setNoEvaluationAlertOpen: (open) => set({ isNoEvaluationAlertOpen: open }),
  })
);
