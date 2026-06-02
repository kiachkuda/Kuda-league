import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Users, Trophy } from "lucide-react";
import { type Team } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function TeamCard({ team, index = 0 }: { team: Team; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      whileHover={{ y: -6, rotateX: 2, rotateY: -2 }}
      className="glass rounded-2xl overflow-hidden group glow-ring"
    >
    <Link to={`/teams/${team.id}`} className="block cursor-pointer">
      <div className={cn("h-24 bg-gradient-to-br relative overflow-hidden", team.color)}>
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute -bottom-6 left-5 h-16 w-16 rounded-2xl bg-background border-4 border-background flex items-center justify-center text-3xl shadow-xl">
          {team.logo}
        </div>
      </div>
      <div className="pt-10 pb-5 px-5">
        <div className="flex items-start justify-between mb-1">
          <div>
            <h3 className="font-display font-bold text-lg">{team.name}</h3>
            <p className="text-xs text-muted-foreground">Captain · {team.captain}</p>
          </div>
          <span className="text-xs text-muted-foreground font-mono">{team.short}</span>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2 mt-2 min-h-[40px]">{team.description}</p>
        <div className="grid grid-cols-3 gap-2 mt-4">
          <Stat label="Played" value={team.played} />
          <Stat label="Wins" value={team.wins} accent />
          <Stat label="Losses" value={team.losses} />
        </div>
        <div className="flex gap-1 mt-3">
          {team.form.map((f, i) => (
            <span
              key={i}
              className={cn(
                "h-6 w-6 rounded text-[10px] font-bold flex items-center justify-center",
                f === "W" && "bg-success/20 text-success",
                f === "D" && "bg-muted text-muted-foreground",
                f === "L" && "bg-destructive/20 text-destructive"
              )}
            >{f}</span>
          ))}
        </div>
        <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1"><Users className="h-3 w-3" />{team.roster.length} players</span>
          <span className="inline-flex items-center gap-1"><Trophy className="h-3 w-3" />Est. {team.founded}</span>
        </div>
      </div>
    </Link>
    </motion.div>
  );
}

function Stat({ label, value, accent }: { label: string; value: number; accent?: boolean }) {
  return (
    <div className="bg-muted/30 rounded-lg p-2 text-center">
      <div className={cn("font-display font-bold text-lg tabular-nums", accent && "text-accent")}>{value}</div>
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
    </div>
  );
}
