"use client";
import React from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  FileIcon,
  KeyIcon,
  PencilLineIcon,
  RotateCwIcon,
  ZoomInIcon,
  ZoomOutIcon,
} from "lucide-react";
import Image from "next/image";
import { Prisma } from "@prisma/client";
import { ScrollArea } from "../ui/scroll-area";

type Props = {
  evaluator: Prisma.EvaluatorGetPayload<{
    include: { class: true; evaluation: true };
  }>;
  studentId: string;
};

const SheetView = ({ evaluator, studentId }: Props) => {
  return (
    <Tabs defaultValue="answerSheet">
      <TabsList>
        <TabsTrigger value="answerSheet" className="flex items-center gap-2">
          <PencilLineIcon className="w-4 h-4" />
          Answer Sheet
        </TabsTrigger>
        <TabsTrigger value="questionPaper" className="flex items-center gap-2">
          <FileIcon className="w-4 h-4" /> Question Paper
        </TabsTrigger>
        <TabsTrigger value="answerKey">
          <KeyIcon className="w-4 h-4" /> Answer Key
        </TabsTrigger>
      </TabsList>
      <TabsContent value="answerSheet">
        <ScrollArea className="h-[calc(100vh-150px-80px)]">
          {evaluator.evaluation?.answerSheets
            ?.find((ans) => ans.studentId === studentId)
            ?.answerSheet.map((sheet, i) => createZoomableSheet(i, sheet))}
        </ScrollArea>
      </TabsContent>
      <TabsContent value="questionPaper">
        <ScrollArea className="h-[calc(100vh-150px-80px)]">
          {evaluator.questionPapers.map((sheet, i) =>
            createZoomableSheet(i, sheet)
          )}
        </ScrollArea>
      </TabsContent>
      <TabsContent value="answerKey">
        <ScrollArea className="h-[calc(100vh-150px-80px)]">
          {evaluator.answerKeys.map((sheet, i) =>
            createZoomableSheet(i, sheet)
          )}
        </ScrollArea>
      </TabsContent>
    </Tabs>
  );
};

export default SheetView;
function createZoomableSheet(i: number, sheet: string): React.JSX.Element {
  return (
    <TransformWrapper key={i} initialScale={1} wheel={{ wheelDisabled: true }}>
      {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
        <>
          <div className="flex p-2 items-center">
            <p className="mr-2 flex-grow">Page {i + 1}</p>
            <button
              className="btn btn-circle btn-sm mr-2"
              onClick={() => zoomIn()}
            >
              <ZoomInIcon />
            </button>
            <button
              className="btn btn-circle btn-sm mr-2"
              onClick={() => zoomOut()}
            >
              <ZoomOutIcon />
            </button>
            <button
              className="btn btn-circle btn-sm mr-2"
              onClick={() => resetTransform()}
            >
              <RotateCwIcon />
            </button>
          </div>
          <TransformComponent wrapperClass="opacity-50 !w-full" contentClass="">
            <Image
              alt="Sheet"
              width={500}
              height={500}
              src={sheet}
              className="w border object-contain mx-auto"
            />
          </TransformComponent>
        </>
      )}
    </TransformWrapper>
  );
}
