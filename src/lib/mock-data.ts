export type MatchStatus = "upcoming" | "live" | "completed";

export interface Team {
  id: string;
  name: string;
  short: string;
  logo: string; // emoji or initials gradient
  color: string;
  captain: string;
  founded: number;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  gf: number;
  ga: number;
  form: ("W" | "D" | "L")[];
  description: string;
  roster: { name: string; role: string; number: number }[];
  socials: { twitter?: string; instagram?: string };
}

export interface Match {
  id: string;
  home: string;
  away: string;
  homeScore?: number;
  awayScore?: number;
  date: string;
  venue: string;
  stage: string;
  status: MatchStatus;
  season: string;
}

export interface Season {
  id: string;
  year: string;
  name: string;
  champion?: string;
  runnerUp?: string;
  topScorer?: { name: string; team: string; goals: number };
  totalTeams: number;
  totalMatches: number;
  highlight: string;
  active?: boolean;
}

export const teams: Team[] = [
  { id: "t1", name: "Phoenix Vanguard", short: "PHX", logo: "🔥", color: "from-orange-500 to-red-600", captain: "Marcus Vale", founded: 2018, played: 14, wins: 11, draws: 2, losses: 1, gf: 38, ga: 12, form: ["W","W","W","D","W"], description: "Reigning champions known for relentless attacking football.", roster: [{name:"Marcus Vale",role:"Captain / FW",number:9},{name:"Eli Rhodes",role:"MF",number:8},{name:"Kade Brooks",role:"DF",number:4},{name:"Theo Ng",role:"GK",number:1}], socials: { twitter: "@phx" } },
  { id: "t2", name: "Iron Wolves", short: "IRW", logo: "🐺", color: "from-slate-400 to-slate-700", captain: "Dimitri Volkov", founded: 2015, played: 14, wins: 10, draws: 2, losses: 2, gf: 32, ga: 14, form: ["W","L","W","W","W"], description: "Defensive titans with unmatched tactical discipline.", roster: [{name:"Dimitri Volkov",role:"DF",number:5},{name:"Sami Reyes",role:"MF",number:10}], socials: {} },
  { id: "t3", name: "Neon Strikers", short: "NEO", logo: "⚡", color: "from-cyan-400 to-blue-600", captain: "Jin Park", founded: 2020, played: 14, wins: 9, draws: 3, losses: 2, gf: 30, ga: 16, form: ["W","D","W","W","D"], description: "Fast-paced playstyle powered by next-gen youth.", roster: [{name:"Jin Park",role:"FW",number:7}], socials: {} },
  { id: "t4", name: "Crimson Royals", short: "CRR", logo: "👑", color: "from-rose-500 to-pink-700", captain: "Leo Marchetti", founded: 2012, played: 14, wins: 8, draws: 2, losses: 4, gf: 27, ga: 18, form: ["L","W","W","D","W"], description: "Veteran squad with legendary tournament history.", roster: [{name:"Leo Marchetti",role:"MF",number:10}], socials: {} },
  { id: "t5", name: "Galactic FC", short: "GAL", logo: "🪐", color: "from-violet-500 to-purple-700", captain: "Nova Chen", founded: 2019, played: 14, wins: 7, draws: 3, losses: 4, gf: 24, ga: 20, form: ["D","W","L","W","W"], description: "Creative midfield, unpredictable counter-attacks.", roster: [{name:"Nova Chen",role:"MF",number:6}], socials: {} },
  { id: "t6", name: "Apex Predators", short: "APX", logo: "🦅", color: "from-amber-400 to-orange-600", captain: "Rafael Cruz", founded: 2017, played: 14, wins: 6, draws: 4, losses: 4, gf: 22, ga: 21, form: ["D","D","W","L","W"], description: "Balanced squad with strong away record.", roster: [{name:"Rafael Cruz",role:"FW",number:11}], socials: {} },
  { id: "t7", name: "Storm Breakers", short: "STB", logo: "🌀", color: "from-sky-400 to-indigo-600", captain: "Yuki Tanaka", founded: 2021, played: 14, wins: 5, draws: 3, losses: 6, gf: 19, ga: 23, form: ["L","W","D","L","W"], description: "Rising stars chasing their first trophy.", roster: [{name:"Yuki Tanaka",role:"MF",number:14}], socials: {} },
  { id: "t8", name: "Titan Legion", short: "TTN", logo: "⚔️", color: "from-emerald-400 to-teal-700", captain: "Aria Solis", founded: 2014, played: 14, wins: 2, draws: 2, losses: 10, gf: 11, ga: 35, form: ["L","L","L","D","L"], description: "Rebuilding season with focus on youth development.", roster: [{name:"Aria Solis",role:"DF",number:3}], socials: {} },
];

