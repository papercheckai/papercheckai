"use client";
import React from "react";
import { motion } from "motion/react";
import { containerVariants, itemVariants } from "@/utils/motion-options";
import { FileTextIcon, GraduationCapIcon } from "lucide-react";
import { Prisma } from "@prisma/client";
import ResultList from "./result-list";
type Props = {
  evaluator: Prisma.EvaluatorGetPayload<{
    include: { class: true; evaluation: true };
  }>;
};

const MarkSheetView = ({ evaluator }: Props) => {
  return (
    <motion.div
      className="container mx-auto p-4 space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="space-y-1 flex justify-between items-start p-4 bg-secondary rounded-lg"
        variants={itemVariants}
      >
        <div>
          <h1 className="text-2xl font-semibold flex items-center gap-2 dark:text-white">
            <FileTextIcon className="h-6 w-6 text-blue-500 dark:text-blue-400" />
            {evaluator.title}
          </h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground dark:text-gray-400">
            <GraduationCapIcon className="h-4 w-4 text-green-500 dark:text-green-400" />
            <span>{evaluator.class.subject}</span>
            <span>•</span>
            <span>{evaluator.class.name}</span>
            <span>•</span>
            <span>{evaluator.class.section}</span>
          </div>
        </div>
      </motion.div>
      <div>
        <ResultList evaluator={evaluator} />
      </div>
    </motion.div>
  );
};

export default MarkSheetView;
