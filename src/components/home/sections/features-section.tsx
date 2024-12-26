"use client";
import { motion } from "motion/react";
import { Brain, Clock, LineChart, Upload } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features = [
  {
    icon: Upload,
    title: "Easy Upload Process",
    description:
      "Upload question papers and answer keys in multiple formats including PDF and images.",
  },
  {
    icon: Brain,
    title: "AI Evaluation",
    description:
      "Advanced AI algorithms evaluate answers with human-like understanding and accuracy.",
  },
  {
    icon: Clock,
    title: "Instant Results",
    description:
      "Get immediate scoring results and detailed feedback for each answer.",
  },
  {
    icon: LineChart,
    title: "Analytics Dashboard",
    description:
      "Comprehensive analytics and insights about student performance and areas of improvement.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our AI-powered platform streamlines the grading process with
            advanced features
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="border-none shadow-none bg-muted/50 hover:bg-muted/80 transition-colors">
                <CardHeader>
                  <feature.icon className="w-10 h-10 text-primary mb-4" />
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