const teamId = (s: string) => s;

export const matches: Match[] = [
  { id: "m1", home: "t1", away: "t3", homeScore: 3, awayScore: 1, date: "2026-05-18T20:00:00Z", venue: "Vanguard Arena", stage: "Matchday 14", status: "completed", season: "2026" },
  { id: "m2", home: "t2", away: "t4", homeScore: 2, awayScore: 2, date: "2026-05-19T18:30:00Z", venue: "Iron Coliseum", stage: "Matchday 14", status: "completed", season: "2026" },
  { id: "m3", home: "t5", away: "t6", homeScore: 1, awayScore: 0, date: "2026-05-20T19:00:00Z", venue: "Galaxy Dome", stage: "Matchday 14", status: "completed", season: "2026" },
  { id: "m4", home: "t1", away: "t2", date: "2026-05-28T20:00:00Z", venue: "Vanguard Arena", stage: "Semi-Final", status: "upcoming", season: "2026" },
  { id: "m5", home: "t3", away: "t4", date: "2026-05-29T19:30:00Z", venue: "Neon Stadium", stage: "Semi-Final", status: "upcoming", season: "2026" },
  { id: "m6", home: "t5", away: "t7", date: "2026-05-30T18:00:00Z", venue: "Galaxy Dome", stage: "Playoff", status: "upcoming", season: "2026" },
  { id: "m7", home: "t6", away: "t8", date: "2026-06-02T20:30:00Z", venue: "Apex Field", stage: "Playoff", status: "upcoming", season: "2026" },
  { id: "m8", home: "t1", away: "t4", homeScore: 4, awayScore: 0, date: "2026-04-12T20:00:00Z", venue: "Vanguard Arena", stage: "Matchday 12", status: "completed", season: "2026" },
  { id: "m9", home: "t3", away: "t5", homeScore: 2, awayScore: 2, date: "2026-04-15T19:00:00Z", venue: "Neon Stadium", stage: "Matchday 12", status: "completed", season: "2026" },
  { id: "m10", home: "t2", away: "t7", date: "2026-05-26T20:00:00Z", venue: "Iron Coliseum", stage: "Live", status: "live", season: "2026" },
];

void teamId;

export const seasons: Season[] = [
  { id: "s2026", year: "2026", name: "Apex Championship 2026", totalTeams: 8, totalMatches: 56, highlight: "Phoenix Vanguard defending the crown in a wide-open field.", active: true },
  { id: "s2025", year: "2025", name: "Apex Championship 2025", champion: "Phoenix Vanguard", runnerUp: "Iron Wolves", topScorer: { name: "Marcus Vale", team: "Phoenix Vanguard", goals: 28 }, totalTeams: 8, totalMatches: 56, highlight: "Vale's hat-trick in the final clinched the title in extra time." },
  { id: "s2024", year: "2024", name: "Apex Championship 2024", champion: "Iron Wolves", runnerUp: "Crimson Royals", topScorer: { name: "Sami Reyes", team: "Iron Wolves", goals: 22 }, totalTeams: 8, totalMatches: 56, highlight: "Iron Wolves' undefeated knockout run." },
  { id: "s2023", year: "2023", name: "Apex Championship 2023", champion: "Crimson Royals", runnerUp: "Galactic FC", topScorer: { name: "Leo Marchetti", team: "Crimson Royals", goals: 25 }, totalTeams: 6, totalMatches: 30, highlight: "Marchetti's legendary final-minute volley." },
];

export const liveStats = {
  totalTeams: teams.length,
  totalMatches: matches.length + 46,
  activeSeason: "2026",
  goalsScored: 184,
  fansFollowing: 124800,
};

export const getTeam = (id: string) => teams.find(t => t.id === id)!;

export const standings = [...teams]
  .map(t => ({ ...t, points: t.wins * 3 + t.draws, gd: t.gf - t.ga }))
  .sort((a, b) => b.points - a.points || b.gd - a.gd || b.gf - a.gf);
