import { getFailedOrder } from "@/actions/order";
import { PaymentFailed } from "@/components/payment/payment-failed";
import { redirect } from "next/navigation";
import React from "react";
import { format } from "date-fns";
type Props = {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

const FailedPaymentPage = async ({ searchParams }: Props) => {
  const orderId = (await searchParams)?.order_id as string;
  if (!orderId) redirect("/shop");

  const order = await getFailedOrder(orderId);
  return (
    <PaymentFailed
      errorMessage="Your payment could not be processed. Please try again or use a different payment method"
      paymentDetails={{
        amount: "&#8377;" + order.amount,
        date: format(new Date(order.createdAt), "dd MMM yyyy"),
        method: order.paymentMethod,
      }}
    />
  );
};

export default FailedPaymentPage;
