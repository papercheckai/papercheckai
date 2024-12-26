"use client";
import React, { useState } from "react";
import { Result } from "@/types/evaluation-result";
import { Prisma } from "@prisma/client";
import { ResultCard } from "./result-card";
import { ScrollArea } from "../ui/scroll-area";
import { TrophyIcon, UserIcon } from "lucide-react";
import { calculateStudentScore } from "@/utils/utils";
import SheetView from "./sheet-view";
import SelectStudent from "./selectStudent";
import { useResultStore } from "@/stores/result-store";

type Props = {
  evaluator: Prisma.EvaluatorGetPayload<{
    include: { class: true; evaluation: true };
  }>;
};

const DetailedResultView = ({ evaluator }: Props) => {
  const results = evaluator.evaluation?.results;
  const defaultStudentId = results ? results[0].studentId : null;
  const selectedStudent =
    useResultStore((state) => state.selectedStudent) || defaultStudentId;
  const setSelectedStudent = useResultStore(
    (state) => state.setSelectedStudent
  );

  const result = results?.find(
    (result) => result.studentId === selectedStudent
  ) as Result | undefined;

  const score = calculateStudentScore(result?.result?.answers);
  return (
    <>
      <div className="flex items-center gap-4 mb-4">
        <h1 className="flex items-center gap-2">
          <UserIcon className="w-4 h-4" /> Student
        </h1>
        <SelectStudent
          selectedStudent={selectedStudent || undefined}
          results={(results as any as Result[]) || []}
          setSelectedStudent={setSelectedStudent}
        />
      </div>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        <ScrollArea className="h-[calc(100vh-160px)] w-full rounded-md border p-4">
          <header className="flex flex-col justify-center items-center gap-2 z-10 shrink-0 bg-secondary p-4 mb-2">
            <div>
              <TrophyIcon />
            </div>
            <h2>Total Marks Scored</h2>
            <h3>
              {score[0]} / {score[1]}
            </h3>
          </header>
          {result?.result.answers.map((answer) => (
            <ResultCard
              key={answer.question_no}
              questionNumber={answer.question_no}
              aiConfidence={answer.confidence * 100}
              answer={answer.answer}
              question={answer.question}
              remarks={answer.remarks}
              score={answer.score[0]}
              maxScore={answer.score[1]}
            />
          ))}
        </ScrollArea>
        <div className="h-[calc(100vh-160px)] w-full rounded-md border p-4">
          <SheetView evaluator={evaluator} studentId={selectedStudent!} />
        </div>
      </div>
    </>
  );
};

export default DetailedResultView;
