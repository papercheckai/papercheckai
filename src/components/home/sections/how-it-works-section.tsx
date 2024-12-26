"use client";
import { motion } from "motion/react";
import { FileUp, Sparkles, ClipboardCheck } from "lucide-react";

const steps = [
  {
    icon: FileUp,
    title: "Upload Materials",
    description: "Upload your question paper and answer key in any format",
  },
  {
    icon: Sparkles,
    title: "AI Processing",
    description: "Our AI analyzes and evaluates student answers",
  },
  {
    icon: ClipboardCheck,
    title: "Get Results",
    description: "Receive detailed scoring and feedback instantly",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Three simple steps to transform your grading process
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="relative mb-8">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 left-[60%] w-[80%] h-[2px] bg-primary/20" />
                )}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
