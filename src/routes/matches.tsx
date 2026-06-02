import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { MatchCard } from "@/components/site/MatchCard";
import { matches, teams } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { usePageMeta } from "@/lib/use-page-meta";

type Tab = "upcoming" | "live" | "completed";

export default function MatchesPage() {
  usePageMeta("Matches — ApexLeague", "All upcoming, live, and past matches across the season.");
  const [tab, setTab] = useState<Tab>("upcoming");
  const [query, setQuery] = useState("");
  const [teamFilter, setTeamFilter] = useState<string>("all");

  const filtered = useMemo(() => {
    return matches.filter(m => {
      if (m.status !== tab) return false;
      if (teamFilter !== "all" && m.home !== teamFilter && m.away !== teamFilter) return false;
      if (query) {
        const t1 = teams.find(t => t.id === m.home)!;
        const t2 = teams.find(t => t.id === m.away)!;
        const q = query.toLowerCase();
        if (!t1.name.toLowerCase().includes(q) && !t2.name.toLowerCase().includes(q) && !m.venue.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [tab, query, teamFilter]);

  const counts = {
    upcoming: matches.filter(m => m.status === "upcoming").length,
    live: matches.filter(m => m.status === "live").length,
    completed: matches.filter(m => m.status === "completed").length,
  };

  return (
    <Layout>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-12 pb-20">
        <div className="mb-8">
          <div className="text-xs font-semibold text-primary uppercase tracking-widest mb-2">Season 2026</div>
          <h1 className="font-display text-4xl md:text-5xl font-bold">All Matches</h1>
          <p className="text-muted-foreground mt-2">Track every fixture, every result.</p>
        </div>

        {/* Tabs */}
        <div className="glass rounded-full p-1 inline-flex mb-6">
          {(["upcoming","live","completed"] as Tab[]).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "relative px-5 py-2 rounded-full text-sm font-medium capitalize transition",
                tab === t ? "bg-gradient-hero text-primary-foreground shadow-glow-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {t} <span className="ml-1 text-xs opacity-70">({counts[t]})</span>
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search team or venue…"
              className="w-full glass rounded-full pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <select
            value={teamFilter}
            onChange={e => setTeamFilter(e.target.value)}
            className="glass rounded-full px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="all">All teams</option>
            {teams.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
        </div>

        {filtered.length === 0 ? (
          <div className="glass rounded-2xl p-16 text-center">
            <div className="text-5xl mb-3">⚽</div>
            <div className="font-display font-bold text-xl">No matches found</div>
            <div className="text-sm text-muted-foreground mt-1">Try adjusting your filters.</div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((m, i) => <MatchCard key={m.id} match={m} index={i} />)}
          </div>
        )}
      </div>
    </Layout>
  );
}
