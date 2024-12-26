import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import prisma from "@/lib/db";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-11-20.acacia",
});

export async function POST(req: Request) {
  console.log("POST /api/checkout/stripe working");
  const clerkUser = await currentUser();
  if (!clerkUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const user = await prisma.user.findUnique({
    where: { clerkUserId: clerkUser.id },
  });

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const formData = await req.formData();
  const itemId = formData.get("itemId") as string;
  if (!itemId)
    return NextResponse.json(
      { error: "Item ID not provided" },
      { status: 400 }
    );

  try {
    const item = await prisma.shopItem.findUnique({ where: { id: itemId } });
    if (!item)
      return NextResponse.json({ error: "Item not found" }, { status: 404 });

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
      metadata: { userId: user.id },
      mode: "payment",
      success_url: `${process.env.BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.BASE_URL}/cancel`,
    });
    return NextResponse.redirect(session.url!);
  } catch (err) {
    console.error("Error:", err);
    return NextResponse.json(
      {
        error: {
          message: err instanceof Error ? err.message : "Internal Server Error",
        },
      },
      { status: 500 }
    );
  }
}
