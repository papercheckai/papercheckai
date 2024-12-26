"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrophyIcon, UserIcon } from "lucide-react";
import { Prisma } from "@prisma/client";
import { useResultStore } from "@/stores/result-store";
import dynamic from "next/dynamic";
import { Loader } from "../ui/Loader";

const MarkSheetView = dynamic(() => import("./marksheets"), {
  ssr: false,
  loading: () => <Loader />,
});
const DetailedResultView = dynamic(() => import("./detailed-view"), {
  loading: () => <Loader />,
  ssr: false,
});

type Props = {
  evaluator: Prisma.EvaluatorGetPayload<{
    include: { class: true; evaluation: true };
  }>;
};

const ResultView = ({ evaluator }: Props) => {
  const { activeTab, setActiveTab } = useResultStore((state) => state);
  return (
    <Tabs
      className="w-full my-4 container mx-auto"
      value={activeTab}
      onValueChange={(value) => setActiveTab(value as typeof activeTab)}
    >
      <TabsList className="space-x-4 mx-auto flex w-fit">
        <TabsTrigger
          value="marksheets"
          className="flex items-center justify-between gap-2"
        >
          <TrophyIcon className="w-4 h-4" />
          Marksheets
        </TabsTrigger>
        <TabsTrigger
          value="detailed"
          className="flex items-center justify-between gap-2"
        >
          <UserIcon className="w-4 h-4" />
          Detailed View
        </TabsTrigger>
      </TabsList>
      <TabsContent value="marksheets" className="p-4">
        <MarkSheetView evaluator={evaluator} />
      </TabsContent>
      <TabsContent value="detailed" className="p-4">
        <DetailedResultView evaluator={evaluator} />
      </TabsContent>
    </Tabs>
  );
};

export default ResultView;
