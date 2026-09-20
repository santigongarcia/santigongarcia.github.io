import React, { useState } from "react";
import { motion } from "framer-motion";
import { Terminal, Download, ChevronDown } from "lucide-react";
import { profile } from "@/data/cvData";
import BootSequence from "./BootSequence";

export default function Hero({ onDownload }) {
  const [booted, setBooted] = useState(false);

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

            <div>
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="font-mono text-3xl font-extrabold uppercase tracking-tight text-foreground sm:text-5xl md:text-6xl"
              >
                {profile.name.split(" ")[0]}
                <span className="text-primary text-glow">_</span>
                <span className="cursor-blink text-primary">|</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="mt-2 font-mono text-sm text-muted-foreground sm:text-base"
              >
                <span className="text-primary">[ROOT_USER]</span> {profile.name}
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-sm"
            >
              <span className="text-muted-foreground">$</span>
              <span className="text-foreground">{profile.role}</span>
              <span className="text-border">·</span>
              <span className="text-primary">{profile.currentRole}</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="max-w-2xl border-l-2 border-primary/40 pl-4 font-mono text-sm leading-relaxed text-muted-foreground"
            >
              <span className="text-primary"># cat /etc/profile.summary</span>
              <p className="mt-2 text-foreground/90">{profile.summary}</p>
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
                href={profile.contact.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 border border-border px-4 py-2.5 font-mono text-sm text-muted-foreground transition hover:border-primary hover:text-primary"
              >
                <span>$ open linkedin</span>
              </a>
            </motion.div>

            <div className="flex items-center gap-2 pt-8 font-mono text-xs text-muted-foreground">
              <ChevronDown className="h-4 w-4 animate-bounce text-primary" />
              <span>scroll to traverse memory addresses</span>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}