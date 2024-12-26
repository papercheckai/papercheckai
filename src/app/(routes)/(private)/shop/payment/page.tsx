"use client";
import Navbar from "@/components/layouts/navbar";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import Loader from "../../dashboard/loader";

const RazorpayIntegration = dynamic(
  () => import("@/components/payment/razorpay_form"),
  { ssr: false, loading: () => <Loader /> }
);

type Props = {};

const PaymentPage = (props: Props) => {
  const params = useSearchParams();
  const itemId = params.get("item");

  if (!itemId) return;
  return (
    <main className="min-h-screen">
      <Navbar title="Payment" />
      <RazorpayIntegration itemId={itemId} />
    </main>
  );
};

export default PaymentPage;
