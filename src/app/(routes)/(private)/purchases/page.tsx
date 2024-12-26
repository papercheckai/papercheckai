import { getOrders } from "@/actions/order";
import Navbar from "@/components/layouts/navbar";
import PurchaseList from "@/components/layouts/purchase-list";
import React from "react";

type Props = {};

const PurchasesPage = async (props: Props) => {
  const orders = await getOrders();
  return (
    <div className="space-y-4">
      <Navbar title="Purchases" />
      <div className="container mx-auto">
        <PurchaseList orders={orders} />
      </div>
    </div>
  );
};

export default PurchasesPage;
