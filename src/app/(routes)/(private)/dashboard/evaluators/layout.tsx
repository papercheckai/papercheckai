import Header from "@/components/layouts/sidebar-header";
import React from "react";

type Props = {};

const EvaluatorLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Header page="Evaluators" />
      {children}
    </>
  );
};

export default EvaluatorLayout;
