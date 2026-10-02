import React, { useState } from "react";
import { motion } from "framer-motion";
import { Terminal, Download, ChevronDown } from "lucide-react";
import { profile as defaultProfile } from "@/data/cvData";
import { ui } from "@/data/i18n";
import BootSequence from "./BootSequence";
import BadgePlaques from "./BadgePlaques";
import { Image } from "@/components/ui/image";

export default function Hero({ onDownload, profile, badges = [], lang = "es" }) {
  const [booted, setBooted] = useState(false);
  const p = profile || defaultProfile;
  const t = ui[lang];

  return (
    <section className="relative terminal-grid overflow-hidden px-4 py-12 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex items-center gap-2 font-mono text-xs text-muted-foreground">
          <Terminal className="h-4 w-4 text-primary" />
          <span className="text-primary">/bin/bash</span>
          <span className="text-border">—</span>
          <span>session #001 · root_user</span>
        </div>

        {!booted ? (
          <BootSequence onDone={() => setBooted(true)} />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <div className="font-mono text-xs text-muted-foreground">
              <span className="text-primary">santiago@gonzalez</span>:
              <span className="text-primary">~</span>$ whoami
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.05, duration: 0.4 }}
              className="mb-4 flex flex-wrap items-center gap-5"
            >
              <div className="relative inline-block">
                <div className="relative h-36 w-36 overflow-hidden rounded-full border-2 border-primary/50 border-glow sm:h-44 sm:w-44">
                  <Image
                    src={p.avatar}
                    alt={p.name}
                    fittingType="fill"
                    className="h-full w-full"
                  />
                </div>
                <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border border-primary bg-background text-[9px] font-bold text-primary text-glow">
                  ●
                </span>
              </div>

              {badges.length > 0 && (
                <div className="border-l-2 border-primary/40 pl-4">
                  <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    <span className="text-primary">//</span> {t.badgesLabel}
                  </div>
                  <BadgePlaques badges={badges} lang={lang} />
                </div>
              )}
            </motion.div>

            <div>
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="font-mono text-3xl font-extrabold uppercase tracking-tight text-foreground sm:text-5xl md:text-6xl"
              >
                {p.name.split(" ")[0]}
                <span className="text-primary text-glow">_</span>
                <span className="cursor-blink text-primary">|</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="mt-2 font-mono text-sm text-muted-foreground sm:text-base"
              >
                <span className="text-primary">[ROOT_USER]</span> {p.name}
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-sm"
            >
              <span className="text-muted-foreground">$</span>
              <span className="text-foreground">{p.role}</span>
              <span className="text-border">·</span>
              <span className="text-primary">{p.currentRole}</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="max-w-2xl border-l-2 border-primary/40 pl-4 font-mono text-sm leading-relaxed text-muted-foreground"
            >
              <span className="text-primary"># cat /etc/profile.summary</span>
              <p className="mt-2 text-foreground/90">{p.summary}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              <button
                onClick={onDownload}
                className="group inline-flex items-center gap-2 border border-primary bg-primary/10 px-4 py-2.5 font-mono text-sm font-medium text-primary transition hover:bg-primary hover:text-primary-foreground"
              >
                <Download className="h-4 w-4" />
                <span>santiago --download-cv</span>
                <span className="cursor-blink">_</span>
              </button>
              <a
                href={p.linkedin || p.contact?.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 border border-border px-4 py-2.5 font-mono text-sm text-muted-foreground transition hover:border-primary hover:text-primary"
              >
                <span>$ open linkedin</span>
              </a>
            </motion.div>

            <div className="flex items-center gap-2 pt-8 font-mono text-xs text-muted-foreground">
              <ChevronDown className="h-4 w-4 animate-bounce text-primary" />
              <span>{t.scrollHint}</span>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}