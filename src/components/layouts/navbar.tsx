"use client";
import React from "react";
import { Button } from "../ui/button";
import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
type Props = { title: string };

const Navbar = (props: Props) => {
  return (
    <header className="sticky top-0 flex shrink-0 items-center gap-4 border-b bg-background p-2 z-10 print:invisible">
      <Button variant="ghost" size={"sm"} asChild>
        <Link href={"/dashboard/evaluators"}>
          <ChevronLeftIcon />
        </Link>
      </Button>
      <h1 className="text-xl">{props.title}</h1>
    </header>
  );
};

export default Navbar;
