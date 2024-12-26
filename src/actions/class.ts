"use server";
import prisma from "@/lib/db";
import { AddClassSchema } from "@/schema";
import { currentUser, Session } from "@clerk/nextjs/server";
export async function addClass(data: AddClassSchema) {
  try {
    const clerkUser = await currentUser();
    if (!clerkUser) throw new Error("Unauthorized");

    const user = await prisma.user.findUnique({
      where: { clerkUserId: clerkUser.id },
    });

    if (!user) throw new Error("User not found");

    const exisiting = await prisma.class.findFirst({
      where: {
        name: data.name,
        section: data.section,
        subject: data.subject,
        userId: user.id,
      },
    });
    if (exisiting) throw new Error("Class already exists");

    const newClass = await prisma.class.create({
      data: {
        name: data.name,
        section: data.section,
        subject: data.subject,
        userId: user.id,
      },
    });
    return newClass;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getClasses() {
  try {
    const clerkUser = await currentUser();
    if (!clerkUser) throw new Error("Unauthorized");

    const user = await prisma.user.findUniqueOrThrow({
      where: { clerkUserId: clerkUser.id },
    });

    const classes = await prisma.class.findMany({ where: { userId: user.id } });
    return classes;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function editClass(id: string, data: AddClassSchema) {
  try {
    const clerkUser = await currentUser();
    if (!clerkUser) throw new Error("Unauthorized");
    const user = await prisma.user.findUniqueOrThrow({
      where: { clerkUserId: clerkUser.id },
    });

    const newClass = await prisma.class.update({
      where: { id: id, userId: user.id },
      data: {
        name: data.name,
        section: data.section,
        subject: data.subject,
      },
    });
    return newClass;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteClass(id: string) {
  try {
    const clerkUser = await currentUser();
    if (!clerkUser) throw new Error("Unauthorized");
    const user = await prisma.user.findUniqueOrThrow({
      where: { clerkUserId: clerkUser.id },
    });
    const newClass = await prisma.class.deleteMany({
      where: { id: id, userId: user.id },
    });
    return newClass;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
