import React, { useState } from "react";
import { Mail, Linkedin, FileDown } from "lucide-react";
import { profile as defaultProfile, skills as defaultSkills, languages as defaultLanguages } from "@/data/cvData";
import { ui } from "@/data/i18n";

// Genera un PDF del CV con estética terminal (fondo oscuro, mono, verde).
export default function DownloadCV({ experience = [], education = [], certifications = [], profile: profileProp, skills: skillsProp, languages: languagesProp, lang = "es" }) {
  const [progress, setProgress] = useState(0);
  const [exporting, setExporting] = useState(false);

  const rawProfile = profileProp || defaultProfile;
  const profile = {
    ...rawProfile,
    contact: rawProfile.contact || {
      email: rawProfile.email,
      linkedin: rawProfile.linkedin,
      linkedinHandle: rawProfile.linkedinHandle,
    },
  };
  const skills = skillsProp && Object.keys(skillsProp).length ? skillsProp : defaultSkills;
  const languages = languagesProp && languagesProp.length ? languagesProp : defaultLanguages;
  const t = ui[lang];

  const handleDownload = async () => {
    if (exporting) return;
    setExporting(true);
    setProgress(0);

    // barra de progreso simulada estilo STDOUT
    const prog = setInterval(() => {
      setProgress((p) => Math.min(p + Math.random() * 18, 100));
    }, 120);

    // import dinámico para no penalizar el bundle inicial
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const W = doc.internal.pageSize.getWidth();
    const H = doc.internal.pageSize.getHeight();
    const M = 40;

    // fondo oscuro
    doc.setFillColor(10, 10, 12);
    doc.rect(0, 0, W, H, "F");

    const mono = "courier";
    let y = M;

    // cabecera
    doc.setTextColor(0, 255, 0);
    doc.setFont(mono, "bold");
    doc.setFontSize(20);
    doc.text(profile.name || "Santiago Gonzalez Garcia", M, y + 8);
    y += 24;
    doc.setFontSize(9);
    doc.setTextColor(226, 232, 240);
    doc.text(`[ROOT_USER] ${profile.role || "Tecnico de Sistemas y Redes"}`, M, y);
    y += 14;
    doc.setTextColor(113, 113, 122);
    doc.text(`${profile.location}`, M, y);
    y += 16;

    // contacto
    doc.setDrawColor(40, 40, 45);
    doc.line(M, y, W - M, y);
    y += 16;
    doc.setFont(mono, "normal");
    doc.setFontSize(8);
    doc.setTextColor(0, 255, 0);
    doc.text("email:", M, y);
    doc.setTextColor(226, 232, 240);
    doc.text(profile.contact.email, M + 50, y);
    y += 12;
    doc.setTextColor(0, 255, 0);
    doc.text("linkedin:", M, y);
    doc.setTextColor(226, 232, 240);
    doc.text(profile.contact.linkedinHandle, M + 50, y);
    y += 20;

    const section = (title, code) => {
      if (y > H - 120) {
        doc.addPage();
        doc.setFillColor(10, 10, 12);
        doc.rect(0, 0, W, H, "F");
        y = M;
      }
      doc.setFont(mono, "bold");
      doc.setFontSize(11);
      doc.setTextColor(0, 255, 0);
      doc.text(`$ ${title}`, M, y);
      doc.setFont(mono, "normal");
      doc.setFontSize(7);
      doc.setTextColor(113, 113, 122);
      doc.text(`[${code}]`, W - M - 50, y);
      y += 14;
    };

    // experiencia
    section("experience.log", "EXP.LOAD");
    doc.setFont(mono, "normal");
    doc.setFontSize(8);
    experience.forEach((job) => {
      if (y > H - 60) {
        doc.addPage();
        doc.setFillColor(10, 10, 12);
        doc.rect(0, 0, W, H, "F");
        y = M;
      }
      doc.setTextColor(226, 232, 240);
      doc.setFont(mono, "bold");
      doc.text(`${job.role} — ${job.company}`, M, y);
      y += 11;
      doc.setFont(mono, "normal");
      doc.setTextColor(113, 113, 122);
      doc.text(`${job.period} · ${job.duration} · ${job.location}`, M, y);
      y += 12;
      doc.setTextColor(180, 185, 195);
      doc.setFontSize(7.5);
      job.points.forEach((p) => {
        const lines = doc.splitTextToSize(`- ${p}`, W - M * 2 - 10);
        doc.text(lines, M + 6, y);
        y += lines.length * 10;
      });
      doc.setFontSize(8);
      y += 6;
    });

    // certificaciones
    section("certs.db", "CERT.VALID");
    doc.setFontSize(8);
    certifications.forEach((c) => {
      if (y > H - 40) {
        doc.addPage();
        doc.setFillColor(10, 10, 12);
        doc.rect(0, 0, W, H, "F");
        y = M;
      }
      doc.setTextColor(0, 255, 0);
      doc.text(`[${c.tag}]`, M, y);
      doc.setTextColor(226, 232, 240);
      doc.text(c.name, M + 50, y);
      doc.setTextColor(113, 113, 122);
      doc.text(`— ${c.issuer}`, M + 50 + doc.getTextWidth(c.name) + 8, y);
      y += 12;
    });

    // skills
    section("skills.cfg", "SYS.ENV");
    doc.setFontSize(8);
    Object.entries(skills).forEach(([cat, items]) => {
      if (y > H - 40) {
        doc.addPage();
        doc.setFillColor(10, 10, 12);
        doc.rect(0, 0, W, H, "F");
        y = M;
      }
      doc.setTextColor(0, 255, 0);
      doc.setFont(mono, "bold");
      doc.text(cat, M, y);
      y += 11;
      doc.setFont(mono, "normal");
      doc.setTextColor(180, 185, 195);
      doc.text(items.join("  ·  "), M + 6, y);
      y += 14;
    });

    // educación
    section("education.log", "EDU.PATH");
    doc.setFontSize(8);
    education.forEach((e) => {
      if (y > H - 40) {
        doc.addPage();
        doc.setFillColor(10, 10, 12);
        doc.rect(0, 0, W, H, "F");
        y = M;
      }
      doc.setTextColor(0, 255, 0);
      doc.setFont(mono, "bold");
      doc.text(e.center, M, y);
      doc.setFont(mono, "normal");
      doc.setTextColor(113, 113, 122);
      doc.text(e.period, W - M - 80, y);
      y += 11;
      doc.setTextColor(180, 185, 195);
      doc.text(e.title, M + 6, y);
      y += 16;
    });

    // idiomas
    section("languages.locale", "LANG.DUMP");
    doc.setFontSize(8);
    languages.forEach((l) => {
      doc.setTextColor(226, 232, 240);
      doc.text(`${l.name}: ${l.level} (${l.pct}%)`, M, y);
      y += 12;
    });

    doc.save("CV_Santiago_Gonzalez_Garcia.pdf");

    clearInterval(prog);
    setProgress(100);
    setTimeout(() => {
      setExporting(false);
      setProgress(0);
    }, 900);
  };

  const bars = Math.round(progress / 10);

  return (
    <section id="contact" className="relative px-4 py-16">
      <div className="mx-auto max-w-3xl border border-border bg-card/40 p-6 text-center sm:p-10">
        <div className="font-mono text-xs text-primary">{t.sessionEnd}</div>
        <h2 className="mt-3 font-mono text-2xl font-bold uppercase tracking-widest text-foreground">
          <span className="text-primary">$</span> {t.contactTitle}
        </h2>
        <p className="mt-2 font-mono text-sm text-muted-foreground">
          {t.contactTagline}
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <a
            href={`mailto:${profile.contact.email}`}
            className="inline-flex items-center gap-2 border border-border px-4 py-2.5 font-mono text-sm text-foreground transition hover:border-primary hover:text-primary"
          >
            <Mail className="h-4 w-4" />
            {profile.contact.email}
          </a>
          <a
            href={profile.contact.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 border border-border px-4 py-2.5 font-mono text-sm text-foreground transition hover:border-primary hover:text-primary"
          >
            <Linkedin className="h-4 w-4" />
            LinkedIn
          </a>
        </div>

        <div className="mt-8">
          <button
            onClick={handleDownload}
            disabled={exporting}
            className="inline-flex items-center gap-2 border border-primary bg-primary/10 px-6 py-3 font-mono text-sm font-medium text-primary transition hover:bg-primary hover:text-primary-foreground disabled:opacity-60"
          >
            <FileDown className="h-4 w-4" />
            {exporting ? t.exporting : t.downloadBtn}
            <span className="cursor-blink">_</span>
          </button>

          {exporting && (
            <div className="mt-4 font-mono text-xs text-muted-foreground">
              <span className="text-primary">{t.stdout}</span> {t.exportingPdf}
              <div className="mx-auto mt-2 max-w-xs">
                <div className="flex h-3 w-full border border-border bg-secondary">
                  <div
                    className="h-full bg-primary transition-all duration-150"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="mt-1 text-primary">
                  [{"█".repeat(bars)}{"·".repeat(10 - bars)}] {Math.round(progress)}% {progress >= 100 ? t.exportComplete : ""}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <footer className="mx-auto mt-10 max-w-3xl border-t border-border pt-6 text-center font-mono text-[11px] text-muted-foreground">
        <p>
          <span className="text-primary">santiago@gonzalez</span>:<span className="text-primary">~</span>$ {t.exit}
          <span className="cursor-blink">_</span>
        </p>
        <p className="mt-2">© {new Date().getFullYear()} {profile.name} — {t.footerBuilt}</p>
      </footer>
    </section>
  );
}