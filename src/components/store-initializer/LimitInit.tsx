"use client";
import { useLimitStore } from "@/stores/limit-store";
import { Prisma } from "@prisma/client";
import { useEffect } from "react";

type Props = { limit: Prisma.LimitGetPayload<{}> };

const LimitInit = ({ limit }: Props) => {
  const setLimit = useLimitStore((state) => state.setLimit);

  useEffect(() => {
    setLimit(limit);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setLimit]);

  return null;
};

export default LimitInit;
