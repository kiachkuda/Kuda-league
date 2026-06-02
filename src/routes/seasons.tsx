import { motion } from "framer-motion";
import { Trophy, Award, Target, Users, Calendar } from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { seasons } from "@/lib/mock-data";
import { usePageMeta } from "@/lib/use-page-meta";

export default function SeasonsPage() {
  usePageMeta("Seasons — ApexLeague", "Browse tournament history by year.");
  return (
    <Layout>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-12 pb-20">
        <div className="mb-10">
          <div className="text-xs font-semibold text-primary uppercase tracking-widest mb-2">Hall of seasons</div>
          <h1 className="font-display text-4xl md:text-5xl font-bold">Tournament Archive</h1>
          <p className="text-muted-foreground mt-2">Every season tells a story. Browse the legends.</p>
        </div>

        <div className="space-y-6">
          {seasons.map((s, i) => (
            <motion.article
              key={s.id}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass rounded-3xl p-6 md:p-8 relative overflow-hidden group"
            >
              {s.active && <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent/20 blur-3xl" />}

              <div className="grid md:grid-cols-[auto_1fr] gap-6 items-start">
                <div className="flex md:flex-col items-baseline md:items-start gap-3">
                  <div className="font-display text-5xl md:text-7xl font-bold text-gradient leading-none">{s.year}</div>
                  {s.active && (
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-accent">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" /> Active
                    </span>
                  )}
                </div>

                <div>
                  <h2 className="font-display font-bold text-2xl md:text-3xl mb-2">{s.name}</h2>
                  <p className="text-muted-foreground">{s.highlight}</p>

                  <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {s.champion && <Stat icon={Trophy} label="Champion" value={s.champion} accent />}
                    {s.runnerUp && <Stat icon={Award} label="Runner-up" value={s.runnerUp} />}
                    {s.topScorer && <Stat icon={Target} label="Top Scorer" value={`${s.topScorer.name} · ${s.topScorer.goals}`} />}
                    <Stat icon={Users} label="Teams" value={`${s.totalTeams}`} />
                    <Stat icon={Calendar} label="Matches" value={`${s.totalMatches}`} />
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </Layout>
  );
}

function Stat({ icon: Icon, label, value, accent }: { icon: any; label: string; value: string; accent?: boolean }) {
  return (
    <div className="bg-muted/30 rounded-xl p-3">
      <Icon className={`h-4 w-4 mb-2 ${accent ? "text-accent" : "text-primary"}`} />
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">{label}</div>
      <div className="font-semibold text-sm mt-0.5">{value}</div>
    </div>
  );
}
