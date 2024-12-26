"use server";
import prisma from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export const ensureUserCreated = async () => {
  const clerkUser = await currentUser();
  if (!clerkUser) throw new Error("Unauthorized");
  const user = await prisma.user.findUnique({
    where: { clerkUserId: clerkUser.id },
  });
  return !!user;
};
