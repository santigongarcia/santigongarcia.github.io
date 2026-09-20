import React, { useEffect, useState } from "react";

// Secuencia de arranque tipo "kernel boot" que se muestra al cargar la web.
const BOOT_LINES = [
  "Initializing kernel module: santiago.sys",
  "Mounting /dev/career .......................... mounted",
  "Loading network stack: routing, switching, firewall",
  "Probing certifications ........................ 5 found",
  "Establishing uplink to CGT Norte · DGT ......... linked",
  "Starting interactive shell as root_user",
];

const DELAYS = [120, 140, 160, 180, 200, 220];

export default function BootSequence({ onDone }) {
  const [lines, setLines] = useState([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    let timer;
    const step = () => {
      if (i < BOOT_LINES.length) {
        setLines((prev) => [...prev, BOOT_LINES[i]]);
        const d = DELAYS[i] ?? 200;
        i += 1;
        timer = setTimeout(step, d);
      } else {
        timer = setTimeout(() => {
          setDone(true);
          onDone?.();
        }, 450);
      }
    };
    step();
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div className={`transition-opacity duration-500 ${done ? "opacity-0" : "opacity-100"}`}>
      <div className="font-mono text-[11px] sm:text-xs leading-relaxed text-muted-foreground space-y-1">
        {lines.map((l, idx) => (
          <div key={idx} className="fade-up">
            <span className="text-primary">[ OK ]</span>
            <span className="ml-2">{l}</span>
          </div>
        ))}
        <div className="text-primary cursor-blink">_</div>
      </div>
    </div>
  );
}