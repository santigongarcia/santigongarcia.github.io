import React from "react";
import { motion } from "framer-motion";
import { Server } from "lucide-react";
import { Image } from "@/components/ui/image";
import { vendors } from "@/data/cvData";
import { SectionHeader } from "./ExperienceTimeline";

// Sección de fabricantes de equipos de red y telecomunicaciones soportados.
// Renderiza tiles estilo terminal con el nombre del fabricante (logo textual).
export default function VendorLogos() {
  return (
    <div className="mt-8 border border-border bg-card/40 p-5">
      <div className="flex items-center gap-2 border-b border-border pb-3">
        <Server className="h-4 w-4 text-primary" />
        <span className="font-mono text-xs font-bold uppercase tracking-wider text-foreground">
          vendors — hardware partners
        </span>
      </div>
      <p className="mt-3 font-mono text-[11px] text-muted-foreground">
        // fabricantes de equipos de red y telecomunicaciones soportados
      </p>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5">
        {vendors.map((v, idx) => (
          <motion.div
            key={v}
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.25, delay: idx * 0.03 }}
            className="group flex h-16 items-center justify-center border border-border bg-secondary/30 px-2 text-center transition-colors hover:border-primary hover:bg-primary/5"
          >
            {v.logoUrl ? (
              <Image
                src={v.logoUrl}
                alt={v.name}
                fittingType="fit"
                className="h-10 w-20 object-contain opacity-80 transition-opacity group-hover:opacity-100"
              />
            ) : (
              <span className="font-mono text-xs font-semibold uppercase tracking-wide text-foreground/70 transition-colors group-hover:text-primary">
                {v.name}
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}