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
import { PencilIcon, Trash2Icon } from "lucide-react";
import EditStudentDialog from "../modal/edit-student";
import { motion } from "motion/react";
import { DeleteStudentDialog } from "../modal/delete-student";

type Props = {
  students: Prisma.StudentGetPayload<{}>[];
};

const StudentList = ({ students }: Props) => {
  const isMobile = useIsMobile();

  if (!students.length) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-center text-muted-foreground">
            Student list will be displayed here.
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
          {students.map((student) => (
            <motion.div key={student.id} variants={item}>
              <Card>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold">{student.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Roll No: {student.rollNo}
                      </p>
                    </div>
                    <div className="space-x-2">
                      <EditStudentDialog student={student} />
                      <Button
                        size="sm"
                        variant="outline"
                        //   onClick={() => handleDelete(student.id)}
                      >
                        <Trash2Icon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>RollNo.</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <MotionTableBody
                variants={container}
                initial="hidden"
                animate="show"
              >
                {students.map((student) => (
                  <MotionTableRow
                    transition={{ type: "spring", stiffness: 700, damping: 30 }}
                    key={student.id}
                  >
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.rollNo}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <EditStudentDialog student={student} />
                      <DeleteStudentDialog student={student} />
                    </TableCell>
                  </MotionTableRow>
                ))}
              </MotionTableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default StudentList;
