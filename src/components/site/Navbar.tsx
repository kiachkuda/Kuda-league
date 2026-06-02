import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Trophy } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Home" },
  { to: "/matches", label: "Matches" },
  { to: "/teams", label: "Teams" },
  { to: "/standings", label: "Standings" },
  { to: "/seasons", label: "Seasons" },
  { to: "/about", label: "About" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const path = useLocation().pathname;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 glass-strong">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative">
            <div className="absolute inset-0 blur-md bg-primary/60 group-hover:bg-primary/80 transition" />
            <Trophy className="relative h-6 w-6 text-primary" />
          </div>
          <span className="font-display font-bold text-lg tracking-tight">
            APEX<span className="text-gradient">LEAGUE</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {nav.map(n => {
            const active = n.to === "/" ? path === "/" : path.startsWith(n.to);
            return (
              <Link
                key={n.to}
                to={n.to}
                className={cn(
                  "relative px-3 py-2 text-sm font-medium transition-colors rounded-md",
                  active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {n.label}
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-2 -bottom-px h-px bg-gradient-hero"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <Link
            to="/register"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-hero px-4 py-2 text-sm font-semibold text-primary-foreground shadow-glow-primary hover:scale-[1.03] transition-transform"
          >
            Register Team
          </Link>
        </div>

        <button
          className="md:hidden p-2 rounded-md hover:bg-muted"
          onClick={() => setOpen(v => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t border-border/60"
          >
            <div className="px-4 py-3 flex flex-col gap-1">
              {nav.map(n => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="px-3 py-2 rounded-md text-sm hover:bg-muted"
                >
                  {n.label}
                </Link>
              ))}
              <Link
                to="/register"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex justify-center rounded-full bg-gradient-hero px-4 py-2 text-sm font-semibold text-primary-foreground"
              >
                Register Team
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
