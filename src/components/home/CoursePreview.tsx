"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { COURSE_SECTIONS } from "@/lib/course-data";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { Badge } from "@/components/ui/Badge";

export function CoursePreview() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-20">
      <div className="text-center mb-14">
        <h2 className="text-3xl sm:text-4xl font-bold">
          The <span className="gradient-text">Curriculum</span>
        </h2>
        <p className="mt-3 text-slate-400 max-w-xl mx-auto">
          Seven sections, taken in order — each building on the last.
        </p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {COURSE_SECTIONS.map((section, i) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
          >
            <Link href={`/courses/${section.id}`}>
              <Card className="h-full group cursor-pointer">
                <div className="flex items-start justify-between">
                  <div
                    className="inline-flex h-12 w-12 items-center justify-center rounded-lg border"
                    style={{
                      backgroundColor: `${section.color}1a`,
                      borderColor: `${section.color}55`,
                    }}
                  >
                    <Icon
                      name={section.icon}
                      className="h-6 w-6"
                    />
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-slate-600 group-hover:text-neon-green transition-colors" />
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <span className="text-xs text-slate-500 font-mono">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-semibold text-slate-100">
                    {section.title}
                  </h3>
                </div>
                <p className="mt-2 text-sm text-slate-400 leading-relaxed line-clamp-3">
                  {section.description}
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <Badge color="slate">{section.lessons.length} lessons</Badge>
                  <span className="flex items-center gap-1 text-xs text-slate-500">
                    <Clock className="h-3.5 w-3.5" /> {section.totalDuration}
                  </span>
                </div>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
