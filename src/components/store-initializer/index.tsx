import React from "react";
import ClassInitializer from "@/components/store-initializer/ClassInitializer";
import EvaluatorInitializer from "@/components/store-initializer/EvaluatorInitializer";
import StudentInitializer from "@/components/store-initializer/StudentInitializer";
import { Prisma } from "@prisma/client";
import LimitInit from "./LimitInit";
type Props = {
  evaluators: Prisma.EvaluatorGetPayload<{
    include: { class: true; evaluation: true };
  }>[];
  classes: Prisma.ClassGetPayload<{}>[];
  students: Prisma.StudentGetPayload<{}>[];
  limit: Prisma.LimitGetPayload<{}>;
};

const StoreInitializer = ({ classes, evaluators, students, limit }: Props) => {
  return (
    <>
      <ClassInitializer classes={classes} />
      <EvaluatorInitializer evaluators={evaluators} />
      <StudentInitializer students={students} />
      <LimitInit limit={limit} />
    </>
  );
};

export default StoreInitializer;
