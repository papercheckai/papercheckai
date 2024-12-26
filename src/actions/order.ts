"use server";

import prisma from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

const getOrderInfo = async (orderId: string) => {
  const order = await prisma.order.findUnique({
    where: { orderId },
  });
  return order;
};

export const getFailedOrder = async (orderId: string) => {
  try {
    const clerkUser = await currentUser();
    const user = await prisma.user.findUnique({
      where: { clerkUserId: clerkUser?.id },
    });
    if (!user) throw new Error("User not found");

    const order = await prisma.order.findUnique({
      where: { orderId, status: "FAILED", userId: user.id },
    });

    if (!order) throw new Error("Failed Order not found");
    return order;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getOrders = async () => {
  try {
    const clerkUser = await currentUser();
    const user = await prisma.user.findUnique({
      where: { clerkUserId: clerkUser?.id },
    });
    if (!user) throw new Error("User not found");

    const orders = await prisma.order.findMany({
      where: {
        userId: user.id,
        status: "COMPLETED",
      },
      include: { item: true },
    });
    return orders;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
