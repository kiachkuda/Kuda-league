import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Trophy, Users, Calendar, Twitter, Instagram, Target, Shield, Activity } from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { MatchCard } from "@/components/site/MatchCard";
import { teams, matches, getTeam } from "@/lib/mock-data";
import { usePageMeta } from "@/lib/use-page-meta";
import { cn } from "@/lib/utils";

export default function TeamDetailPage() {
  const { id = "" } = useParams();
  const team = teams.find((t) => t.id === id);

  usePageMeta(
    team ? `${team.name} — ApexLeague` : "Team — ApexLeague",
    team?.description,
  );

  const teamMatches = useMemo(
    () =>
      matches
        .filter((m) => m.home === id || m.away === id)
        .sort((a, b) => +new Date(b.date) - +new Date(a.date)),
    [id],
  );

  const lastFive = useMemo(
    () => teamMatches.filter((m) => m.status === "completed").slice(0, 5),
    [teamMatches],
  );

  const upcoming = useMemo(
    () => teamMatches.filter((m) => m.status !== "completed").reverse().slice(0, 3),
    [teamMatches],
  );

  if (!team) {
    return (
      <Layout>
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-24 text-center">
          <h1 className="font-display text-4xl font-bold">Team not found</h1>
          <p className="text-muted-foreground mt-2">The squad you're looking for doesn't exist.</p>
          <Link to="/teams" className="inline-flex items-center gap-2 mt-6 text-primary hover:underline">
            <ArrowLeft className="h-4 w-4" /> Back to teams
          </Link>
        </div>
      </Layout>
    );
  }

  const points = team.wins * 3 + team.draws;
  const winRate = team.played ? Math.round((team.wins / team.played) * 100) : 0;

  return (
    <Layout>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-8 pb-20">
        <Link
          to="/teams"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="h-4 w-4" /> All teams
        </Link>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            "relative overflow-hidden rounded-3xl p-6 md:p-10 bg-gradient-to-br glow-ring",
            team.color,
          )}
        >
          <div className="absolute inset-0 grid-pattern opacity-15" />
          <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="h-24 w-24 md:h-28 md:w-28 rounded-2xl bg-background/90 backdrop-blur flex items-center justify-center text-5xl md:text-6xl shadow-2xl">
              {team.logo}
            </div>
            <div className="flex-1 text-white">
              <div className="text-xs font-mono uppercase tracking-widest opacity-80">{team.short} · Est. {team.founded}</div>
              <h1 className="font-display text-4xl md:text-5xl font-bold mt-1 drop-shadow-sm">{team.name}</h1>
              <p className="opacity-90 mt-2 max-w-2xl">{team.description}</p>
              <div className="flex flex-wrap items-center gap-4 mt-4 text-sm">
                <span className="inline-flex items-center gap-1.5"><Trophy className="h-4 w-4" /> Captain · {team.captain}</span>
                <span className="inline-flex items-center gap-1.5"><Users className="h-4 w-4" /> {team.roster.length} players</span>
                {team.socials.twitter && (
                  <span className="inline-flex items-center gap-1.5"><Twitter className="h-4 w-4" /> {team.socials.twitter}</span>
                )}
                {team.socials.instagram && (
                  <span className="inline-flex items-center gap-1.5"><Instagram className="h-4 w-4" /> {team.socials.instagram}</span>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Season stats */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mt-8">
          <StatCard label="Played" value={team.played} />
          <StatCard label="Won" value={team.wins} accent="success" />
          <StatCard label="Drawn" value={team.draws} />
          <StatCard label="Lost" value={team.losses} accent="destructive" />
          <StatCard label="Points" value={points} accent="primary" />
          <StatCard label="Win Rate" value={`${winRate}%`} />
        </div>

        {/* Form */}
        <div className="mt-8 glass rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-xl font-bold inline-flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" /> Recent Form
            </h2>
            <div className="text-xs text-muted-foreground">GF {team.gf} · GA {team.ga} · GD {team.gf - team.ga >= 0 ? "+" : ""}{team.gf - team.ga}</div>
          </div>
          <div className="flex gap-2">
            {team.form.map((f, i) => (
              <span
                key={i}
                className={cn(
                  "h-9 w-9 rounded-lg text-sm font-bold flex items-center justify-center",
                  f === "W" && "bg-success/20 text-success",
                  f === "D" && "bg-muted text-muted-foreground",
                  f === "L" && "bg-destructive/20 text-destructive",
                )}
              >{f}</span>
            ))}
          </div>
        </div>

        {/* Last 5 matches */}
        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold mb-4">Last 5 Matches</h2>
          {lastFive.length === 0 ? (
            <div className="glass rounded-2xl p-6 text-sm text-muted-foreground">No completed matches yet.</div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {lastFive.map((m, i) => <MatchCard key={m.id} match={m} index={i} />)}
            </div>
          )}
        </section>

        {/* Upcoming */}
        {upcoming.length > 0 && (
          <section className="mt-10">
            <h2 className="font-display text-2xl font-bold mb-4">Upcoming</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {upcoming.map((m, i) => <MatchCard key={m.id} match={m} index={i} />)}
            </div>
          </section>
        )}

        {/* Roster */}
        <section className="mt-10">
          <h2 className="font-display text-2xl font-bold mb-4 inline-flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" /> Squad
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {team.roster.map((p, i) => {
              const stats = playerStats(team.id, p.name, p.role, i);
              return (
                <motion.div
                  key={p.name}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  className="glass rounded-2xl p-5 glow-ring"
                >
                  <div className="flex items-center gap-4">
                    <div className={cn("h-14 w-14 rounded-xl bg-gradient-to-br flex items-center justify-center font-display font-bold text-xl text-white", team.color)}>
                      {p.number}
                    </div>
                    <div className="min-w-0">
                      <div className="font-semibold truncate">{p.name}</div>
                      <div className="text-xs text-muted-foreground">{p.role}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-2 mt-4">
                    <MiniStat label="Apps" value={stats.apps} />
                    <MiniStat label="Goals" value={stats.goals} icon={<Target className="h-3 w-3" />} />
                    <MiniStat label="Assists" value={stats.assists} />
                    <MiniStat label="Rating" value={stats.rating.toFixed(1)} accent />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>
      </div>
    </Layout>
  );
}

function StatCard({ label, value, accent }: { label: string; value: string | number; accent?: "primary" | "success" | "destructive" }) {
  return (
    <div className="glass rounded-2xl p-4">
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className={cn(
        "font-display text-2xl md:text-3xl font-bold tabular-nums mt-1",
        accent === "primary" && "text-primary",
        accent === "success" && "text-success",
        accent === "destructive" && "text-destructive",
      )}>{value}</div>
    </div>
  );
}

function MiniStat({ label, value, accent, icon }: { label: string; value: string | number; accent?: boolean; icon?: React.ReactNode }) {
  return (
    <div className="bg-muted/30 rounded-lg p-2 text-center">
      <div className={cn("font-display font-bold text-base tabular-nums inline-flex items-center gap-1 justify-center", accent && "text-accent")}>
        {icon}{value}
      </div>
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
    </div>
  );
}

// Deterministic pseudo-stats so values are stable between renders
function playerStats(teamId: string, name: string, role: string, idx: number) {
  const seed = [...(teamId + name)].reduce((a, c) => a + c.charCodeAt(0), 0);
  const r = (n: number) => ((seed * (idx + 1) * 9301 + 49297) % n);
  const isFwd = /FW/i.test(role);
  const isMid = /MF/i.test(role);
  const isGk = /GK/i.test(role);
  const apps = 10 + (r(5));
  const goals = isGk ? 0 : isFwd ? 6 + r(10) : isMid ? 2 + r(6) : r(3);
  const assists = isGk ? 0 : isFwd ? 2 + r(6) : isMid ? 4 + r(7) : 1 + r(3);
  const rating = 6.5 + ((r(40)) / 10);
  return { apps, goals, assists, rating: Math.min(9.5, rating) };
}
