import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { Plus, Pencil, Trash2, X, Save, RotateCw, AlertTriangle } from "lucide-react";
import ImageField from "./ImageField";

// Manager CRUD genérico estilo terminal. Recibe la entidad y la config de campos.
export default function AdminManager({ entityName, fields, title, code }) {
  const imageKey = fields.find((f) => f.type === "image")?.key;
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await base44.entities[entityName].list("order", 200);
      setRecords(data);
    } catch (e) {
      setError(e.message || "Error al cargar");
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const startNew = () => {
    const blank = {};
    fields.forEach((f) => {
      blank[f.key] = f.array ? [] : f.type === "number" ? 0 : "";
    });
    blank.order = records.length;
    setEditing(blank);
  };

  const startEdit = (rec) => setEditing({ ...rec });

  const cancel = () => {
    setEditing(null);
    setError("");
  };

  const save = async () => {
    setSaving(true);
    setError("");
    try {
      const payload = { ...editing };
      delete payload.id;
      delete payload.created_date;
      delete payload.updated_date;
      delete payload.created_by_id;
      delete payload.created_by;
      if (editing.id) {
        await base44.entities[entityName].update(editing.id, payload);
      } else {
        await base44.entities[entityName].create(payload);
      }
      setEditing(null);
      await load();
    } catch (e) {
      setError(e.message || "Error al guardar");
    }
    setSaving(false);
  };

  const remove = async (rec) => {
    const label = rec[fields[0].key] || "este registro";
    if (!window.confirm(`¿Eliminar "${label}"?`)) return;
    try {
      await base44.entities[entityName].delete(rec.id);
      await load();
    } catch (e) {
      setError(e.message || "Error al eliminar");
    }
  };

  const setField = (key, value) => setEditing((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="font-mono text-xs text-primary">[{code}]</div>
          <h3 className="font-mono text-lg font-bold uppercase tracking-widest text-foreground">
            <span className="text-primary">$</span> {title}
          </h3>
        </div>
        {!editing && (
          <button
            onClick={startNew}
            className="inline-flex items-center gap-2 border border-primary bg-primary/10 px-3 py-2 font-mono text-xs text-primary transition hover:bg-primary hover:text-primary-foreground"
          >
            <Plus className="h-3.5 w-3.5" /> new
          </button>
        )}
      </div>

      {error && (
        <div className="flex items-center gap-2 border border-destructive bg-destructive/10 p-2 font-mono text-xs text-destructive">
          <AlertTriangle className="h-3.5 w-3.5" /> {error}
        </div>
      )}

      {editing && (
        <div className="border border-primary/50 border-glow bg-card/60 p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="font-mono text-xs text-primary">
              {editing.id ? "// edit record" : "// new record"}
            </span>
            <button onClick={cancel} className="text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {fields.map((f) => (
              <div key={f.key} className={f.full ? "sm:col-span-2" : ""}>
                <label className="mb-1 block font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  {f.label}
                </label>
                {f.type === "textarea" ? (
                  <textarea
                    value={f.array ? (editing[f.key] || []).join("\n") : editing[f.key] || ""}
                    onChange={(e) =>
                      setField(f.key, f.array ? e.target.value.split("\n").filter((l) => l !== "") : e.target.value)
                    }
                    rows={f.array ? 5 : 3}
                    placeholder={f.array ? "Una línea por elemento" : ""}
                    className="w-full border border-border bg-background px-3 py-2 font-mono text-xs text-foreground focus:border-primary focus:outline-none"
                  />
                ) : f.type === "image" ? (
                  <ImageField value={editing[f.key]} onChange={(v) => setField(f.key, v)} />
                ) : (
                  <input
                    type={f.type === "number" ? "number" : "text"}
                    value={editing[f.key] ?? ""}
                    onChange={(e) =>
                      setField(f.key, f.type === "number" ? Number(e.target.value) : e.target.value)
                    }
                    className="w-full border border-border bg-background px-3 py-2 font-mono text-xs text-foreground focus:border-primary focus:outline-none"
                  />
                )}
              </div>
            ))}
          </div>
          <div className="mt-4 flex gap-2">
            <button
              onClick={save}
              disabled={saving}
              className="inline-flex items-center gap-2 border border-primary bg-primary/10 px-4 py-2 font-mono text-xs text-primary transition hover:bg-primary hover:text-primary-foreground disabled:opacity-50"
            >
              <Save className="h-3.5 w-3.5" /> {saving ? "saving..." : "save"}
            </button>
            <button
              onClick={cancel}
              className="inline-flex items-center gap-2 border border-border px-4 py-2 font-mono text-xs text-muted-foreground transition hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" /> cancel
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
          <RotateCw className="h-3.5 w-3.5 animate-spin text-primary" /> loading records...
        </div>
      ) : (
        <div className="space-y-2">
          {records.length === 0 && (
            <div className="border border-dashed border-border p-4 text-center font-mono text-xs text-muted-foreground">
              // no records — press [new] to add
            </div>
          )}
          {records.map((rec) => (
            <div
              key={rec.id}
              className="flex items-center gap-3 border border-border bg-card/40 p-3 transition hover:border-primary/40"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-border bg-secondary/50 p-1 overflow-hidden">
                {imageKey && rec[imageKey] ? (
                  <img src={rec[imageKey]} alt="" className="h-full w-full object-contain" />
                ) : (
                  <span className="font-mono text-[8px] font-bold text-muted-foreground">
                    {(rec.logoText || rec[fields[0].key] || "?").slice(0, 6)}
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="truncate font-mono text-sm font-bold text-foreground">
                  {rec[fields[0].key]}
                </div>
                <div className="truncate font-mono text-[11px] text-muted-foreground">
                  {fields.slice(1).filter((f) => !["logoText", "order"].includes(f.key) && f.type !== "image").map((f) => rec[f.key]).filter(Boolean).join(" · ")}
                </div>
              </div>
              <button
                onClick={() => startEdit(rec)}
                className="p-1.5 text-muted-foreground transition hover:text-primary"
              >
                <Pencil className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => remove(rec)}
                className="p-1.5 text-muted-foreground transition hover:text-destructive"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}