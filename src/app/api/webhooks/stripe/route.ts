import Stripe from "stripe";
import prisma from "@/lib/db";
import { merchantAddress, merchantName } from "@/utils/utils";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-11-20.acacia",
});

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;
  let event: Stripe.Event;
  try {
    if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) return;
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    console.error("Webhook Error:", error);
    return new Response("Webhook Error", { status: 400 });
  }

  // Successfully constructed event.
  console.log("✅ Success:", event.id);

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        // get payment id from session
        const paymentIntent = session.payment_intent;
        const userId = session.metadata?.userId;
        const itemId = session.metadata?.itemId;

        if (!paymentIntent)
          return Response.json(
            { error: "Payment intent not found" },
            { status: 404 }
          );

        const user = await prisma.user.findUnique({
          where: { id: userId },
        });
        if (!user)
          return Response.json({ error: "User not found" }, { status: 404 });

        const item = await prisma.shopItem.findUnique({
          where: { id: itemId },
        });
        if (!item)
          return Response.json({ error: "Item not found" }, { status: 404 });

        const order = await prisma.order.create({
          data: {
            userId: user.id,
            itemId: item.id,
            amount: item.price,
            status: "COMPLETED",
            paymentMethod: "STRIPE",
            orderId: session.id,
          },
        });
        const [invoice, updatedLimit] = await Promise.all([
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
        ]);
        break;
      }

      default: {
        console.warn(`Unhandled event type: ${event.type}`);
        break;
      }
    }
    return Response.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return Response.json(
      {
        error: {
          message:
            error instanceof Error ? error.message : "Internal Server Error",
        },
      },
      { status: 500 }
    );
  }
}
