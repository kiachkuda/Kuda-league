import { useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Trophy, Sparkles } from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { teams } from "@/lib/mock-data";
import { useAuth } from "@/lib/auth-context";
import { usePageMeta } from "@/lib/use-page-meta";
import { cn } from "@/lib/utils";

export default function FansPage() {
  usePageMeta("Fan Leaderboard — ApexLeague", "See which teams have the largest fanbase across the league.");
  const { fanCounts, user, setFavoriteTeam } = useAuth();

  const ranked = useMemo(() => {
    return [...teams]
      .map(t => ({ ...t, fans: fanCounts[t.id] ?? t.baseFans }))
      .sort((a, b) => b.fans - a.fans);
  }, [fanCounts]);

  const total = ranked.reduce((s, t) => s + t.fans, 0);

  return (
    <Layout>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-10 pb-20">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs font-medium text-primary">
            <Sparkles className="h-3.5 w-3.5" /> Community power
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold mt-4">Fan Leaderboard</h1>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            Pick your team and help them climb the fan ranks. The most-supported clubs unlock community rewards every season.
          </p>
          <div className="mt-4 text-sm text-muted-foreground">
            <span className="font-display font-bold text-foreground text-lg tabular-nums">{total.toLocaleString()}</span> total supporters across the league
          </div>
        </div>

        <div className="space-y-3">
          {ranked.map((t, i) => {
            const pct = total ? (t.fans / ranked[0].fans) * 100 : 0;
            const isMine = user?.favoriteTeamId === t.id;
            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="glass rounded-2xl p-4 md:p-5 glow-ring"
              >
                <div className="flex items-center gap-4">
                  <div className="font-display text-2xl font-bold w-8 text-muted-foreground tabular-nums">{i + 1}</div>
                  <div className={cn("h-12 w-12 rounded-xl bg-gradient-to-br flex items-center justify-center text-2xl shadow", t.color)}>
                    {t.logo}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <Link to={`/teams/${t.id}`} className="font-semibold truncate hover:text-primary">{t.name}</Link>
                      {i === 0 && <Trophy className="h-4 w-4 text-accent" />}
                      {isMine && <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/15 text-primary">Your team</span>}
                    </div>
                    <div className="mt-2 h-1.5 rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-gradient-hero" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-display font-bold text-lg tabular-nums inline-flex items-center gap-1">
                      <Heart className="h-4 w-4 text-primary" /> {t.fans.toLocaleString()}
                    </div>
                    {user ? (
                      isMine ? (
                        <button
                          onClick={() => setFavoriteTeam(undefined)}
                          className="mt-1 text-xs text-muted-foreground hover:text-foreground"
                        >Unsupport</button>
                      ) : (
                        <button
                          onClick={() => setFavoriteTeam(t.id)}
                          className="mt-1 text-xs text-primary hover:underline"
                        >Support</button>
                      )
                    ) : (
                      <Link to="/login" className="mt-1 text-xs text-muted-foreground hover:text-foreground block">Sign in to support</Link>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
