import React from "react";
import { motion } from "framer-motion";
import { Award, ShieldCheck } from "lucide-react";
import { SectionHeader } from "./ExperienceTimeline";
import { ui } from "@/data/i18n";

// Expositor de insignias (badges) ganadas en cursos y certificaciones.
// Presentadas como medallas grandes con anillo giratorio y halo luminoso.
export default function BadgesShowcase({ badges = [], lang = "es" }) {
  const t = ui[lang];
  if (!badges.length) return null;

  return (
    <section id="badges" className="relative px-4 py-20">
      <div className="mx-auto max-w-5xl">
        <SectionHeader code="BADGE.EARN" title="badges.db" comment={t.badgeComment} />

        <div className="mt-4 flex items-center gap-2 font-mono text-[11px] text-muted-foreground">
          <span className="text-primary">[ {badges.length} ]</span> {t.badgeUnlocked}
        </div>

        <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {badges.map((b, idx) => (
            <motion.div
              key={b.id || b.name}
              initial={{ opacity: 0, scale: 0.85, y: 16 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08, type: "spring", stiffness: 120, damping: 14 }}
              className="group relative flex flex-col items-center overflow-hidden border border-border bg-gradient-to-b from-card/70 to-card/20 px-5 py-8 text-center transition-colors hover:border-primary"
            >
              {/* halo de fondo */}
              <div className="pointer-events-none absolute -top-12 h-44 w-44 rounded-full bg-primary/15 blur-3xl transition-colors duration-500 group-hover:bg-primary/25" />

              <div className="relative flex h-32 w-32 items-center justify-center sm:h-40 sm:w-40">
                {/* anillo giratorio */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 14, ease: "linear" }}
                  className="absolute inset-0 rounded-full opacity-70"
                  style={{
                    background:
                      "conic-gradient(from 0deg, transparent 0deg, rgba(0,255,0,0.55) 90deg, transparent 180deg, rgba(0,255,0,0.18) 270deg, transparent 360deg)",
                  }}
                />
                {/* aro interior: recorta el centro dejando visible el anillo */}
                <div className="absolute inset-[4px] rounded-full border border-primary/25 bg-background" />

                <motion.div
                  animate={{
                    boxShadow: [
                      "0 0 22px rgba(0,255,0,0.20)",
                      "0 0 44px rgba(0,255,0,0.45)",
                      "0 0 22px rgba(0,255,0,0.20)",
                    ],
                  }}
                  transition={{ repeat: Infinity, duration: 3.4, delay: idx * 0.35, ease: "easeInOut" }}
                  className="relative flex h-[calc(100%-20px)] w-[calc(100%-20px)] items-center justify-center rounded-full bg-secondary/40 p-4"
                >
                  {b.imageUrl ? (
                    <img
                      src={b.imageUrl}
                      alt={b.name}
                      className="h-full w-full object-contain drop-shadow-[0_0_12px_rgba(0,255,0,0.35)]"
                    />
                  ) : (
                    <Award className="h-14 w-14 text-primary" />
                  )}
                </motion.div>
              </div>

              <div className="relative mt-5">
                <div className="font-mono text-base font-bold uppercase tracking-wider text-foreground text-glow">
                  {b.name}
                </div>
                {b.issuer && (
                  <div className="mx-auto mt-2 inline-flex items-center gap-1.5 border border-primary/40 bg-primary/5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-primary">
                    <ShieldCheck className="h-3 w-3" /> {b.issuer}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}