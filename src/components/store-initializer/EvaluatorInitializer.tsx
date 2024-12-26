"use client";
import { useEvaluatorStore } from "@/stores/evaluator-store";
import { Prisma } from "@prisma/client";
import { useEffect } from "react";

type Props = {
  evaluators: Prisma.EvaluatorGetPayload<{
    include: { class: true; evaluation: true };
  }>[];
};

const EvaluatorInitializer = ({ evaluators }: Props) => {
  const setEvaluators = useEvaluatorStore((state) => state.setEvaluators);
  useEffect(() => {
    console.dir(evaluators, { depth: null });
    setEvaluators(evaluators);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setEvaluators]);
  return null;
};

export default EvaluatorInitializer;
