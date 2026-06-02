import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export function SectionHeading({
  eyebrow, title, subtitle, link,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  link?: { to: string; label: string };
}) {
  return (
    <div className="flex items-end justify-between gap-4 mb-6 md:mb-8">
      <div>
        {eyebrow && <div className="text-xs font-semibold text-primary uppercase tracking-widest mb-2">{eyebrow}</div>}
        <h2 className="font-display text-2xl md:text-4xl font-bold tracking-tight">{title}</h2>
        {subtitle && <p className="text-sm md:text-base text-muted-foreground mt-2 max-w-xl">{subtitle}</p>}
      </div>
      {link && (
        <Link to={link.to} className="hidden sm:inline-flex items-center gap-1 text-sm text-primary hover:gap-2 transition-all">
          {link.label} <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}
