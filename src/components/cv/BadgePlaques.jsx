import React, { useState } from "react";
import { createPortal } from "react-dom";
import { Award } from "lucide-react";
import CertificateViewer from "./CertificateViewer";

// Insignias en miniatura estilo "placas" de perfil: pequeñas, en fila junto al avatar.
// Si la insignia tiene certificado adjunto, al pulsarla se abre en el visor modal.
export default function BadgePlaques({ badges = [], lang = "es" }) {
  const [viewing, setViewing] = useState(null);

  if (!badges.length) return null;

  return (
    <>
      <div className="flex max-w-[260px] flex-wrap gap-1.5">
        {badges.map((b) => {
          const canView = Boolean(b.certificateImageUrl);
          const Wrapper = canView ? "button" : "div";

          return (
            <Wrapper
              key={b.id || b.name}
              type={canView ? "button" : undefined}
              onClick={canView ? () => setViewing(b) : undefined}
              title={b.issuer ? `${b.name} · ${b.issuer}` : b.name}
              className={`flex h-11 w-11 items-center justify-center overflow-hidden border border-primary/40 bg-secondary/40 p-0.5 transition hover:scale-105 hover:border-primary hover:border-glow ${
                canView ? "cursor-pointer" : ""
              }`}
            >
              {b.imageUrl ? (
                <img src={b.imageUrl} alt={b.name} className="h-full w-full object-contain" />
              ) : (
                <Award className="h-5 w-5 text-primary" />
              )}
            </Wrapper>
          );
        })}
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