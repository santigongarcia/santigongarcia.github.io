import React from "react";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { Image } from "@/components/ui/image";
import { SectionHeader } from "./ExperienceTimeline";
import { ui } from "@/data/i18n";

export default function EducationPanel({ education = [], lang = "es" }) {
  const t = ui[lang];
  return (
    <section id="education" className="relative px-4 py-16">
      <div className="mx-auto max-w-5xl">
        <SectionHeader code="EDU.PATH" title="education.log" comment={t.eduComment} />

        <div className="mt-8 space-y-3">
          {education.map((e, idx) => (
            <motion.div
              key={e.id || idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="group flex items-start gap-4 border border-border bg-card/40 p-4 transition-colors hover:border-primary/40"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-border bg-secondary/50 p-1 transition-colors group-hover:border-primary/50 overflow-hidden">
                {e.logoUrl ? (
                  <Image src={e.logoUrl} alt="" fittingType="fit" className="h-full w-full" />
                ) : (
                  <GraduationCap className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                  <h3 className="font-mono text-sm font-bold text-primary">{e.center}</h3>
                  <span className="font-mono text-[11px] text-muted-foreground">{e.period}</span>
                </div>
                <p className="mt-1 font-mono text-[13px] leading-relaxed text-foreground/80">{e.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}