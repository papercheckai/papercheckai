import { getLimit } from "@/actions/limit";
import { Prisma } from "@prisma/client";
import { create } from "zustand";

type Limit = Prisma.LimitGetPayload<{}>;
export type LimitState = {
  limit: Limit | null;
};

export type LimitActions = {
  setLimit: (limit: Limit) => void;
  incrementEvaluatorLimit: () => void;
  decrementEvaluatorLimit: () => void;
  incrementEvaluationLimit: () => void;
  decrementEvaluationLimit: () => void;
};

export type LimitStore = LimitState & LimitActions;

export const defaultInitState: LimitState = {
  limit: null,
};

export const useLimitStore = create<LimitStore>((set) => ({
  ...defaultInitState,

  /**
   * Sets the limit to the given value.
   * @param limit The new value of the limit.
   */
  setLimit: (limit: Limit) => set({ limit }),
  /**
   * Increments the evaluator limit by 1.
   * If the limit does not exist (i.e. `state.limit` is `null`), this is a no-op.
   * @returns The updated state.
   */
  incrementEvaluatorLimit: () =>
    set((state) => {
      if (state.limit) {
        return {
          limit: {
            ...state.limit,
            evaluatorLimit: state.limit.evaluatorLimit + 1,
          },
        };
      }
      return state;
    }),

  /**
   * Decrements the evaluator limit by 1.
   * If the limit does not exist (i.e. `state.limit` is `null`), this is a no-op.
   * @returns The updated state.
   */
  decrementEvaluatorLimit: () => {
    set((state) => {
      if (state.limit) {
        return {
          limit: {
            ...state.limit,
            evaluatorLimit: state.limit.evaluatorLimit - 1,
          },
        };
      }
      return state;
    });
  },
  /**
   * Increments the evaluation limit by 1.
   * If the limit does not exist (i.e. `state.limit` is `null`), this is a no-op.
   * @returns The updated state.
   */
  incrementEvaluationLimit: () => {
    set((state) => {
      if (state.limit) {
        return {
          limit: {
            ...state.limit,
            evaluationLimit: state.limit.evaluationLimit + 1,
          },
        };
      }
      return state;
    });
  },
  /**
   * Decrements the evaluation limit by 1.
   * If the limit does not exist (i.e. `state.limit` is `null`), this is a no-op.
   * @returns The updated state.
   */
  decrementEvaluationLimit: () => {
    set((state) => {
      if (state.limit) {
        return {
          limit: {
            ...state.limit,
            evaluationLimit: state.limit.evaluationLimit - 1,
          },
        };
      }
      return state;
    });
  },
}));

export const fetchAdnSetLimit = async () => {
  const limit = await getLimit();
  useLimitStore.getState().setLimit(limit);
};
