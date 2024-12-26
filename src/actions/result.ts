import { currentUser } from "@clerk/nextjs/server";

export const getAllResult = async (evaluatorId: string) => {
  try {
    const clerkUser = await currentUser();
    if (!clerkUser) throw new Error("Unauthorized");

    const user = await getUser(clerkUser.id);
    const evaluator = await getEvaluator(evaluatorId, user.id);
    const evaluation = evaluator.evaluation;
    if (!evaluation) throw new Error("Evaluation not found");

    for (const result of evaluation.results) {
    }
  } catch (error) {}
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
