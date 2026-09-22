import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Terminal, LogOut, ArrowLeft, ShieldAlert, RotateCw } from "lucide-react";
import AdminManager from "@/components/admin/AdminManager";

const TABS = [
  { key: "profile", label: "profile.cfg", entity: "Profile", code: "USER.INFO", fields: [
    { key: "name", label: "Nombre", full: true },
    { key: "role", label: "Puesto" },
    { key: "currentRole", label: "Puesto actual", full: true },
    { key: "location", label: "Ubicación", full: true },
    { key: "summary", label: "Resumen", type: "textarea", full: true },
    { key: "email", label: "Email" },
    { key: "linkedin", label: "LinkedIn URL", full: true },
    { key: "linkedinHandle", label: "Handle LinkedIn" },
    { key: "avatar", label: "URL del avatar", full: true },
    { key: "order", label: "Orden", type: "number" },
  ]},
  { key: "experience", label: "experience.log", entity: "Experience", code: "EXP.LOAD", fields: [
    { key: "company", label: "Empresa" },
    { key: "role", label: "Puesto" },
    { key: "period", label: "Periodo" },
    { key: "duration", label: "Duración" },
    { key: "location", label: "Ubicación" },
    { key: "points", label: "Logros (una línea por item)", type: "textarea", array: true, full: true },
    { key: "logoUrl", label: "URL del logo", full: true },
    { key: "logoText", label: "Texto alternativo del logo" },
    { key: "order", label: "Orden", type: "number" },
  ]},
  { key: "certification", label: "certs.db", entity: "Certification", code: "CERT.VALID", fields: [
    { key: "name", label: "Nombre", full: true },
    { key: "issuer", label: "Entidad emisora" },
    { key: "tag", label: "Etiqueta" },
    { key: "logoUrl", label: "URL del logo", full: true },
    { key: "certificateImageUrl", label: "URL de la imagen del certificado", full: true },
    { key: "order", label: "Orden", type: "number" },
  ]},
  { key: "education", label: "education.log", entity: "Education", code: "EDU.PATH", fields: [
    { key: "center", label: "Centro" },
    { key: "title", label: "Titulación", full: true },
    { key: "period", label: "Periodo" },
    { key: "logoUrl", label: "URL del logo", full: true },
    { key: "order", label: "Orden", type: "number" },
  ]},
  { key: "skill", label: "skills.cfg", entity: "Skill", code: "SYS.ENV", fields: [
    { key: "category", label: "Categoría" },
    { key: "items", label: "Habilidades (una línea por item)", type: "textarea", array: true, full: true },
    { key: "order", label: "Orden", type: "number" },
  ]},
  { key: "vendor", label: "vendors.cfg", entity: "Vendor", code: "HW.VENDORS", fields: [
    { key: "name", label: "Fabricante" },
    { key: "logoUrl", label: "URL del logo", full: true },
    { key: "order", label: "Orden", type: "number" },
  ]},
  { key: "language", label: "languages.locale", entity: "Language", code: "LANG.DUMP", fields: [
    { key: "name", label: "Idioma" },
    { key: "level", label: "Nivel" },
    { key: "pct", label: "Porcentaje", type: "number" },
    { key: "order", label: "Orden", type: "number" },
  ]},
];

export default function Admin() {
  const [tab, setTab] = useState("profile");
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    base44.auth.me()
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setChecking(false));
  }, []);

  const handleLogout = async () => {
    await base44.auth.logout();
    window.location.href = "/";
  };

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex items-center gap-2 font-mono text-sm text-muted-foreground">
          <RotateCw className="h-4 w-4 animate-spin text-primary" /> auth check...
        </div>
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="max-w-md border border-destructive/50 bg-card/40 p-8 text-center">
          <ShieldAlert className="mx-auto h-10 w-10 text-destructive" />
          <h1 className="mt-4 font-mono text-xl font-bold uppercase text-foreground">ACCESS DENIED</h1>
          <p className="mt-2 font-mono text-xs text-muted-foreground">
            // permiso denegado — se requiere rol <span className="text-destructive">admin</span>
          </p>
          <p className="mt-1 font-mono text-[11px] text-muted-foreground">
            {user ? `tu rol actual: ${user.role}` : "no autenticado"}
          </p>
          <Link
            to="/"
            className="mt-5 inline-flex items-center gap-2 border border-border px-4 py-2 font-mono text-xs text-foreground transition hover:border-primary hover:text-primary"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> volver al cv
          </Link>
        </div>
      </div>
    );
  }

  const active = TABS.find((t) => t.key === tab);

  return (
    <div className="min-h-screen scanlines bg-background">
      <div className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-2.5">
          <div className="flex items-center gap-2 font-mono text-xs">
            <Terminal className="h-4 w-4 text-primary" />
            <span className="text-primary">santiago@gonzalez</span>
            <span className="text-muted-foreground">:</span>
            <span className="text-primary">/admin</span>
            <span className="text-muted-foreground">$</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground transition hover:text-primary"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> cv
            </Link>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground transition hover:text-destructive"
            >
              <LogOut className="h-3.5 w-3.5" /> logout
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-8">
        <div className="mb-6">
          <div className="font-mono text-xs text-primary">[ ADMIN.SHELL ] — root_user authenticated</div>
          <h1 className="mt-1 font-mono text-2xl font-bold uppercase tracking-widest text-foreground">
            <span className="text-primary">$</span> control panel
          </h1>
          <p className="mt-1 font-mono text-xs text-muted-foreground">
            // edita, añade o elimina registros del cv — los cambios se reflejan al instante
          </p>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`border px-4 py-2 font-mono text-xs transition ${
                tab === t.key
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <AdminManager
          key={active.key}
          entityName={active.entity}
          fields={active.fields}
          title={active.label}
          code={active.code}
        />
      </div>
    </div>
  );
}