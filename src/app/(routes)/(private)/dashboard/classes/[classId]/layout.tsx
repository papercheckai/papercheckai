import Header from "@/components/layouts/sidebar-header";
import React from "react";

type Props = {};

const ClassLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Header page="Classes" />
      {children}
    </>
  );
};

export default ClassLayout;
