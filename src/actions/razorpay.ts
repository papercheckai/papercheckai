"use server";
import Razorpay from "razorpay";
import prisma from "@/lib/db";
import crypto from "crypto";
import { CreateOrderRazorpay } from "@/schema";
import { currentUser } from "@clerk/nextjs/server";
import {
  currency,
  merchantAddress,
  merchantName,
  razorpayThemeColor,
} from "@/utils/utils";
import { CurrencyCode } from "react-razorpay/dist/constants/currency";

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createOrder = async (body: CreateOrderRazorpay) => {
  try {
    const clerkUser = await currentUser();
    if (!clerkUser) throw new Error("Unauthorized");
    const user = await prisma.user.findUnique({
      where: { clerkUserId: clerkUser.id },
    });
    if (!user) throw new Error("User not found");

    const data = CreateOrderRazorpay.parse(body);
    const coversionRate = 100;
    const item = await prisma.shopItem.findUnique({
      where: { id: data.itemId },
    });
    if (!item) throw new Error("Item not found");

    const razorpayOrder = await razorpayInstance.orders.create({
      amount: item.price * coversionRate,
      currency: currency.toUpperCase(),
      receipt: item.id,
      payment_capture: true,
    });

    const order = await prisma.order.create({
      data: {
        userId: user.id,
        orderId: razorpayOrder.id,
        itemId: item.id,
        amount: item.price,
        paymentMethod: "RAZORPAY",
      },
    });
    return {
      key: process.env.RAZORPAY_KEY_ID!,
      amount: order.amount,
      currency: currency.toUpperCase() as CurrencyCode,
      name: merchantName,
      description: item.title,
      order_id: order.orderId,
      prefill: {
        name: user.name,
        email: user.email,
      },
      theme: {
        color: razorpayThemeColor,
      },
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const verifyPayment = async (body: any) => {
  try {
    const clerkUser = await currentUser();
    if (!clerkUser) throw new Error("Unauthorized");
    const user = await prisma.user.findUnique({
      where: { clerkUserId: clerkUser.id },
    });
    if (!user) throw new Error("User not found");

    const {
      razorpay_signature,
      razorpay_order_id,
      transactionid,
      transactionamount,
    } = body;

    const order = await prisma.order.findFirst({
      where: { orderId: razorpay_order_id },
    });
    if (!order) throw new Error("Order not found");

    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(razorpay_order_id + "|" + transactionid)
      .digest("hex");

    if (generated_signature !== razorpay_signature)
      throw new Error("Invalid signature");

    if (order.amount !== transactionamount) throw new Error("Invalid amount");

    const item = await prisma.shopItem.findUnique({
      where: { id: order.itemId },
    });
    if (!item) throw new Error("Item not found");

    const [invoice, updatedLimit, updatedOrder] = await Promise.all([
      prisma.invoice.create({
        data: {
          orderId: order.id,
          userId: user.id,
          itemId: order.itemId,
          amount: order.amount,
          paymentMethod: order.paymentMethod,
          to: { name: user.name, email: user.email },
          from: { name: merchantName, email: merchantAddress },
        },
      }),
      prisma.limit.update({
        where: { userId: user.id },
        data: {
          evaluatorLimit: { increment: item.evaluatorLimit },
          evaluationLimit: { increment: item.evaluationLimit },
        },
      }),
      prisma.order.update({
        where: { id: order.id },
        data: {
          status: "COMPLETED",
        },
      }),
    ]);

    return { invoice, updatedLimit, updatedOrder };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const orderCancelled = async (orderId: string) => {
  try {
    const order = await prisma.order.delete({
      where: { orderId },
    });
    if (!order) throw new Error("Order not found");

    return order;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const failedPayment = async (orderId: string) => {
  try {
    const order = await prisma.order.update({
      where: { orderId },
      data: {
        status: "FAILED",
      },
    });
    if (!order) throw new Error("Order not found");

    return order;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
