import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Lock, ChevronRight, Eye } from "lucide-react";
import { Image } from "@/components/ui/image";
import { SectionHeader } from "./ExperienceTimeline";
import { ui } from "@/data/i18n";
import CertificateViewer from "./CertificateViewer";

// Certificaciones presentadas como "secure tokens" con checksum verificado.
// Al hacer clic se "descifran" los detalles.
function checksum(name) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return h.toString(16).padStart(8, "0").toUpperCase();
}

export default function CertificationsGrid({ certifications = [], lang = "es" }) {
  const [open, setOpen] = useState(0);
  const [viewing, setViewing] = useState(null);
  const t = ui[lang];

  return (
    <section id="certs" className="relative px-4 py-16">
      <div className="mx-auto max-w-5xl">
        <SectionHeader code="CERT.VALID" title="certs.db" comment={t.certComment} />

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {certifications.map((c, idx) => {
            const active = open === idx;
            return (
              <motion.div
                key={c.id || idx}
                onClick={() => setOpen(active ? -1 : idx)}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className={`group relative cursor-pointer overflow-hidden border bg-card/40 p-4 text-left transition-all ${
                  active ? "border-primary border-glow" : "border-border hover:border-primary/50"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center border transition-colors overflow-hidden p-0.5 ${
                        active ? "border-primary bg-primary/10" : "border-border bg-secondary/50 group-hover:border-primary/50"
                      }`}
                    >
                      {c.logoUrl ? (
                        <Image src={c.logoUrl} alt="" fittingType="fit" className="h-full w-full" />
                      ) : active ? (
                        <Lock className="h-4 w-4 text-primary" />
                      ) : (
                        <ShieldCheck className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                      )}
                    </div>
                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-wider text-primary">{c.tag}</div>
                      <div className="font-mono text-sm font-bold text-foreground">{c.name}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {c.certificateImageUrl && (
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setViewing(c); }}
                        className="inline-flex items-center gap-1 border border-border px-2 py-0.5 font-mono text-[10px] text-muted-foreground transition hover:border-primary hover:text-primary"
                      >
                        <Eye className="h-3 w-3" /> view
                      </button>
                    )}
                    <ChevronRight
                      className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${active ? "rotate-90 text-primary" : ""}`}
                    />
                  </div>
                </div>

                <AnimatePresence>
                  {active && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-3 border-t border-border pt-3 font-mono text-xs text-muted-foreground">
                        <div className="text-primary">[ DECRYPT ]</div>
                        <div className="mt-1">{t.certIssuer}: <span className="text-foreground">{c.issuer}</span></div>
                        <div className="mt-1 flex items-center gap-1.5">
                          <span>{t.certChecksum}:</span>
                          <span className="text-primary">{checksum(c.name)}</span>
                          <ShieldCheck className="h-3 w-3 text-primary" />
                          <span className="text-primary">{t.certVerified}</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>

      {viewing && (
        <CertificateViewer cert={viewing} onClose={() => setViewing(null)} lang={lang} />
      )}
    </section>
  );
}