"use client";
import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { Users, School2, GraduationCap, Clock } from "lucide-react";

const stats = [
  {
    icon: <Users className="h-6 w-6" />,
    value: "50,000+",
    label: "Teachers Trust Us",
  },
  {
    icon: <School2 className="h-6 w-6" />,
    value: "1000+",
    label: "Schools Worldwide",
  },
  {
    icon: <GraduationCap className="h-6 w-6" />,
    value: "5M+",
    label: "Papers Evaluated",
  },
  {
    icon: <Clock className="h-6 w-6" />,
    value: "80%",
    label: "Time Saved",
  },
];

export function StatsSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="mb-4 mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-primary/10">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
