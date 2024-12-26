"use client";
import {
  createOrder,
  failedPayment,
  orderCancelled,
  verifyPayment,
} from "@/actions/razorpay";
import Loader from "@/app/(routes)/(private)/dashboard/loader";
import { fetchAdnSetLimit } from "@/stores/limit-store";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useRazorpay, RazorpayOrderOptions } from "react-razorpay";

export default function RazorpayIntegration({ itemId }: { itemId: string }) {
  const router = useRouter();
  const { error, isLoading, Razorpay } = useRazorpay();

  useEffect(() => {
    openPayModal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openPayModal = async () => {
    const orderData = await createOrder({ itemId });
    const options: RazorpayOrderOptions = {
      key: orderData.key,
      amount: orderData.amount,
      currency: orderData.currency,
      name: orderData.name,
      description: orderData.description,
      order_id: orderData.order_id,
      prefill: {
        name: orderData.prefill.name,
        email: orderData.prefill.email,
      },
      handler: async (response) => {
        const { razorpay_signature, razorpay_payment_id } = response;

        const values = {
          razorpay_signature,
          razorpay_order_id: orderData.order_id,
          transactionid: razorpay_payment_id,
          transactionamount: orderData.amount,
        };
        await verifyPayment(values);
        router.push("/dashboard/evaluators");
        fetchAdnSetLimit();
      },
      theme: orderData.theme,
      modal: {
        ondismiss: async () => {
          await orderCancelled(orderData.order_id);
          router.push("/shop");
        },
      },
    };
    const razorpayInstance = new Razorpay(options);
    razorpayInstance.on("payment.failed", async function (response) {
      await failedPayment(response.error.metadata.order_id);
    });
    razorpayInstance.open();
  };

  return <div>{isLoading && <Loader />}</div>;
}
