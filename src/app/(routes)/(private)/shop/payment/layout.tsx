import { Loader } from "@/components/ui/Loader";
import { Suspense } from "react";

const PaymentRootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <Suspense fallback={<Loader />}>{children}</Suspense>;
};

export default PaymentRootLayout;
