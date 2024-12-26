"use client";
import { Button } from "@/components/ui/button";
import {
  ShoppingCart,
  FileText,
  CheckSquare,
  GraduationCap,
  CheckIcon,
  Redo2Icon,
  TrophyIcon,
} from "lucide-react";
import { motion } from "motion/react";
import ImagePreview from "@/components/layouts/image-preview";
import {
  fetchAndSetEvaluators,
  useEvaluatorStore,
} from "@/stores/evaluator-store";
import { useStudentStore } from "@/stores/student-store";
import MultiImageCaptureAndUpload from "@/components/evaluator/MultiImageCaptureAndUpload";
import ManageClassDialog from "@/components/modal/manage.class";
import { containerVariants, itemVariants } from "@/utils/motion-options";
import { evaluateStudentAnswerSheet } from "@/actions/evaluation";
import { toast } from "sonner";
import { useEvaluationStore } from "@/stores/evaluation-store";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { useLimitStore } from "@/stores/limit-store";
import NoEvaluatorSelected from "@/components/evaluator/no-evaluator-selected";
import AddStudentDialog from "@/components/modal/add-student";

export default function EvaluatorPage() {
  const activeEvaluator = useEvaluatorStore((state) => state.activeEvaluator);
  const { evaluating, setEvaluating, setNoEvaluationAlertOpen } =
    useEvaluationStore((state) => state);
  const students = useStudentStore((state) => state.students).filter(
    (student) => student.classId === activeEvaluator?.classId
  );
  const limit = useLimitStore((state) => state.limit);

  const handleEvaluation = async () => {
    if (limit?.evaluationLimit === 0) {
      return setNoEvaluationAlertOpen(true);
    }
    const studentAnswerSheets = activeEvaluator?.evaluation?.answerSheets;
    if (!studentAnswerSheets) return;
    try {
      for (const answerSheet of studentAnswerSheets) {
        // set evaluating state
        setEvaluating({
          student: students.find(
            (student) => student.id === answerSheet.studentId
          )!,
          total: studentAnswerSheets.length,
          current: studentAnswerSheets.indexOf(answerSheet) + 1,
        });
        // evaluate one student answer sheet
        await evaluateStudentAnswerSheet(
          activeEvaluator.id,
          answerSheet.studentId
        );
      }
      fetchAndSetEvaluators();
      return toast.success("All students answer sheets evaluated successfully");
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "evaluation limit exceeded") {
          return setNoEvaluationAlertOpen(true);
        }
        return toast.error(error.message);
      }
      return toast.error("Failed to evaluate student answer sheet");
    } finally {
      setEvaluating(null);
    }
  };

  if (!activeEvaluator) return <NoEvaluatorSelected />;
  return (
    <motion.div
      className="container mx-auto p-4 space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div
        className="space-y-1 flex justify-between items-start p-4 bg-secondary rounded-lg"
        variants={itemVariants}
      >
        <div>
          <h1 className="text-2xl font-semibold flex items-center gap-2 dark:text-white">
            <FileText className="h-6 w-6 text-blue-500 dark:text-blue-400" />
            {activeEvaluator.title}
          </h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground dark:text-gray-400">
            <GraduationCap className="h-4 w-4 text-green-500 dark:text-green-400" />
            <span>{activeEvaluator.class.subject}</span>
            <span>•</span>
            <span>{activeEvaluator.class.name}</span>
            <span>•</span>
            <span>{activeEvaluator.class.section}</span>
          </div>
        </div>
        {activeEvaluator.evaluation?.results.length && (
          <div>
            <Button variant="destructive" size="lg" asChild>
              <Link href={`/result/${activeEvaluator.id}`}>
                <TrophyIcon className="h-5 w-5" />
                Result
              </Link>
            </Button>
          </div>
        )}
      </motion.div>

      {/* Question Papers */}
      <motion.div className="space-y-2" variants={itemVariants}>
        <h2 className="flex items-center gap-2 font-medium dark:text-white">
          <FileText className="h-5 w-5 text-blue-500 dark:text-blue-400" />
          <span>Question Paper(s)</span>
        </h2>
        <ImagePreview images={activeEvaluator.questionPapers} />
      </motion.div>

      {/* Answer Key */}
      <motion.div className="space-y-2" variants={itemVariants}>
        <h2 className="flex items-center gap-2 font-medium">
          <CheckSquare className="h-5 w-5 text-green-500 dark:text-green-400" />
          <span>Answer Key / Criteria</span>
        </h2>
        <ImagePreview images={activeEvaluator.answerKeys} />
      </motion.div>

      {/* Students answersheet*/}
      <motion.div
        className="space-y-2"
        variants={itemVariants}
        hidden={!students.length}
      >
        <h2 className="flex items-center gap-2 font-medium">
          <FileText className="h-5 w-5" />
          <span>Student answer sheet</span>
        </h2>
        <div className="space-y-6">
          {students.map((student, index) => {
            const isEvaluated = activeEvaluator.evaluation?.results.some(
              (result) => result.studentId === student.id
            );
            return (
              <motion.div key={index} className="space-y-2">
                <h1 className="flex item-center">
                  <span>{student.rollNo}. </span>
                  <span>{student.name}</span>
                  {isEvaluated && (
                    <span className="text-green-500 dark:text-green-400 flex items-center gap-1 ml-4">
                      <CheckIcon className="h-4 w-4" /> Evaluated
                    </span>
                  )}
                </h1>
                <MultiImageCaptureAndUpload
                  evaluator={activeEvaluator}
                  student={student}
                />
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Footer */}
      <motion.div className="space-y-4 max-w-2xl" variants={itemVariants}>
        {!students.length ? (
          <div>
            <p className="text-muted-foreground text-lg mb-2">
              No students in this Evaluator Class, add student to evaluate
            </p>
            <AddStudentDialog
              _class={activeEvaluator.class}
              trigger={<Button className="w-full">Add Student </Button>}
            ></AddStudentDialog>
          </div>
        ) : evaluating ? (
          <div className="flex flex-col mb-5">
            <p className="mb-2">
              Evaluating Answer Sheets of {evaluating.student.name}... (Student{" "}
              {evaluating.current} of {evaluating.total})
            </p>
            <Progress value={(evaluating.current / evaluating.total) * 100} />
          </div>
        ) : activeEvaluator.evaluation?.results.length ? (
          <div className="grid grid-cols-2 gap-2">
            <Button className="w-full" variant={"destructive"} asChild>
              <Link href={`/result/${activeEvaluator.id}`}>
                <TrophyIcon />
                Result
              </Link>
            </Button>
            <Button
              variant={"secondary"}
              className="w-full"
              onClick={handleEvaluation}
            >
              <Redo2Icon />
              Re-Evaluate
            </Button>
          </div>
        ) : (
          <Button className="w-full" size="lg" onClick={handleEvaluation}>
            <GraduationCap className="mr-2 h-5 w-5" />
            Evaluate
          </Button>
        )}
      </motion.div>
    </motion.div>
  );
}
