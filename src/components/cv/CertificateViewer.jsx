import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { X, ShieldCheck, ExternalLink, Download } from "lucide-react";
import { Image } from "@/components/ui/image";
import { ui } from "@/data/i18n";

// Visor modal estilo terminal que muestra la imagen del certificado a tamaño completo.
export default function CertificateViewer({ cert, onClose, lang = "es" }) {
  const t = ui[lang];

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!cert) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="relative max-h-[92vh] w-full max-w-4xl overflow-auto border border-primary/40 border-glow bg-card"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Barra superior estilo terminal */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-background/95 px-4 py-2.5 backdrop-blur">
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
            <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
            <span className="h-3 w-3 rounded-full bg-[#28C840]" />
            <span className="ml-3 text-primary">[ CERT.VIEW ]</span>
            <span className="hidden text-muted-foreground sm:inline">{cert.name}</span>
          </div>
          <div className="flex items-center gap-2">
            {cert.certificateImageUrl && (
              <a
                href={cert.certificateImageUrl}
                download={`${cert.name || "certificate"}.jpg`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 border border-border px-2.5 py-1 font-mono text-[11px] text-muted-foreground transition hover:border-primary hover:text-primary"
              >
                <Download className="h-3 w-3" /> save
              </a>
            )}
            <button
              onClick={onClose}
              className="inline-flex items-center gap-1.5 border border-border px-2.5 py-1 font-mono text-[11px] text-muted-foreground transition hover:border-destructive hover:text-destructive"
            >
              <X className="h-3 w-3" /> close
            </button>
          </div>
        </div>

        {/* Imagen del certificado */}
        <div className="flex items-center justify-center bg-[#0c0c0e] p-4 sm:p-8">
          {cert.certificateImageUrl ? (
            <Image
              src={cert.certificateImageUrl}
              alt={cert.name}
              fittingType="fit"
              className="max-h-[75vh] w-auto max-w-full border border-border/50 shadow-2xl"
            />
          ) : (
            <div className="flex h-64 flex-col items-center justify-center border border-dashed border-border p-12 text-center">
              <ShieldCheck className="h-8 w-8 text-muted-foreground" />
              <p className="mt-3 font-mono text-xs text-muted-foreground">
                // no certificate image attached
              </p>
            </div>
          )}
        </div>

        {/* Metadatos del certificado */}
        <div className="border-t border-border bg-background/95 px-4 py-3 backdrop-blur">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-1 font-mono text-[11px]">
            <span className="text-primary">{cert.tag}</span>
            <span className="text-foreground">{cert.name}</span>
            {cert.issuer && (
              <span className="text-muted-foreground">
                {t.certIssuer}: <span className="text-foreground">{cert.issuer}</span>
              </span>
            )}
            <span className="flex items-center gap-1 text-primary">
              <ShieldCheck className="h-3 w-3" /> {t.certVerified}
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}