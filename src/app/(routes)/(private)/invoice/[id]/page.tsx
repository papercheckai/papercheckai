import { getInvoice } from "@/actions/invoice";
import { InvoiceDetails } from "@/components/invoice/invoice-details";
import Navbar from "@/components/layouts/navbar";
import { format } from "date-fns";
import React from "react";

type Props = {
  params: Promise<{ readonly id: string }>;
};

const InvoicePage = async ({ params }: Props) => {
  const orderId = (await params).id;

  const invoice = await getInvoice(orderId);

  return (
    <div className="min-h-screen p-4 bg-background">
      <Navbar title="Invoice" />
      <InvoiceDetails
        purchaseId={invoice.Order.id}
        date={format(new Date(invoice.Order.createdAt), "dd/MM/yyyy")}
        paymentMethod={invoice.Order.paymentMethod}
        product={{
          name: `${invoice.item.title} (${invoice.item.evaluatorLimit} Evaluators, ${invoice.item.evaluationLimit} Evaluations)`,
          price: 10,
        }}
        invoice={{
          to: invoice.to,
          from: invoice.from,
        }}
      />
    </div>
  );
};

export default InvoicePage;
