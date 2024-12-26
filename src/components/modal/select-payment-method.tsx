"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { PaymentMethod } from "@/types/payment";
import Image from "next/image";

interface PaymentMethodDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectPaymentMethod: (method: PaymentMethod) => void;
}

export function PaymentMethodDialog({
  isOpen,
  onOpenChange,
  onSelectPaymentMethod,
}: PaymentMethodDialogProps) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("stripe");

  const handleSubmit = () => {
    onSelectPaymentMethod(selectedMethod);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Select Payment Method</DialogTitle>
          <DialogDescription>
            Choose your preferred payment method to continue with the
            transaction.
          </DialogDescription>
        </DialogHeader>
        <div className="py-6">
          <RadioGroup
            value={selectedMethod}
            onValueChange={(value) => setSelectedMethod(value as PaymentMethod)}
            className="flex flex-col gap-4" // Update 1: Changed className
          >
            {[
              {
                value: "stripe",
                logo: "https://cdn.worldvectorlogo.com/logos/stripe-4.svg",
              },
              {
                value: "paypal",
                logo: "https://cdn.worldvectorlogo.com/logos/paypal-3.svg",
              },
              {
                value: "razorpay",
                logo: "https://razorpay.com/assets/razorpay-logo-white.svg",
                bgColor: "bg-[#072654]",
              },
            ].map((method) => (
              <div key={method.value} className="relative">
                <RadioGroupItem
                  value={method.value}
                  id={method.value}
                  className="sr-only"
                />
                <Label
                  htmlFor={method.value}
                  className={`flex items-center justify-start p-4 border-2 rounded-lg cursor-pointer transition-all w-full ${
                    // Update 2: Updated className
                    selectedMethod === method.value
                      ? "border-white bg-primary/10"
                      : "border-transparent hover:border-gray-300"
                  } ${method.bgColor || ""}`}
                >
                  <Image
                    width={200}
                    height={40}
                    src={method.logo}
                    alt={`${method.value} logo`}
                    className="h-10 object-contain"
                  />
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            Confirm Payment Method
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
