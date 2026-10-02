import React from "react";
import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { SectionHeader } from "./ExperienceTimeline";
import { ui } from "@/data/i18n";

// Expositor de insignias (badges) ganadas en cursos y certificaciones.
// Cada badge se muestra como una medalla con su imagen y el emisor.
export default function BadgesShowcase({ badges = [], lang = "es" }) {
  const t = ui[lang];
  if (!badges.length) return null;

  return (
    <section id="badges" className="relative px-4 py-16">
      <div className="mx-auto max-w-5xl">
        <SectionHeader code="BADGE.EARN" title="badges.db" comment={t.badgeComment} />

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {badges.map((b, idx) => (
            <motion.div
              key={b.id || b.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="group flex flex-col items-center border border-border bg-card/40 p-4 text-center transition-colors hover:border-primary hover:border-glow"
            >
              <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-secondary/30 p-2 transition-colors group-hover:border-primary">
                {b.imageUrl ? (
                  <img src={b.imageUrl} alt={b.name} className="h-full w-full object-contain" />
                ) : (
                  <Award className="h-10 w-10 text-primary" />
                )}
              </div>
              <div className="mt-3 font-mono text-sm font-bold text-foreground">{b.name}</div>
              {b.issuer && (
                <div className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-primary">
                  {b.issuer}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}