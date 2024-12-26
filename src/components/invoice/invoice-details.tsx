"use client";

import { motion } from "motion/react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useEffect } from "react";

interface InvoiceDetailsProps {
  purchaseId: string;
  date: string;
  paymentMethod: string;
  product: {
    name: string;
    price: number;
  };
  invoice: {
    to: {
      name: string;
      email: string;
    };
    from: {
      name: string;
      email: string;
    };
  };
}

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function InvoiceDetails({
  purchaseId,
  date,
  paymentMethod,
  product,
  invoice,
}: InvoiceDetailsProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window !== "undefined") {
        window.print();
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="min-h-[calc(100vh-100px)] w-full grid place-items-center">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-2xl overflow-hidden bg-gray-900 text-gray-100 shadow-xl">
          <CardHeader className="bg-blue-600 p-8">
            <motion.h1
              className="text-2xl font-medium text-white text-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Thank you.
            </motion.h1>
          </CardHeader>
          <CardContent className="p-0">
            <motion.div
              className="grid grid-cols-2 items-center p-4 hover:bg-gray-800 transition-colors duration-200"
              variants={fadeIn}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <p className="text-sm text-gray-400">Purchase ID: {purchaseId}</p>
              <p className="text-sm text-right text-gray-400">{date}</p>
            </motion.div>
            <Separator className="bg-gray-700" />
            <motion.div
              className="grid grid-cols-2 items-center p-4 hover:bg-gray-800 transition-colors duration-200"
              variants={fadeIn}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <p className="text-sm text-gray-400">Payment Method:</p>
              <p className="text-sm text-right">{paymentMethod}</p>
            </motion.div>
            <Separator className="bg-gray-700" />
            <motion.div
              className="grid grid-cols-2 items-center p-4 hover:bg-gray-800 transition-colors duration-200"
              variants={fadeIn}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <p className="text-sm text-gray-400">{product.name}</p>
              <p className="text-sm text-right">₹ {product.price}</p>
            </motion.div>
            <Separator className="bg-gray-700" />
            <motion.div
              className="grid grid-cols-2 gap-4 p-4 hover:bg-gray-800 transition-colors duration-200"
              variants={fadeIn}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <div>
                <p className="text-sm text-gray-400 mb-1">Invoice for:</p>
                <p className="text-sm">{invoice.to.name}</p>
                <p className="text-sm text-gray-500">{invoice.to.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">From:</p>
                <p className="text-sm">{invoice.from.name}</p>
                <p className="text-sm text-gray-500">{invoice.from.email}</p>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
