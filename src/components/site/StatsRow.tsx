import { motion } from "framer-motion";
import { Users, Calendar, Trophy, Target, Heart } from "lucide-react";
import { liveStats } from "@/lib/mock-data";
import { AnimatedCounter } from "./AnimatedCounter";

const items = [
  { icon: Users, label: "Total Teams", value: liveStats.totalTeams },
  { icon: Calendar, label: "Matches Played", value: liveStats.totalMatches },
  { icon: Trophy, label: "Active Season", value: Number(liveStats.activeSeason) },
  { icon: Target, label: "Goals Scored", value: liveStats.goalsScored },
  { icon: Heart, label: "Fans Following", value: liveStats.fansFollowing },
];

export function StatsRow() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
      {items.map((it, i) => (
        <motion.div
          key={it.label}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.06 }}
          className="glass rounded-xl p-4 md:p-5"
        >
          <it.icon className="h-5 w-5 text-primary mb-2" />
          <div className="font-display text-2xl md:text-3xl font-bold">
            <AnimatedCounter value={it.value} />
          </div>
          <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{it.label}</div>
        </motion.div>
      ))}
    </div>
  );
}
