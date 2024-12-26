import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { Webhook } from "svix";
import prisma from "@/lib/db";
import { UserRole } from "@prisma/client";

class ClerkEventHandler {
  private event: WebhookEvent;
  constructor(event: WebhookEvent) {
    this.event = event;
  }
  async handlerUserCreatedOrUpdate() {
    if (
      this.event.type === "user.created" ||
      this.event.type === "user.updated"
    ) {
      const user = this.event.data;
      await prisma.user.upsert({
        where: { email: user.email_addresses[0].email_address },
        update: {
          name: [user.first_name, user.last_name].join(" "),
          clerkUserId: user.id,
          role: UserRole.USER,
          metadata: {
            username: user.username,
            image: user.image_url,
          },
        },
        create: {
          clerkUserId: user.id,
          name: [user.first_name, user.last_name].join(" "),
          email: user.email_addresses[0].email_address,
          role: UserRole.USER,
          limit: {
            create: {
              evaluatorLimit: 1,
              evaluationLimit: 3,
            },
          },
          metadata: {
            username: user.username,
            image: user.image_url,
          },
        },
      });
    }
  }
  async handlerUserDeletion() {
    if (this.event.type === "user.deleted") {
      const { id } = this.event.data;
      const existingUser = await prisma.user.findFirst({
        where: { clerkUserId: id },
      });
      if (!existingUser) return;
      await prisma.user.delete({
        where: { clerkUserId: id },
      });
    }
  }
  async handleEvent() {
    const eventType = this.event.type;
    switch (eventType) {
      case "user.created":
      case "user.updated":
        await this.handlerUserCreatedOrUpdate();
        break;
      case "user.deleted":
        await this.handlerUserDeletion();
        break;
      default:
        console.warn(`Unhandled event type: ${eventType}`);
        break;
    }
  }
}

export async function POST(request: Request) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
  if (!WEBHOOK_SECRET)
    throw new Error("WEBHOOK_SECRET is not defined, add in env");
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  console.log({
    svix_id,
    svix_timestamp,
    svix_signature,
  });
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occurred -- missing Svix headers", {
      status: 400,
    });
  }

  const payload = await request.json();
  const body = JSON.stringify(payload);
  const wh = new Webhook(WEBHOOK_SECRET);

  const evt: WebhookEvent = (await wh.verify(body, {
    "svix-id": svix_id,
    "svix-timestamp": svix_timestamp,
    "svix-signature": svix_signature,
  })) as WebhookEvent;

  await new ClerkEventHandler(evt).handleEvent();
  return new Response("ok", { status: 200 });
}
