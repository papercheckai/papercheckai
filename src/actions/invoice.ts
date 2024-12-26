import { currentUser } from "@clerk/nextjs/server";
import { z } from "zod";
import prisma from "@/lib/db";

export const getInvoice = async (id: string) => {
  try {
    const clerkUser = await currentUser();
    const user = await prisma.user.findUnique({
      where: { clerkUserId: clerkUser?.id },
    });
    if (!user) throw new Error("User not found");

    const orderId = z
      .string()
      .min(1, { message: "OrderId is requried" })
      .parse(id);

    const order = await prisma.order.findUnique({
      where: { orderId },
    });

    if (!order) throw new Error("Order not found");

    const invoice = await prisma.invoice.findUnique({
      where: { orderId: order.id, userId: user.id },
      include: { item: true, Order: true },
    });

    if (!invoice) throw new Error("Invoice not found");
    return invoice;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
