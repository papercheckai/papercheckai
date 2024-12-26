"use server";
import prisma from "@/lib/db";
import { AddShopItem } from "@/schema";
import { ZodError } from "zod";

export const createShopItem = async (data: AddShopItem) => {
  try {
    const schema = AddShopItem.parse(data);
    const shopItem = await prisma.shopItem.create({
      data: {
        title: schema.title,
        evaluatorLimit: schema.evaluatorLimit,
        evaluationLimit: schema.evaluationLimit,
        price: schema.price,
        features: schema.features,
        actionLabel: schema.actionLabel,
        popular: schema.popular,
        exclusive: schema.exclusive,
        currency: schema.currency,
        active: schema.active,
        description: schema.description,
      },
    });
    return shopItem;
  } catch (error) {
    console.log(error);
    if (error instanceof ZodError) throw new Error(error.message);
    if (error instanceof Error) throw new Error(error.message);
    throw new Error("Something went wrong");
  }
};

export const getShopItems = async () => {
  try {
    const shopItems = await prisma.shopItem.findMany();
    return shopItems;
  } catch (error) {
    console.log(error);
  }
};
