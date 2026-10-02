import React, { useRef, useState } from "react";
import { base44 } from "@/api/base44Client";
import { Upload, X, RotateCw } from "lucide-react";

// Campo de imagen para el panel admin: permite subir una foto desde el equipo
// o pegar una URL. Devuelve la URL final (pública) del archivo.
export default function ImageField({ value, onChange }) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const { file_url } = await base44.integrations.Core.UploadPublicFile({ file });
      onChange(file_url);
    } catch (err) {
      setError(err.message || "Error al subir la imagen");
    }
    setUploading(false);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="flex items-start gap-3">
      <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden border border-border bg-secondary/50 p-1">
        {value ? (
          <img src={value} alt="" className="h-full w-full object-contain" />
        ) : (
          <span className="font-mono text-[9px] text-muted-foreground">no img</span>
        )}
      </div>

      <div className="flex-1 space-y-1.5">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="inline-flex items-center gap-1.5 border border-primary bg-primary/10 px-3 py-1.5 font-mono text-[11px] text-primary transition hover:bg-primary hover:text-primary-foreground disabled:opacity-50"
          >
            {uploading ? <RotateCw className="h-3 w-3 animate-spin" /> : <Upload className="h-3 w-3" />}
            {uploading ? "subiendo..." : "subir imagen"}
          </button>
          {value && (
            <button
              type="button"
              onClick={() => onChange("")}
              className="inline-flex items-center gap-1.5 border border-border px-3 py-1.5 font-mono text-[11px] text-muted-foreground transition hover:border-destructive hover:text-destructive"
            >
              <X className="h-3 w-3" /> quitar
            </button>
          )}
        </div>

        <input
          type="text"
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="o pega una URL"
          className="w-full border border-border bg-background px-3 py-1.5 font-mono text-[11px] text-foreground focus:border-primary focus:outline-none"
        />
        {error && <p className="font-mono text-[10px] text-destructive">{error}</p>}
      </div>

      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
    </div>
  );
}