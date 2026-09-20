import React from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar } from "lucide-react";
import { Image } from "@/components/ui/image";

// Línea de tiempo vertical estilo cable de red. Los logos son cajas de marca
// en zinc monocromo que pasan a cyan al hacer hover (efecto "port scan").
function LogoBlock({ logoUrl, logoText, idx }) {
  return (
    <div className="glitch-hover relative shrink-0">
      <div className="flex h-16 w-16 items-center justify-center border border-border bg-secondary/60 p-1.5 transition-all duration-300 group-hover:border-primary group-hover:bg-primary/5">
        {logoUrl ? (
          <Image
            src={logoUrl}
            alt={logoText || ""}
            fittingType="fit"
            className="h-full w-full transition-opacity duration-300"
          />
        ) : (
          <div className="glitch-layer flex h-full w-full items-center justify-center text-center font-mono text-[9px] font-bold leading-tight text-muted-foreground transition-colors duration-300 group-hover:text-primary group-hover:text-glow">
            {logoText || "N/A"}
          </div>
        )}
      </div>
      <span className="absolute -left-7 top-1 hidden font-mono text-[10px] text-muted-foreground/60 sm:block">
        0x{String(idx + 1).padStart(2, "0")}
      </span>
    </div>
  );
}

export default function ExperienceTimeline({ experience = [] }) {
  return (
    <section id="experience" className="relative px-4 py-16">
      <div className="mx-auto max-w-5xl">
        <SectionHeader code="EXP.LOAD" title="experience.log" comment="// topología de experiencia profesional" />

        <div className="relative mt-10 pl-2 sm:pl-10">
          {/* cable de red vertical */}
          <div className="absolute left-[3.5rem] top-0 hidden h-full w-px bg-gradient-to-b from-primary/60 via-border to-transparent sm:block" />

          <div className="space-y-10">
            {experience.map((job, idx) => (
              <motion.div
                key={job.id || idx}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.4, delay: idx * 0.04 }}
                className="group relative"
              >
                <div className="flex gap-5">
                  <LogoBlock logoUrl={job.logoUrl} logoText={job.logoText} idx={idx} />
                  <div className="flex-1 border-l border-border pl-5 transition-colors group-hover:border-primary/40">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                      <h3 className="font-mono text-base font-bold text-foreground transition-colors group-hover:text-primary">
                        {job.role}
                      </h3>
                      <span className="flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {job.period}
                      </span>
                    </div>
                    <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs">
                      <span className="text-primary">{job.company}</span>
                      <span className="text-border">·</span>
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {job.location}
                      </span>
                      <span className="text-border">·</span>
                      <span className="text-muted-foreground">{job.duration}</span>
                    </div>
                    <ul className="mt-3 space-y-1.5">
                      {(job.points || []).map((p, i) => (
                        <li key={i} className="flex gap-2 font-mono text-[13px] leading-relaxed text-foreground/80">
                          <span className="mt-1.5 h-1 w-1 shrink-0 bg-primary" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function SectionHeader({ code, title, comment }) {
  return (
    <div className="space-y-1">
      <div className="font-mono text-xs text-primary">
        [{code}] <span className="text-muted-foreground">— {comment}</span>
      </div>
      <h2 className="font-mono text-xl font-bold uppercase tracking-widest text-foreground sm:text-2xl">
        <span className="text-primary">$</span> {title}
      </h2>
    </div>
  );
}