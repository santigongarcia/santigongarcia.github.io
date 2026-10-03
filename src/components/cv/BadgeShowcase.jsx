import React, { useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import CertificateViewer from "./CertificateViewer";

export const SHOWCASE_SLOTS = 32; // vitrina 8 x 4

// Vitrina de medallas: rejilla 8x4 (hasta 32 insignias), solo la imagen de cada badge.
// Al pulsar una insignia con certificado adjunto se abre en el visor modal.
export default function BadgeShowcase({ badges = [], lang = "es" }) {
  const [viewing, setViewing] = useState(null);
  const slots = Array.from({ length: SHOWCASE_SLOTS }, (_, i) => badges[i] || null);

  return (
    <>
      <div className="relative w-full max-w-[460px] border border-border/70 bg-background/50 p-1.5 border-glow sm:max-w-[520px] sm:p-2">
        <div className="grid grid-cols-8 gap-1 sm:gap-1.5">
          {slots.map((b, i) => {
            if (!b) {
              return <div key={`slot-${i}`} className="aspect-square bg-secondary/10" />;
            }

            const canView = Boolean(b.certificateImageUrl);
            const Wrapper = canView ? "button" : "div";

            return (
              <motion.div
                key={b.id || b.name}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: Math.min(i * 0.03, 0.5) }}
                className="aspect-square"
              >
                <Wrapper
                  type={canView ? "button" : undefined}
                  onClick={canView ? () => setViewing(b) : undefined}
                  title={b.issuer ? `${b.name} · ${b.issuer}` : b.name}
                  className={`group flex h-full w-full items-center justify-center ${
                    canView ? "cursor-pointer" : ""
                  }`}
                >
                  {b.imageUrl ? (
                    <img
                      src={b.imageUrl}
                      alt={b.name}
                      className="h-full w-full object-contain drop-shadow-[0_0_5px_rgba(0,255,0,0.3)] transition duration-200 group-hover:scale-110"
                    />
                  ) : (
                    <span className="font-mono text-[10px] uppercase text-primary">
                      {b.name.slice(0, 2)}
                    </span>
                  )}
                </Wrapper>
              </motion.div>
            );
          })}
        </div>
      </div>

      {viewing &&
        createPortal(
          <CertificateViewer
            cert={{ ...viewing, tag: viewing.tag || "BADGE.EARN" }}
            onClose={() => setViewing(null)}
            lang={lang}
          />,
          document.body
        )}
    </>
  );
}