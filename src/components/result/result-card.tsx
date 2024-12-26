"use client";

import { motion } from "motion/react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  FileQuestionIcon,
  PencilIcon,
  PencilLineIcon,
  TrophyIcon,
} from "lucide-react";

interface ResultCardProps {
  questionNumber: number;
  question: string;
  answer: string;
  score: number;
  maxScore: number;
  remarks: string;
  aiConfidence: number;
}

export function ResultCard({
  questionNumber,
  question,
  answer,
  score,
  maxScore,
  remarks,
  aiConfidence,
}: ResultCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full mb-6">
        <CardHeader className="space-y-4 w-fit">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 rounded-full bg-secondary px-2.5 py-0.5 text-sm font-semibold"
          >
            <FileQuestionIcon className="w-4 h-4" /> Question {questionNumber}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl font-semibold"
          >
            {question}
          </motion.h2>
        </CardHeader>
        <CardContent className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-2"
          >
            <div className="flex items-center gap-2">
              <PencilLineIcon className="w-4 h-4" />
              <span className="font-medium">Answer</span>
            </div>
            <p className="">{answer}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-2"
          >
            <div className="flex items-center gap-2">
              <TrophyIcon className="w-4 h-4" />
              <span className="font-medium">Score</span>
            </div>
            <div className="flex items-baseline gap-1">
              <input
                type="text"
                value={score}
                disabled
                className="w-12 rounded-md border px-2 py-1 text-center"
              />
              <span className="">/ {maxScore}</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-2"
          >
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className=""
              >
                <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z" />
                <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
              </svg>
              <span className="font-medium ">Remarks</span>
            </div>
            <p className="">{remarks}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="space-y-2"
          >
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className=""
              >
                <path d="M12 2v20" />
                <path d="M2 12h20" />
                <path d="m12 2 4 4" />
                <path d="m12 2-4 4" />
                <path d="m12 22-4-4" />
                <path d="m12 22 4-4" />
                <path d="m2 12 4 4" />
                <path d="m2 12 4-4" />
                <path d="m22 12-4 4" />
                <path d="m22 12-4-4" />
              </svg>
              <span className="font-medium ">AI Confidence</span>
            </div>
            <div className="space-y-1.5">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                <Progress
                  value={aiConfidence}
                  className="h-2 w-full bg-gray-100"
                />
              </motion.div>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-sm text-orange-500 font-medium"
              >
                {aiConfidence < 33
                  ? "Low"
                  : aiConfidence < 66
                  ? "Medium"
                  : "High"}
              </motion.span>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
