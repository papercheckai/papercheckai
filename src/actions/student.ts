"use server";
import { AddStudentSchema, EditStudentSchema } from "@/schema";
import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/db";

export const addStudent = async (values: AddStudentSchema) => {
  try {
    const clerkUser = await currentUser();
    if (!clerkUser) throw new Error("Unauthorized");

    const user = await prisma.user.findUniqueOrThrow({
      where: { clerkUserId: clerkUser.id },
    });

    const { classId, name, rollNo } = AddStudentSchema.parse(values);

    const _class = await prisma.class.findUniqueOrThrow({
      where: { id: classId, userId: user.id },
    });

    const existingRollNo = await prisma.student.findFirst({
      where: { rollNo, classId: _class.id },
    });

    if (existingRollNo) throw new Error("Roll no already exists");

    const student = await prisma.student.create({
      data: { name, rollNo, classId },
    });
    return student;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getStudentsByClassId = async (classId: string) => {
  try {
    const clerkUser = await currentUser();
    if (!clerkUser) throw new Error("Unauthorized");

    const user = await prisma.user.findUniqueOrThrow({
      where: { clerkUserId: clerkUser.id },
    });

    const _class = await prisma.class.findUniqueOrThrow({
      where: { id: classId, userId: user.id },
    });

    const students = await prisma.student.findMany({
      where: { classId: _class.id },
    });
    return students;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getStudents = async () => {
  try {
    const clerkUser = await currentUser();
    if (!clerkUser) throw new Error("Unauthorized");

    const user = await prisma.user.findUniqueOrThrow({
      where: { clerkUserId: clerkUser.id },
    });

    const classes = await prisma.class.findMany({
      where: { userId: user.id },
      select: { students: true },
    }); // [students : {}, students : {}]

    // flating to get all students
    const students = classes.flatMap((student) => student.students);
    return students;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const editStudent = async (id: string, data: EditStudentSchema) => {
  try {
    const clerkUser = await currentUser();
    if (!clerkUser) throw new Error("Unauthorized");

    const user = await prisma.user.findUniqueOrThrow({
      where: { clerkUserId: clerkUser.id },
    });

    const student = await prisma.student.findFirstOrThrow({
      where: { id: id, class: { userId: user.id } },
    });

    const updatedStudent = await prisma.student.update({
      where: { id: id, class: { userId: user.id } },
      data: {
        name: data.name,
        rollNo: data.rollNo,
      },
    });
    return updatedStudent;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteStudent = async (id: string) => {
  try {
    const clerkUser = await currentUser();
    if (!clerkUser) throw new Error("Unauthorized");

    const user = await prisma.user.findUniqueOrThrow({
      where: { clerkUserId: clerkUser.id },
    });

    const student = await prisma.student.findFirstOrThrow({
      where: { id, class: { userId: user.id } },
    });

    await prisma.student.delete({ where: { id } });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
