"use client";
import { useLimitStore } from "@/stores/limit-store";
import { Badge } from "@/components/ui/badge";
import { Button } from "../ui/button";
import { ShoppingBagIcon } from "lucide-react";
import Link from "next/link";

const EvaluatorLimitCount = () => {
  const limit = useLimitStore((state) => state.limit);
  return (
    <div className="flex items-center justify-between">
      <div>
        <Badge variant="secondary" className="block space-y-1">
          <span className="block">{limit?.evaluatorLimit} Evaluator Left</span>
          <span className="block">
            {limit?.evaluationLimit} Evaluation Left
          </span>
        </Badge>
      </div>
      <Button variant={"secondary"} size={"sm"} asChild>
        <Link href={"/shop"}>
          <ShoppingBagIcon className="w-4 h-4" />
          Shop
        </Link>
      </Button>
    </div>
  );
};

export default EvaluatorLimitCount;
