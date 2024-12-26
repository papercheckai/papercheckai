"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { PaymentMethodDialog } from "../modal/select-payment-method";
import { CheckCircle2Icon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PaymentMethod } from "@/types/payment";
import { createStripeCheckoutSession } from "@/actions/stripe";
import { useRouter } from "next/navigation";
import { paymentMethods } from "@/utils/utils";

type PricingCardProps = {
  id: string;
  title: string;
  price?: number | string;
  description: string;
  features: string[];
  actionLabel: string;
  popular?: boolean;
  exclusive?: boolean;
};

const CheckItem = ({ text }: { text: string }) => (
  <div className="flex gap-2">
    <CheckCircle2Icon size={18} className="my-auto text-green-400" />
    <p className="pt-0.5 text-zinc-700 dark:text-zinc-300 text-sm">{text}</p>
  </div>
);

const PricingCard = ({
  id,
  title,
  price,
  description,
  features,
  popular,
  actionLabel,
  exclusive,
}: PricingCardProps) => {
  const router = useRouter();
  const [isPaymentMethodOpen, setPaymentMethodOpen] = useState(false);

  const handlePay = async () => {
    return router.push(`/shop/payment?item=${id}`);
  };
  return (
    <Card
      className={cn(
        `w-72 flex flex-col justify-between py-1 ${
          popular ? "border-rose-400" : "border-zinc-700"
        } mx-auto sm:mx-0`,
        {
          "animate-background-shine bg-white dark:bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] transition-colors":
            exclusive,
        }
      )}
    >
      <div>
        <CardHeader className="pb-8 pt-4">
          <CardTitle className="text-zinc-700 dark:text-zinc-300 text-lg">
            {title}
          </CardTitle>
          <div className="flex gap-0.5">
            <h3 className="text-3xl font-bold">
              {price ? "₹" + price : "Custom"}
            </h3>
          </div>
          <CardDescription className="pt-1.5 h-12">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {features.map((feature: string) => (
            <CheckItem key={feature} text={feature} />
          ))}
        </CardContent>
      </div>
      <CardFooter className="mt-2">
        <Button
          onClick={handlePay}
          className="relative inline-flex w-full items-center justify-center rounded-md bg-black text-white dark:bg-white px-6 font-medium  dark:text-black transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
        >
          <div className="absolute -inset-0.5 -z-10 rounded-lg bg-gradient-to-b from-[#c7d2fe] to-[#8678f9] opacity-75 blur" />
          {actionLabel}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PricingCard;
