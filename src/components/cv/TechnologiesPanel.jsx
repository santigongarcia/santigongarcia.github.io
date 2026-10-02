import React from "react";
import { motion } from "framer-motion";
import { Terminal } from "lucide-react";
import { Image } from "@/components/ui/image";

// Sección de tecnologías y sistemas soportados (Windows, Windows Server, Linux, Docker...).
// Renderiza tiles estilo terminal con logo o nombre.
export default function TechnologiesPanel({ technologies = [] }) {
  return (
    <div className="mt-4 border border-border bg-card/40 p-5">
      <div className="flex items-center gap-2 border-b border-border pb-3">
        <Terminal className="h-4 w-4 text-primary" />
        <span className="font-mono text-xs font-bold uppercase tracking-wider text-foreground">
          technologies — stack
        </span>
      </div>
      <p className="mt-3 font-mono text-[11px] text-muted-foreground">
        // tecnologías y sistemas con los que trabajo
      </p>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
        {technologies.map((tech, idx) => (
          <motion.div
            key={tech.id || tech.name}
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.25, delay: idx * 0.03 }}
            className="group flex h-16 items-center justify-center border border-border bg-secondary/30 px-2 text-center transition-colors hover:border-primary hover:bg-primary/5"
          >
            {tech.logoUrl ? (
              <Image
                src={tech.logoUrl}
                alt={tech.name}
                fittingType="fit"
                className="h-10 w-20 object-contain opacity-80 transition-opacity group-hover:opacity-100"
              />
            ) : (
              <span className="font-mono text-xs font-semibold uppercase tracking-wide text-foreground/70 transition-colors group-hover:text-primary">
                {tech.name}
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}