"use server";
import { currentUser } from "@clerk/nextjs/server";
import { Evaluation } from "@prisma/client";
import { z } from "zod";

class UnauthorizedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UnauthorizedError";
  }
}

export const uploadStudentAnswerSheets = async (
  evaluatorId: string,
  studentId: string,
  answerSheetUrl: string[]
) => {
  const clerkUser = await currentUser();
  if (!clerkUser) throw new UnauthorizedError("Unauthorized");

  const user = await prisma.user.findUnique({
    where: { clerkUserId: clerkUser.id },
  });

  if (!user) throw new Error("User not found");

  const schema = z.object({
    evaluatorId: z.string().min(1, { message: "Evaluator is required" }),
    studentId: z.string().min(1, { message: "Student is required" }),
    answerSheetUrl: z.array(z.string().url()),
  });

  const data = schema.parse({ evaluatorId, studentId, answerSheetUrl });

  try {
    const evaluator = await prisma.evaluator.findUnique({
      where: { id: data.evaluatorId, userId: user.id },
    });
    if (!evaluator) throw new Error("Evaluator not found");

    const existingStudentAnswerSheet = await prisma.evaluation.findFirst({
      where: {
        evaluatorId: data.evaluatorId,
        answerSheets: {
          some: { studentId: data.studentId },
        },
      },
    });

    let evaluation: Evaluation;
    if (existingStudentAnswerSheet) {
      evaluation = await prisma.evaluation.update({
        where: { evaluatorId: data.evaluatorId },
        data: {
          answerSheets: {
            updateMany: {
              where: { studentId: data.studentId },
              data: { answerSheet: data.answerSheetUrl },
            },
          },
        },
      });
    } else {
      evaluation = await prisma.evaluation.upsert({
        where: { evaluatorId: data.evaluatorId },
        update: {
          answerSheets: {
            push: {
              studentId: data.studentId,
              answerSheet: data.answerSheetUrl,
            },
          },
        },
        create: {
          evaluatorId,
          answerSheets: {
            set: {
              studentId: data.studentId,
              answerSheet: data.answerSheetUrl,
            },
          },
        },
      });
    }
    return evaluation;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
