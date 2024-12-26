"use client";

import { AlertCircle } from "lucide-react";
import { motion } from "motion/react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface PaymentFailedProps {
  errorMessage: string;
  paymentDetails: {
    amount: string;
    method: string;
    date: string;
  };
}

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const buttonHover = {
  scale: 1.05,
  transition: { duration: 0.2 },
};

export function PaymentFailed({
  errorMessage,
  paymentDetails,
}: PaymentFailedProps) {
  const handleTryAgain = () => {
    console.log("Trying payment again");
    // Implement retry logic here
  };

  const handleContactSupport = () => {
    console.log("Contacting support");
    // Implement support contact logic here
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-purple-950 to-black">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 0.5,
          ease: "easeOut",
        }}
      >
        <motion.div
          animate={{
            boxShadow: [
              "0 0 0 0 rgba(255, 255, 255, 0.1)",
              "0 0 0 20px rgba(255, 255, 255, 0)",
            ],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.5 }}
          >
            <Card className="w-[380px] overflow-hidden bg-gray-800 text-gray-100">
              <CardHeader className="bg-gradient-to-r from-red-900 to-pink-900">
                <CardTitle className="text-2xl font-bold text-center">
                  Payment Failed
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 mt-4">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <Alert
                    variant="destructive"
                    className="bg-red-900 border-red-700"
                  >
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle className="text-red-400">Error</AlertTitle>
                    <AlertDescription className="text-red-300">
                      {errorMessage}
                    </AlertDescription>
                  </Alert>
                </motion.div>
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <h3 className="text-sm font-medium text-gray-300">
                    Payment Details
                  </h3>
                  <p className="text-sm text-gray-400">
                    Amount: {paymentDetails.amount}
                  </p>
                  <p className="text-sm text-gray-400">
                    Payment Method: {paymentDetails.method}
                  </p>
                  <p className="text-sm text-gray-400">
                    Date: {paymentDetails.date}
                  </p>
                </motion.div>
                <Separator className="bg-gray-700" />
                <motion.p
                  className="text-sm text-gray-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  Please try again or contact our support team for assistance.
                </motion.p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <motion.div whileHover={buttonHover}>
                  <Button
                    variant="outline"
                    onClick={handleTryAgain}
                    className="bg-gray-700 text-gray-100 border-gray-600 hover:bg-gray-600"
                  >
                    Try Again
                  </Button>
                </motion.div>
                <motion.div whileHover={buttonHover}>
                  <Button
                    variant="secondary"
                    onClick={handleContactSupport}
                    className="bg-pink-900 text-gray-100 hover:bg-pink-800"
                  >
                    Contact Support
                  </Button>
                </motion.div>
              </CardFooter>
            </Card>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
