import { motion } from "framer-motion";
import { standings } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function StandingsTable({ limit }: { limit?: number }) {
  const rows = limit ? standings.slice(0, limit) : standings;
  return (
    <div className="glass rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/30 text-muted-foreground">
            <tr className="text-left">
              <th className="px-4 py-3 font-medium">#</th>
              <th className="px-4 py-3 font-medium">Team</th>
              <th className="px-3 py-3 font-medium text-center">P</th>
              <th className="px-3 py-3 font-medium text-center">W</th>
              <th className="px-3 py-3 font-medium text-center hidden sm:table-cell">D</th>
              <th className="px-3 py-3 font-medium text-center hidden sm:table-cell">L</th>
              <th className="px-3 py-3 font-medium text-center hidden md:table-cell">GF</th>
              <th className="px-3 py-3 font-medium text-center hidden md:table-cell">GA</th>
              <th className="px-3 py-3 font-medium text-center">GD</th>
              <th className="px-3 py-3 font-medium text-center hidden lg:table-cell">Form</th>
              <th className="px-4 py-3 font-medium text-center">Pts</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((t, i) => (
              <motion.tr
                key={t.id}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className={cn("border-t border-border/40 hover:bg-muted/30 transition", i < 2 && "bg-accent/5")}
              >
                <td className="px-4 py-3 font-display font-bold">
                  <span className={cn(
                    "inline-flex h-7 w-7 items-center justify-center rounded-md text-xs",
                    i === 0 && "bg-accent text-accent-foreground",
                    i === 1 && "bg-primary/80 text-primary-foreground",
                    i > 1 && "bg-muted text-muted-foreground"
                  )}>{i + 1}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <div className={cn("h-8 w-8 rounded-lg bg-gradient-to-br flex items-center justify-center text-base", t.color)}>{t.logo}</div>
                    <div>
                      <div className="font-semibold">{t.name}</div>
                      <div className="text-xs text-muted-foreground sm:hidden">{t.wins}W · {t.draws}D · {t.losses}L</div>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-3 text-center tabular-nums">{t.played}</td>
                <td className="px-3 py-3 text-center tabular-nums">{t.wins}</td>
                <td className="px-3 py-3 text-center tabular-nums hidden sm:table-cell">{t.draws}</td>
                <td className="px-3 py-3 text-center tabular-nums hidden sm:table-cell">{t.losses}</td>
                <td className="px-3 py-3 text-center tabular-nums hidden md:table-cell">{t.gf}</td>
                <td className="px-3 py-3 text-center tabular-nums hidden md:table-cell">{t.ga}</td>
                <td className={cn("px-3 py-3 text-center tabular-nums font-medium", t.gd > 0 && "text-success", t.gd < 0 && "text-destructive")}>
                  {t.gd > 0 ? "+" : ""}{t.gd}
                </td>
                <td className="px-3 py-3 hidden lg:table-cell">
                  <div className="flex gap-1 justify-center">
                    {t.form.map((f, k) => (
                      <span key={k} className={cn(
                        "h-5 w-5 rounded text-[10px] font-bold flex items-center justify-center",
                        f === "W" && "bg-success/20 text-success",
                        f === "D" && "bg-muted text-muted-foreground",
                        f === "L" && "bg-destructive/20 text-destructive"
                      )}>{f}</span>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3 text-center font-display font-bold text-lg tabular-nums">{t.points}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
