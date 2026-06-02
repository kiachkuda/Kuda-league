import { Layout } from "@/components/site/Layout";
import { StandingsTable } from "@/components/site/StandingsTable";
import { standings } from "@/lib/mock-data";
import { Trophy, TrendingUp, Target } from "lucide-react";
import { usePageMeta } from "@/lib/use-page-meta";

export default function StandingsPage() {
  usePageMeta("Standings — ApexLeague", "Live league table and rankings.");
  const top = standings[0];
  const topScorer = [...standings].sort((a, b) => b.gf - a.gf)[0];
  const bestDefense = [...standings].sort((a, b) => a.ga - b.ga)[0];

  return (
    <Layout>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-12 pb-20">
        <div className="mb-8">
          <div className="text-xs font-semibold text-primary uppercase tracking-widest mb-2">Season 2026 · Live</div>
          <h1 className="font-display text-4xl md:text-5xl font-bold">League Standings</h1>
          <p className="text-muted-foreground mt-2">Where every team stands in the race for the title.</p>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <HighlightCard icon={Trophy} label="League Leader" team={top.name} sub={`${top.wins * 3 + top.draws} pts`} accent />
          <HighlightCard icon={Target} label="Top Attack" team={topScorer.name} sub={`${topScorer.gf} goals`} />
          <HighlightCard icon={TrendingUp} label="Best Defense" team={bestDefense.name} sub={`${bestDefense.ga} conceded`} />
        </div>

        <StandingsTable />
      </div>
    </Layout>
  );
}

function HighlightCard({ icon: Icon, label, team, sub, accent }: { icon: any; label: string; team: string; sub: string; accent?: boolean }) {
  return (
    <div className={`glass rounded-2xl p-5 ${accent ? "ring-1 ring-accent/40" : ""}`}>
      <Icon className={`h-5 w-5 mb-3 ${accent ? "text-accent" : "text-primary"}`} />
      <div className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">{label}</div>
      <div className="font-display font-bold text-xl mt-1">{team}</div>
      <div className="text-sm text-muted-foreground">{sub}</div>
    </div>
  );
}
