"use client";
import { useIsMobile } from "@/hooks/use-mobile";
import { Prisma } from "@prisma/client";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { Button } from "../ui/button";
import { FileTextIcon } from "lucide-react";
import { motion } from "motion/react";
import { calculateStudentScore } from "@/utils/utils";
import { useStudentStore } from "@/stores/student-store";
import { useResultStore } from "@/stores/result-store";

type Props = {
  evaluator: Prisma.EvaluatorGetPayload<{
    include: { class: true; evaluation: true };
  }>;
};

const ResultList = ({ evaluator }: Props) => {
  const isMobile = useIsMobile();
  const students = useStudentStore((state) => state.students);
  const { setActiveTab, setSelectedStudent } = useResultStore((state) => state);

  const handleGoToDetailedView = (studentId: string) => {
    setSelectedStudent(studentId);
    setActiveTab("detailed");
  };
  if (!evaluator?.evaluation?.results.length) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-center text-muted-foreground">
            Result will be displayed here.
          </p>
        </CardContent>
      </Card>
    );
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const MotionTableBody = motion(TableBody);
  const MotionTableRow = motion(TableRow);
  return (
    <>
      {isMobile ? (
        <motion.div
          className="space-y-4"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {evaluator.evaluation.results.map((result) => {
            const student = students.find((st) => st.id === result.studentId);
            if (!student) return null;
            const res = result?.result as any;
            const score = calculateStudentScore(res?.answers);

            return (
              <motion.div key={result.studentId} variants={item}>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold">{student.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Roll No.: {student.rollNo}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Score:
                          {score[0]}/{score[1]}
                        </p>{" "}
                      </div>
                      <div className="space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className=""
                          onClick={() => handleGoToDetailedView(student.id)}
                        >
                          <FileTextIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Roll No</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead className="text-right">
                    View Detailed Result
                  </TableHead>
                </TableRow>
              </TableHeader>
              <MotionTableBody
                variants={container}
                initial="hidden"
                animate="show"
              >
                {evaluator.evaluation.results.map((result) => {
                  const student = students.find(
                    (st) => st.id === result.studentId
                  );
                  if (!student) return null;
                  const res = result?.result as any;
                  const score = calculateStudentScore(res?.answers);
                  return (
                    <MotionTableRow
                      transition={{
                        type: "spring",
                        stiffness: 700,
                        damping: 30,
                      }}
                      key={student.id}
                    >
                      <TableCell>{student.rollNo}</TableCell>
                      <TableCell>{student.name}</TableCell>

                      <TableCell>
                        {score[0]}/{score[1]}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          onClick={() => handleGoToDetailedView(student.id)}
                          size="sm"
                          variant="outline"
                          className=""
                        >
                          <FileTextIcon className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </MotionTableRow>
                  );
                })}
              </MotionTableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default ResultList;
