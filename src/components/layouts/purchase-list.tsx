"use client";
import { useIsMobile } from "@/hooks/use-mobile";
import { Prisma } from "@prisma/client";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { DownloadIcon } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { format } from "date-fns";
import { currencySymbol } from "@/utils/utils";

type Props = {
  orders: Prisma.OrderGetPayload<{ include: { item: true } }>[];
};

const PurchaseList = ({ orders }: Props) => {
  const isMobile = useIsMobile();

  const handleDelete = () => {};
  const handleEdit = () => {};
  if (!orders.length) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-center text-muted-foreground">
            Purchases will be displayed here.
          </p>
        </CardContent>
      </Card>
    );
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const MotionTableBody = motion(TableBody);
  const MotionTableRow = motion(TableRow);
  return (
    <>
      {isMobile ? (
        <motion.div
          className="space-y-4"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {orders.map((order) => (
            <motion.div key={order.id} variants={item}>
              <Card>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold">{order.item.title}</p>
                      <p className="text-sm text-muted-foreground">
                        Date: {format(new Date(order.createdAt), "dd/MM/yyyy")}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Price: {currencySymbol}
                        {order.amount}
                      </p>{" "}
                      <p className="text-sm text-muted-foreground">
                        Payment Method: {order.paymentMethod}
                      </p>
                    </div>
                    <div className="space-x-2">
                      <Button size="sm" variant="outline" className="" asChild>
                        <Link href={`/invoice/${order.orderId}`}>
                          <DownloadIcon className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Purchase Date</TableHead>
                  <TableHead>Item</TableHead>
                  <TableHead>Total Price</TableHead>
                  <TableHead>Payment Method</TableHead>
                  <TableHead className="text-right">Invoice</TableHead>
                </TableRow>
              </TableHeader>
              <MotionTableBody
                variants={container}
                initial="hidden"
                animate="show"
              >
                {orders.map((order) => (
                  <MotionTableRow
                    transition={{ type: "spring", stiffness: 700, damping: 30 }}
                    key={order.id}
                  >
                    <TableCell>
                      {format(new Date(order.createdAt), "dd/MM/yyyy")}
                    </TableCell>
                    <TableCell>{order.item.title}</TableCell>
                    <TableCell>
                      {currencySymbol}
                      {order.amount}
                    </TableCell>
                    <TableCell>{order.paymentMethod}</TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant="outline" className="" asChild>
                        <Link href={`/invoice/${order.orderId}`}>
                          <DownloadIcon className="h-4 w-4" />
                        </Link>
                      </Button>
                    </TableCell>
                  </MotionTableRow>
                ))}
              </MotionTableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default PurchaseList;
