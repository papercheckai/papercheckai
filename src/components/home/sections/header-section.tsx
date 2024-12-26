"use client";
import { motion } from "motion/react";
import { BrainCircuit } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SignedIn, SignedOut, useClerk } from "@clerk/nextjs";
import { EnsureUserCreated } from "./ensure-user-created";

export function Header() {
  const { user } = useClerk();
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b"
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2"
        >
          <BrainCircuit className="w-8 h-8 text-primary" />
          <span className="text-xl font-bold">PapercheckAI</span>
        </motion.div>
        <nav className="hidden md:flex items-center gap-6">
          <a
            href="#features"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            How it works
          </a>
          <a
            href="#pricing"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            Pricing
          </a>
          <a
            href="https://docs.papercheckai.com"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            Docs
          </a>
        </nav>
        <div className="flex items-center gap-4">
          <SignedIn>
            <EnsureUserCreated />
          </SignedIn>
          <SignedOut>
            <Button variant="ghost" className="hidden sm:block" asChild>
              <Link href={"/sign-in"}>Log in</Link>
            </Button>
            <Button asChild>
              <Link href={"/sign-up"}>Sign up</Link>
            </Button>
          </SignedOut>
        </div>
      </div>
    </motion.header>
  );
}
