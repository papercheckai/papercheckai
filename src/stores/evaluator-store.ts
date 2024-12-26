import { Prisma } from "@prisma/client";
import { create } from "zustand";
import { getEvaluators } from "@/actions/evaluator";

export type Evaluator = Prisma.EvaluatorGetPayload<{
  include: { class: true; evaluation: true };
}>;

export type EvaluatorState = {
  evaluators: Evaluator[];
  activeEvaluator: null | Evaluator;
  isNoEvaluatorAlertOpen: boolean;
};

export type EvaluatorActions = {
  setEvaluators: (evaluators: Evaluator[]) => void;
  setNoEvaluatorAlertOpen: (open: boolean) => void;

  setActiveEvaluator: (
    evaluator: Prisma.EvaluatorGetPayload<{
      include: { class: true; evaluation: true };
    }>
  ) => void;
};

export const defaultInitState: EvaluatorState = {
  activeEvaluator: null,
  evaluators: [],
  isNoEvaluatorAlertOpen: false,
};

export const useEvaluatorStore = create<EvaluatorState & EvaluatorActions>(
  (set) => ({
    ...defaultInitState,
    setActiveEvaluator: (Evaluator) => set({ activeEvaluator: Evaluator }),
    setEvaluators: (evaluators) => set({ evaluators }),
    setNoEvaluatorAlertOpen: (open) => set({ isNoEvaluatorAlertOpen: open }),
  })
);
export const fetchAndSetEvaluators = async () => {
  const evaluators = await getEvaluators();
  useEvaluatorStore.getState().setEvaluators(evaluators);
  const activeEvaluator = useEvaluatorStore.getState().activeEvaluator;
  if (activeEvaluator) {
    const newActiveEvaluator = evaluators.find(
      (evaluator) => evaluator.id === activeEvaluator.id
    );
    if (newActiveEvaluator) {
      useEvaluatorStore.getState().setActiveEvaluator(newActiveEvaluator);
    }
  }
};
