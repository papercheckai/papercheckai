"use server";
import { EvaluationLimitExceededError } from "@/errors";
import prisma from "@/lib/db";
import { aiPrompt } from "@/utils/aiprompt";
import { aiModel, maxTokens } from "@/utils/utils";
import { currentUser } from "@clerk/nextjs/server";
import OpenAI from "openai";
import {
  ChatCompletionContentPart,
  ChatCompletionMessageParam,
} from "openai/resources/index.mjs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const evaluateStudentAnswerSheet = async (
  evaluatorId: string,
  studentId: string
) => {
  try {
    const clerkUser = await currentUser();
    if (!clerkUser) throw new Error("Unauthorized");

    const user = await getUser(clerkUser.id);
    const evaluator = await getEvaluator(evaluatorId, user.id);
    const limit = await checkLimit(user.id);
    const student = await getStudent(studentId, evaluator.classId);
    const studentAnswerSheet = getStudentAnswerSheet(evaluator, studentId);

    const messages = createMessages(evaluator, student, studentAnswerSheet);

    const respData = await getEvaluationResponse(messages);

    await saveEvaluationResult(evaluatorId, studentId, respData);

    await decrementEvaluationLimit(user.id);

    return respData;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getUser = async (clerkUserId: string) => {
  const user = await prisma.user.findUnique({
    where: { clerkUserId },
  });
  if (!user) throw new Error("User not found");
  return user;
};

const getEvaluator = async (evaluatorId: string, userId: string) => {
  const evaluator = await prisma.evaluator.findUnique({
    where: { id: evaluatorId, userId },
    include: { evaluation: true, class: true },
  });
  if (!evaluator) throw new Error("Evaluator not found");
  return evaluator;
};

const checkLimit = async (userId: string) => {
  const limit = await prisma.limit.findUnique({ where: { userId } });
  if (!limit) throw new Error("Limit not found");
  if (limit.evaluationLimit < 1)
    throw new EvaluationLimitExceededError("evaluation limit exceeded");
  return limit;
};

const getStudent = async (studentId: string, classId: string) => {
  const student = await prisma.student.findUnique({
    where: { id: studentId, classId },
  });
  if (!student) throw new Error("Student Not Found");
  return student;
};

const getStudentAnswerSheet = (
  evaluator: Awaited<ReturnType<typeof getEvaluator>>,
  studentId: string
) => {
  const studentAnswerSheet = evaluator.evaluation?.answerSheets.find(
    (sheet) => sheet.studentId === studentId
  );
  if (!studentAnswerSheet) throw new Error("Student Answer sheet not found");
  return studentAnswerSheet;
};

const createMessages = (
  evaluator: any,
  student: any,
  studentAnswerSheet: any
): ChatCompletionMessageParam[] => {
  const questionPapersPrompt: ChatCompletionContentPart[] = [];
  const answerKeysPrompt: ChatCompletionContentPart[] = [];
  const answerSheetsPrompt: ChatCompletionContentPart[] = [];

  questionPapersPrompt.push({ type: "text", text: "Question Paper(s):" });
  for (const questionPaper of evaluator.questionPapers) {
    questionPapersPrompt.push({
      type: "image_url",
      image_url: { url: questionPaper },
    });
  }

  answerKeysPrompt.push({ type: "text", text: "Answer Key(s):" });
  for (const answerKey of evaluator.answerKeys) {
    answerKeysPrompt.push({
      type: "image_url",
      image_url: { url: answerKey },
    });
  }

  answerSheetsPrompt.push({ type: "text", text: "Answer Sheet(s):" });
  for (const answerSheet of studentAnswerSheet.answerSheet) {
    answerSheetsPrompt.push({
      type: "image_url",
      image_url: { url: answerSheet },
    });
  }

  return [
    { role: "system", content: aiPrompt },
    { role: "user", content: questionPapersPrompt },
    { role: "user", content: answerKeysPrompt },
    { role: "user", content: "student_name: " + student.name },
    { role: "user", content: "roll_no: " + student.rollNo },
    {
      role: "user",
      content: "class: " + evaluator.class.name + " " + evaluator.class.section,
    },
    { role: "user", content: "subject: " + evaluator.class.subject },
    { role: "user", content: answerSheetsPrompt },
  ];
};

const getEvaluationResponse = async (
  messages: ChatCompletionMessageParam[]
) => {
  const completion = await openai.chat.completions.create({
    model: aiModel,
    messages: messages,
    max_tokens: maxTokens,
  });

  const resp = completion.choices[0].message.content?.replace(
    /```json\n|\n```/g,
    ""
  );

  if (!resp) throw new Error("Evaluation failed");

  let respData;
  try {
    respData = JSON.parse(resp);
  } catch (parseError) {
    throw new Error("Failed to parse evaluation response");
  }

  return respData;
};

const saveEvaluationResult = async (
  evaluatorId: string,
  studentId: string,
  respData: any
) => {
  const existingStudentResult = await prisma.evaluation.findFirst({
    where: { evaluatorId, results: { some: { studentId } } },
  });
  if (existingStudentResult) {
    await prisma.evaluation.update({
      where: { evaluatorId },
      data: {
        results: {
          updateMany: { where: { studentId }, data: { result: respData } },
        },
      },
    });
  } else {
    await prisma.evaluation.update({
      where: { evaluatorId },
      data: {
        results: { push: { studentId, result: respData } },
      },
    });
  }
};

const decrementEvaluationLimit = async (userId: string) => {
  await prisma.limit.update({
    where: { userId },
    data: { evaluationLimit: { decrement: 1 } },
  });
};
