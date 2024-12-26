"use server";
import { AddEvaluatorSchema } from "@/schema";
import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/db";
import { EvaluatorLimitExceededError } from "@/errors";

export const addEvaluator = async (data: AddEvaluatorSchema) => {
  const clerkUser = await currentUser();
  if (!clerkUser) throw new Error("Unauthorized");
  // find user in db
  const user = await prisma.user.findUniqueOrThrow({
    where: { clerkUserId: clerkUser.id },
    include: { limit: true },
  });
  if (!user) throw new Error("User not found");

  if (!user.limit) throw new Error("User limit not found");

  if (user.limit.evaluatorLimit < 1)
    throw new EvaluatorLimitExceededError("Evaluator limit exceeded");

  const evaluator = await prisma.evaluator.create({
    data: {
      title: data.title,
      questionPapers: data.questionPapers,
      answerKeys: data.answerKeys,
      classId: data.classId,
      userId: user.id,
    },
  });

  await prisma.limit.update({
    where: { userId: user.id },
    data: { evaluatorLimit: { decrement: 1 } },
  });

  return evaluator;
};

// edit evaluator

export const editEvaluator = async (id: string, data: AddEvaluatorSchema) => {
  const clerkUser = await currentUser();
  if (!clerkUser) throw new Error("Unauthorized");
  const user = await prisma.user.findUniqueOrThrow({
    where: { clerkUserId: clerkUser.id },
  });
  const evaluator = await prisma.evaluator.update({
    where: { id: id, userId: user.id },
    data: {
      title: data.title,
      questionPapers: data.questionPapers,
      answerKeys: data.answerKeys,
      classId: data.classId,
    },
  });
  return evaluator;
};

export const getEvaluators = async () => {
  const clerkUser = await currentUser();
  if (!clerkUser) throw new Error("Unauthorized");
  const user = await prisma.user.findUniqueOrThrow({
    where: { clerkUserId: clerkUser.id },
  });
  const evaluators = await prisma.evaluator.findMany({
    where: { userId: user.id },
    include: {
      class: true,
      evaluation: true,
    },
  });
  return evaluators;
};

export const deleteEvaluator = async (id: string) => {
  const clerkUser = await currentUser();
  if (!clerkUser) throw new Error("Unauthorized");
  const user = await prisma.user.findUniqueOrThrow({
    where: { clerkUserId: clerkUser.id },
  });
  const evaluator = await prisma.evaluator.delete({
    where: { id: id, userId: user.id },
  });
  if (evaluator)
    await prisma.limit.update({
      where: { userId: user.id },
      data: { evaluatorLimit: { increment: 1 } },
    });
  return evaluator;
};

export const getEvaluatorById = async (id: string) => {
  const clerkUser = await currentUser();
  if (!clerkUser) throw new Error("Unauthorized");
  const user = await prisma.user.findUniqueOrThrow({
    where: { clerkUserId: clerkUser.id },
  });
  const evaluator = await prisma.evaluator.findUnique({
    where: { id, userId: user.id },
    include: {
      class: true,
      evaluation: true,
    },
  });
  return evaluator;
};
