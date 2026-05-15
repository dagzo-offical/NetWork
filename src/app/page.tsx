import { Hero } from "@/components/home/Hero";
import { Features } from "@/components/home/Features";
import { CoursePreview } from "@/components/home/CoursePreview";
import { TOTAL_LESSONS, COURSE_SECTIONS, getAllLessons } from "@/lib/course-data";

const stats = [
  { label: "Lessons", value: `${TOTAL_LESSONS}` },
  { label: "Sections", value: `${COURSE_SECTIONS.length}` },
  {
    label: "Hands-on Topics",
    value: `${getAllLessons().reduce(
      (n, l) => n + l.content.cliExamples.length + l.content.configExamples.length,
      0
    )}+`,
  },
  { label: "Attack Vectors Covered", value: "60+" },
];

export default function Home() {
  return (
    <div>
      <Hero />

      <section className="mx-auto max-w-7xl px-4 sm:px-6 -mt-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="glass rounded-xl p-5 text-center"
            >
              <div className="text-2xl sm:text-3xl font-bold gradient-text">
                {s.value}
              </div>
              <div className="mt-1 text-xs text-slate-500 uppercase tracking-wide">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Features />
      <CoursePreview />
    </div>
  );
}
