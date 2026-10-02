import React from "react";
import { Award } from "lucide-react";

// Insignias en miniatura estilo "placas" de perfil: pequeñas, en fila junto al avatar.
export default function BadgePlaques({ badges = [] }) {
  if (!badges.length) return null;

  return (
    <div className="flex max-w-[260px] flex-wrap gap-1.5">
      {badges.map((b) => (
        <div
          key={b.id || b.name}
          title={b.issuer ? `${b.name} · ${b.issuer}` : b.name}
          className="flex h-11 w-11 items-center justify-center overflow-hidden border border-primary/40 bg-secondary/40 p-0.5 transition hover:scale-105 hover:border-primary hover:border-glow"
        >
          {b.imageUrl ? (
            <img src={b.imageUrl} alt={b.name} className="h-full w-full object-contain" />
          ) : (
            <Award className="h-5 w-5 text-primary" />
          )}
        </div>
      ))}
    </div>
  );
}