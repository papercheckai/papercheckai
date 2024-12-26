"use server";

import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-11-20.acacia",
});

export const createStripeCheckoutSession = async (itemId: string) => {
  const clerkUser = await currentUser();
  if (!clerkUser) {
    redirect("/sign-in");
  }
  const user = await prisma.user.findUnique({
    where: { clerkUserId: clerkUser.id },
  });
  if (!user) {
    redirect("/sign-in");
  }
  const item = await prisma.shopItem.findUnique({ where: { id: itemId } });
  if (!item) {
    redirect("/shop");
  }
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "inr",
          product_data: {
            name: item.title,
            description: item.description,
          },
          unit_amount: item.price * 100,
        },
        quantity: 1,
      },
    ],
    metadata: { userId: user.id, itemId: item.id },
    mode: "payment",
    success_url: `${process.env.BASE_URL}/invoice/{CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.BASE_URL}/shop`,
  });
  redirect(session.url!);
};
