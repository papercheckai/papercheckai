import { getClasses } from "@/actions/class";
import { Prisma } from "@prisma/client";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type Class = Prisma.ClassGetPayload<{}>;
export type ClassState = {
  activeClass: null | Class;
  classes: Class[];
};

export type ClassActions = {
  setClasses: (classes: Class[]) => void;
  setActiveClass: (_class: Class) => void;
};

export type ClassStore = ClassState & ClassActions;

export const defaultInitState: ClassState = {
  activeClass: null,
  classes: [],
};

export const useClassStore = create<ClassStore>()(
  persist(
    (set) => ({
      ...defaultInitState,
      setClasses: (classes: Class[]) => set((state) => ({ classes })),
      setActiveClass: (_class: Class) =>
        set((state) => ({ activeClass: _class })),
    }),
    {
      name: "class-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ activeClass: state.activeClass }),
    }
  )
);

export const fetchAndSetClasses = async () => {
  const classes = await getClasses();
  useClassStore.getState().setClasses(classes);
};
