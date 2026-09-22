import React from "react";
import { motion } from "framer-motion";
import { Cpu, Wrench, Monitor, Languages as LangIcon } from "lucide-react";
import { skills as defaultSkills, languages as defaultLanguages } from "@/data/cvData";
import { ui } from "@/data/i18n";
import { SectionHeader } from "./ExperienceTimeline";
import VendorLogos from "./VendorLogos";

const ICONS = {
  Software: Cpu,
  Hardware: Wrench,
  "Sistemas operativos": Monitor,
};

export default function SkillsPanel({ skills, languages, vendors, lang = "es" }) {
  const sk = skills && Object.keys(skills).length ? skills : defaultSkills;
  const langs = languages && languages.length ? languages : defaultLanguages;
  const t = ui[lang];
  return (
    <section id="skills" className="relative px-4 py-16">
      <div className="mx-auto max-w-5xl">
        <SectionHeader code="SYS.ENV" title="skills.cfg" comment={t.skillsComment} />

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {Object.entries(sk).map(([cat, items], idx) => {
            const Icon = ICONS[cat] || Cpu;
            return (
              <motion.div
                key={cat}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.06 }}
                className="border border-border bg-card/40 p-5 transition-colors hover:border-primary/40"
              >
                <div className="flex items-center gap-2 border-b border-border pb-3">
                  <Icon className="h-4 w-4 text-primary" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-foreground">{cat}</span>
                </div>
                <ul className="mt-3 space-y-1.5">
                  {items.map((s) => (
                    <li key={s} className="flex items-center gap-2 font-mono text-[13px] text-foreground/80">
                      <span className="text-primary">›</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        <VendorLogos vendors={vendors} />

        {/* Idiomas como barras de progreso estilo diagnóstico */}
        <div className="mt-8 border border-border bg-card/40 p-5">
          <div className="flex items-center gap-2 border-b border-border pb-3">
            <LangIcon className="h-4 w-4 text-primary" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-foreground">{t.langsLabel}</span>
          </div>
          <div className="mt-4 space-y-4">
            {langs.map((l, idx) => (
              <div key={l.name}>
                <div className="flex items-baseline justify-between font-mono text-xs">
                  <span className="text-foreground">{l.name}</span>
                  <span className="text-muted-foreground">{l.level} · {l.pct}%</span>
                </div>
                <div className="mt-1.5 h-1.5 w-full bg-secondary">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${l.pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: idx * 0.1, ease: "easeOut" }}
                    className="h-full bg-primary"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}