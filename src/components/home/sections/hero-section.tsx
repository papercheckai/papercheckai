"use client";
import { motion } from "motion/react";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import * as WritingImage from "@/assets/images/home.webp";
import Image from "next/image";
import { useLearnMoreDialog } from "@/stores/learn-more-dialog";
import Link from "next/link";
export function HeroSection() {
  const { openLearnMore } = useLearnMoreDialog();
  const features = [
    "Upload question papers and answer keys",
    "AI-powered answer evaluation",
    "Instant scoring and feedback",
    "Detailed performance analytics",
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 flex items-center">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Grade Papers Smarter with{" "}
              <span className="text-primary">AI-Powered</span> Evaluation
            </h1>
            <p className="text-xl text-muted-foreground">
              Transform your grading process with our intelligent paper
              evaluation system. Upload question papers and answer keys, and let
              AI handle the rest.
            </p>
            <div className="space-y-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <CheckCircle className="text-primary w-5 h-5" />
                  <span>{feature}</span>
                </motion.div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="gap-2" asChild>
                <Link href={"/dashboard"}>
                  Get Started <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" onClick={openLearnMore}>
                Learn More
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 p-8">
              <Image
                src={WritingImage}
                alt="AI Grading System"
                className="rounded-xl object-cover w-full h-full"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
