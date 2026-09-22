import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import TerminalHeader from "@/components/cv/TerminalHeader";
import Hero from "@/components/cv/Hero";
import ExperienceTimeline from "@/components/cv/ExperienceTimeline";
import CertificationsGrid from "@/components/cv/CertificationsGrid";
import SkillsPanel from "@/components/cv/SkillsPanel";
import EducationPanel from "@/components/cv/EducationPanel";
import DownloadCV from "@/components/cv/DownloadCV";

// Contador de "dirección de memoria" en el lateral que sigue al scroll.
function MemoryTracker() {
  const [addr, setAddr] = useState(0x000);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const pct = max > 0 ? h.scrollTop / max : 0;
      setAddr(Math.round(pct * 0xfff));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed left-3 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-center gap-2 lg:flex">
      <div className="rotate-180 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground [writing-mode:vertical-rl]">
        mem.addr
      </div>
      <div className="font-mono text-xs text-primary tabular-nums">
        0x{addr.toString(16).padStart(3, "0").toUpperCase()}
      </div>
      <div className="h-24 w-px bg-gradient-to-b from-primary/60 via-border to-transparent" />
    </div>
  );
}

export default function Home() {
  const [data, setData] = useState({
    experience: [], certifications: [], education: [],
    profile: null, skills: {}, vendors: [], languages: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      base44.entities.Experience.list("order", 200),
      base44.entities.Certification.list("order", 200),
      base44.entities.Education.list("order", 200),
      base44.entities.Profile.list("order", 5),
      base44.entities.Skill.list("order", 50),
      base44.entities.Vendor.list("order", 100),
      base44.entities.Language.list("order", 50),
    ])
      .then(([experience, certifications, education, profiles, skillsRecs, vendors, languages]) => {
        const skillsObj = {};
        skillsRecs.forEach((s) => { skillsObj[s.category] = s.items || []; });
        setData({
          experience, certifications, education,
          profile: profiles[0] || null,
          skills: skillsObj,
          vendors,
          languages,
        });
      })
      .catch(() => {
        // en caso de error, dejamos valores por defecto (el CV sigue renderizando)
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="relative min-h-screen scanlines">
      <TerminalHeader />
      <MemoryTracker />
      <main className="relative z-10">
        <Hero
          profile={data.profile}
          onDownload={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
        />
        {loading ? (
          <div className="flex items-center justify-center py-20 font-mono text-xs text-muted-foreground">
            <span className="text-primary">[ LOAD ]</span> fetching records<span className="cursor-blink">_</span>
          </div>
        ) : (
          <>
            <ExperienceTimeline experience={data.experience} />
            <CertificationsGrid certifications={data.certifications} />
            <SkillsPanel skills={data.skills} languages={data.languages} vendors={data.vendors} />
            <EducationPanel education={data.education} />
            <DownloadCV
              profile={data.profile}
              skills={data.skills}
              languages={data.languages}
              experience={data.experience}
              certifications={data.certifications}
              education={data.education}
            />
          </>
        )}
      </main>
    </div>
  );
}