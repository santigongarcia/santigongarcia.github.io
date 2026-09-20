import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Wifi, Lock } from "lucide-react";

// Barra superior estilo ventana de terminal + indicador de latencia simulada.
export default function TerminalHeader() {
  const [latency, setLatency] = useState(14);
  const [clock, setClock] = useState("");

  useEffect(() => {
    const tick = () => {
      setLatency(8 + Math.floor(Math.random() * 18));
      setClock(
        new Date().toLocaleTimeString("es-ES", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    tick();
    const id = setInterval(tick, 1500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
          <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
          <span className="h-3 w-3 rounded-full bg-[#28C840]" />
          <span className="ml-3 hidden font-mono text-xs text-muted-foreground sm:inline">
            santiago@gonzalez: <span className="text-primary">~</span>
          </span>
        </div>
        <div className="flex items-center gap-4 font-mono text-[11px] text-muted-foreground">
          <span className="hidden items-center gap-1.5 sm:flex">
            <Wifi className="h-3.5 w-3.5 text-primary" />
            <span className="text-primary">{latency}ms</span>
          </span>
          <Link
            to="/admin"
            className="hidden items-center gap-1 border border-border px-2 py-0.5 text-primary transition hover:border-primary hover:bg-primary/10 sm:flex"
          >
            <Lock className="h-3 w-3" />
            <span>admin</span>
          </Link>
          <span className="tabular-nums">{clock}</span>
        </div>
      </div>
    </div>
  );
}