import { Prisma } from "@prisma/client";
import { create } from "zustand";

type Result = Prisma.ResultGetPayload<{}>;

export type ResultState = {
  activeTab: "marksheets" | "detailed";
  selectedStudent: string | null;
};

export type ResultActions = {
  setSelectedStudent: (studentId: string | null) => void;
  setActiveTab: (tab: "marksheets" | "detailed") => void;
};

export const defaultInitState: ResultState = {
  selectedStudent: null,
  activeTab: "marksheets",
};

export const useResultStore = create<ResultState & ResultActions>(
  (set, get) => ({
    ...defaultInitState,
    setSelectedStudent: (studentId) => set({ selectedStudent: studentId }),
    setActiveTab: (tab) => set({ activeTab: tab }),
  })
);
