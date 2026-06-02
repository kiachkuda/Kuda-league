import { Link } from "react-router-dom";
import { Trophy, Github, Twitter, Instagram, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/60 mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 grid gap-10 md:grid-cols-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            <span className="font-display font-bold">APEX<span className="text-gradient">LEAGUE</span></span>
          </div>
          <p className="text-sm text-muted-foreground max-w-xs">
            The next-generation tournament platform for elite competitions.
          </p>
          <div className="flex gap-3 pt-2">
            {[Twitter, Instagram, Youtube, Github].map((Icon, i) => (
              <a key={i} href="#" className="p-2 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {[
          { title: "Tournament", links: [["Matches","/matches"],["Teams","/teams"],["Standings","/standings"],["Seasons","/seasons"]] },
          { title: "Platform", links: [["About","/about"],["Register","/register"],["Rules","/about"]] },
          { title: "Community", links: [["Fan Hub","#"],["News","#"],["Support","#"]] },
        ].map(col => (
          <div key={col.title}>
            <h4 className="text-sm font-semibold mb-3">{col.title}</h4>
            <ul className="space-y-2">
              {col.links.map(([label, href]) => (
                <li key={label}>
                  <Link to={href} className="text-sm text-muted-foreground hover:text-foreground transition">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-5 flex flex-col md:flex-row justify-between gap-2 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} ApexLeague. All rights reserved.</span>
          <span>Built for the love of the game.</span>
        </div>
      </div>
    </footer>
  );
}
