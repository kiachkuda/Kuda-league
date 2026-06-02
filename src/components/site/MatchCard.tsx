import { motion } from "framer-motion";
import { Calendar, MapPin, Radio } from "lucide-react";
import { type Match, getTeam } from "@/lib/mock-data";
import { Countdown } from "./Countdown";
import { cn } from "@/lib/utils";

export function MatchCard({ match, index = 0 }: { match: Match; index?: number }) {
  const home = getTeam(match.home);
  const away = getTeam(match.away);
  const date = new Date(match.date);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      className="glass rounded-2xl p-5 glow-ring transition-all group"
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{match.stage}</span>
        {match.status === "live" && (
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-destructive">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-destructive opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-destructive" />
            </span>
            LIVE
          </span>
        )}
        {match.status === "upcoming" && (
          <span className="inline-flex items-center gap-1 text-xs text-primary"><Radio className="h-3 w-3" />Upcoming</span>
        )}
        {match.status === "completed" && (
          <span className="text-xs text-muted-foreground">Final</span>
        )}
      </div>

      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
        <TeamSide team={home} align="left" />
        <div className="text-center min-w-[80px]">
          {match.status === "completed" || match.status === "live" ? (
            <div className="font-display text-3xl font-bold tabular-nums">
              <span className={cn(match.homeScore! > match.awayScore! && "text-accent")}>{match.homeScore}</span>
              <span className="text-muted-foreground mx-1">:</span>
              <span className={cn(match.awayScore! > match.homeScore! && "text-accent")}>{match.awayScore}</span>
            </div>
          ) : (
            <div className="font-display text-2xl font-bold text-muted-foreground">VS</div>
          )}
        </div>
        <TeamSide team={away} align="right" />
      </div>

      <div className="mt-5 pt-4 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{date.toLocaleDateString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}</span>
        <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{match.venue}</span>
      </div>

      {match.status === "upcoming" && (
        <div className="mt-3">
          <Countdown to={match.date} />
        </div>
      )}
    </motion.div>
  );
}

function TeamSide({ team, align }: { team: ReturnType<typeof getTeam>; align: "left" | "right" }) {
  return (
    <div className={cn("flex flex-col items-center gap-3", align === "right" && "flex-col text-right")}>
      <div className={cn("h-12 w-12 rounded-xl bg-gradient-to-br flex items-center justify-center text-2xl shadow-lg", team.color)}>
        {team.logo}
      </div>
      <div className="min-w-0">
        <div className="font-semibold truncate">{team.name}</div>
        <div className="text-xs text-muted-foreground">{team.short}</div>
      </div>
    </div>
  );
}
