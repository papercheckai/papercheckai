import { getEvaluatorById } from "@/actions/evaluator";
import Navbar from "@/components/layouts/navbar";
import ResultView from "@/components/result/result-view";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: Promise<{ evaluatorId: string }>;
};

const ResultPage = async (props: Props) => {
  const { evaluatorId } = await props.params;
  const evaluator = await getEvaluatorById(evaluatorId);
  if (!evaluator) {
    redirect("/dashboard/evaluators");
  }

  return (
    <main>
      <Navbar title="Results" />
      <ResultView evaluator={evaluator} />
    </main>
  );
};

export default ResultPage;
