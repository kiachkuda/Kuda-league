import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Play, Trophy, Zap, Flame, ChevronRight } from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { StatsRow } from "@/components/site/StatsRow";
import { MatchCard } from "@/components/site/MatchCard";
import { TeamCard } from "@/components/site/TeamCard";
import { SectionHeading } from "@/components/site/SectionHeading";
import { StandingsTable } from "@/components/site/StandingsTable";
import { matches, teams, seasons } from "@/lib/mock-data";
import { usePageMeta } from "@/lib/use-page-meta";

export default function Home() {
  usePageMeta("ApexLeague — Tournament Management Platform", "Premium tournament platform for elite competitions.");
  const upcoming = matches.filter(m => m.status === "upcoming").slice(0, 3);
  const recent = matches.filter(m => m.status === "completed").slice(0, 3);
  const featured = teams.slice(0, 4);

  return (
    <Layout>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,oklch(0.78_0.18_220/0.25),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_60%,oklch(0.7_0.24_305/0.2),transparent_50%)]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 pt-16 md:pt-24 pb-20 md:pb-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-primary"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Season 2026 · Live now
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-6 font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.95] max-w-5xl"
          >
            Where champions <br />
            <span className="text-gradient">are forged.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-6 text-base md:text-lg text-muted-foreground max-w-2xl"
          >
            The next-generation tournament platform. Track matches in real time, follow your teams, and live every moment of the season.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link to="/matches" className="inline-flex items-center gap-2 rounded-full bg-gradient-hero px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow-primary hover:scale-[1.03] transition-transform">
              <Play className="h-4 w-4" /> View Matches
            </Link>
            <Link to="/teams" className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-sm font-semibold hover:bg-muted transition">
              View Teams <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/register" className="inline-flex items-center gap-2 rounded-full border border-accent/40 text-accent px-6 py-3 text-sm font-semibold hover:bg-accent/10 transition">
              <Flame className="h-4 w-4" /> Register Team
            </Link>
          </motion.div>

          {/* Floating cards */}
          <div className="mt-14 grid lg:grid-cols-[1fr_auto] gap-8 items-end">
            <StatsRow />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -3 }} animate={{ opacity: 1, scale: 1, rotate: -3 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="hidden lg:block glass-strong rounded-2xl p-5 w-[280px] shadow-glow-primary"
            >
              <div className="flex items-center gap-2 text-xs text-primary font-semibold uppercase tracking-widest mb-3">
                <Zap className="h-3.5 w-3.5" /> Featured Match
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">🔥</div>
                    <span className="font-semibold text-sm">Phoenix</span>
                  </div>
                  <span className="font-display font-bold text-lg">vs</span>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm">Iron</span>
                    <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-slate-400 to-slate-700 flex items-center justify-center">🐺</div>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground text-center">Semi-Final · May 28</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SEASON BANNER */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="glass rounded-3xl p-6 md:p-10 relative overflow-hidden">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/30 blur-3xl" />
          <div className="absolute -left-10 -bottom-10 h-48 w-48 rounded-full bg-accent/20 blur-3xl" />
          <div className="relative grid md:grid-cols-[1fr_auto] gap-6 items-center">
            <div>
              <div className="text-xs font-semibold text-accent uppercase tracking-widest mb-2">Season 2026 · Apex Championship</div>
              <h3 className="font-display text-3xl md:text-4xl font-bold">The Road to the Final</h3>
              <p className="text-muted-foreground mt-2 max-w-xl">Eight elite teams. One trophy. Follow every kick, every goal, every victory.</p>
            </div>
            <Link to="/standings" className="inline-flex items-center gap-2 rounded-full bg-gradient-hero px-5 py-3 text-sm font-semibold text-primary-foreground shadow-glow-primary">
              View Standings <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* UPCOMING */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 mt-20">
        <SectionHeading eyebrow="Don't miss" title="Upcoming fixtures" subtitle="The matches that will define the season." link={{ to: "/matches", label: "All matches" }} />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {upcoming.map((m, i) => <MatchCard key={m.id} match={m} index={i} />)}
        </div>
      </section>

      {/* RECENT */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 mt-20">
        <SectionHeading eyebrow="Just played" title="Recent results" subtitle="Catch up on what you missed." link={{ to: "/matches", label: "All results" }} />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recent.map((m, i) => <MatchCard key={m.id} match={m} index={i} />)}
        </div>
      </section>

      {/* STANDINGS PREVIEW */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 mt-20">
        <SectionHeading eyebrow="Leaderboard" title="League standings" subtitle="Top of the table right now." link={{ to: "/standings", label: "Full table" }} />
        <StandingsTable limit={5} />
      </section>

      {/* TEAMS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 mt-20">
        <SectionHeading eyebrow="The contenders" title="Featured teams" subtitle="The squads competing for glory this season." link={{ to: "/teams", label: "All teams" }} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featured.map((t, i) => <TeamCard key={t.id} team={t} index={i} />)}
        </div>
      </section>

      {/* TIMELINE */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 mt-20">
        <SectionHeading eyebrow="History" title="Tournament timeline" subtitle="From the early days to the modern era." link={{ to: "/seasons", label: "All seasons" }} />
        <div className="relative pl-6 md:pl-0">
          <div className="absolute left-2 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/60 via-accent/40 to-transparent" />
          <div className="space-y-8">
            {seasons.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, x: i % 2 ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={`relative grid md:grid-cols-2 gap-6 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}
              >
                <div className={`md:${i % 2 ? "pl-10" : "pr-10 text-right"}`}>
                  <div className="glass rounded-2xl p-5">
                    <div className="text-xs uppercase tracking-widest text-primary font-semibold mb-1">{s.year} {s.active && "· Active"}</div>
                    <h4 className="font-display font-bold text-xl">{s.name}</h4>
                    {s.champion && <p className="text-sm text-muted-foreground mt-2"><Trophy className="inline h-3.5 w-3.5 text-accent" /> Champion: <span className="text-foreground font-medium">{s.champion}</span></p>}
                    <p className="text-sm text-muted-foreground mt-2">{s.highlight}</p>
                  </div>
                </div>
                <div className="hidden md:block" />
                <span className="absolute left-2 md:left-1/2 top-6 -translate-x-1/2 h-3 w-3 rounded-full bg-primary shadow-glow-primary" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SPONSORS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 mt-24">
        <div className="text-center mb-8">
          <div className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Powered by our partners</div>
        </div>
        <div className="glass rounded-2xl py-8 px-4 grid grid-cols-2 md:grid-cols-5 gap-6 items-center justify-items-center">
          {["NEXUS","VOLTEK","HYPERION","NOVA","ATLAS"].map(s => (
            <span key={s} className="font-display font-bold text-xl text-muted-foreground/60 tracking-widest hover:text-foreground transition">{s}</span>
          ))}
        </div>
      </section>

      {/* COMMUNITY */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 mt-20">
        <SectionHeading eyebrow="Community" title="From the fans" />
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { name: "Alex M.", role: "Phoenix Vanguard fan", quote: "The most exciting tournament I've ever followed. The live experience is unreal." },
            { name: "Sasha T.", role: "Iron Wolves supporter", quote: "Beautiful design, instant updates. ApexLeague raised the bar for sports apps." },
            { name: "Jamie K.", role: "Casual viewer", quote: "Even people who don't follow sports get hooked. The interface makes it effortless." },
          ].map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-6"
            >
              <p className="text-sm text-muted-foreground leading-relaxed">"{t.quote}"</p>
              <div className="mt-4 pt-4 border-t border-border/60">
                <div className="font-semibold text-sm">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 mt-24">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-hero p-10 md:p-16 text-center">
          <div className="absolute inset-0 grid-pattern opacity-20" />
          <div className="relative">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground">Ready to compete?</h2>
            <p className="mt-3 text-primary-foreground/80 max-w-xl mx-auto">Register your team for the next season and step onto the biggest stage.</p>
            <Link to="/register" className="mt-6 inline-flex items-center gap-2 rounded-full bg-background px-6 py-3 text-sm font-semibold text-foreground hover:scale-[1.03] transition">
              Register your team <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
