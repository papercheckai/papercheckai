export const dynamic = "force-dynamic";
import { getClasses } from "@/actions/class";
import { getEvaluators } from "@/actions/evaluator";
import { getLimit } from "@/actions/limit";
import { getStudents } from "@/actions/student";
import StoreInitializer from "@/components/store-initializer";
import React from "react";

const PrivateLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [classes, evaluators, students, limit] = await Promise.all([
    getClasses(),
    getEvaluators(),
    getStudents(),
    getLimit(),
  ]);

  return (
    <>
      {children}
      <StoreInitializer
        classes={classes}
        evaluators={evaluators}
        students={students}
        limit={limit}
      />
    </>
  );
};

export default PrivateLayout;
