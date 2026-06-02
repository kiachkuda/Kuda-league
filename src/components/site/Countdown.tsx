import { useEffect, useState } from "react";

export function Countdown({ to }: { to: string }) {
  const target = new Date(to).getTime();
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const diff = Math.max(0, target - now);
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff / 3600000) % 24);
  const m = Math.floor((diff / 60000) % 60);
  const s = Math.floor((diff / 1000) % 60);

  const Cell = ({ v, l }: { v: number; l: string }) => (
    <div className="flex flex-col items-center bg-muted/40 rounded-md px-2 py-1 min-w-[44px]">
      <span className="font-display font-bold tabular-nums text-sm">{String(v).padStart(2, "0")}</span>
      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{l}</span>
    </div>
  );

  return (
    <div className="flex items-center justify-center gap-1.5">
      <Cell v={d} l="d" />
      <Cell v={h} l="h" />
      <Cell v={m} l="m" />
      <Cell v={s} l="s" />
    </div>
  );
}
