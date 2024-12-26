"use server";

import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/db";
export const getLimit = async () => {
  try {
    const clerkUser = await currentUser();
    if (!clerkUser) throw new Error("Unauthorized");
    const user = await prisma.user.findUniqueOrThrow({
      where: { clerkUserId: clerkUser.id },
      include: { limit: true },
    });
    if (!user) throw new Error("User not found");
    if (!user.limit) throw new Error("Limit not found");
    return user.limit;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
