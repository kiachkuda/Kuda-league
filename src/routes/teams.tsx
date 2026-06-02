import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { TeamCard } from "@/components/site/TeamCard";
import { teams } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { usePageMeta } from "@/lib/use-page-meta";

type Sort = "ranking" | "wins" | "name";

export default function TeamsPage() {
  usePageMeta("Teams — ApexLeague", "All registered teams competing this season.");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort>("ranking");

  const list = useMemo(() => {
    let res = teams.filter(t => t.name.toLowerCase().includes(query.toLowerCase()));
    if (sort === "wins") res = [...res].sort((a, b) => b.wins - a.wins);
    if (sort === "name") res = [...res].sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "ranking") res = [...res].sort((a, b) => (b.wins * 3 + b.draws) - (a.wins * 3 + a.draws));
    return res;
  }, [query, sort]);

  return (
    <Layout>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-12 pb-20">
        <div className="mb-8">
          <div className="text-xs font-semibold text-primary uppercase tracking-widest mb-2">Season 2026 · {teams.length} teams</div>
          <h1 className="font-display text-4xl md:text-5xl font-bold">The Contenders</h1>
          <p className="text-muted-foreground mt-2">Meet the squads competing for glory.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search teams…"
              className="w-full glass rounded-full pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <div className="glass rounded-full p-1 flex">
            {(["ranking","wins","name"] as Sort[]).map(s => (
              <button
                key={s}
                onClick={() => setSort(s)}
                className={cn(
                  "px-4 py-1.5 rounded-full text-xs font-medium capitalize transition",
                  sort === s ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >{s}</button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {list.map((t, i) => <TeamCard key={t.id} team={t} index={i} />)}
        </div>
      </div>
    </Layout>
  );
}
