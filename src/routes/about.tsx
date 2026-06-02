import { motion } from "framer-motion";
import { useState } from "react";
import { Trophy, Users, Calendar, Shield, ChevronDown } from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { cn } from "@/lib/utils";
import { usePageMeta } from "@/lib/use-page-meta";

const faqs = [
  { q: "How do teams qualify for the tournament?", a: "Teams must register before the cutoff date each season. The top 16 by qualifying score are accepted into the main bracket." },
  { q: "What is the format of each season?", a: "Each season runs a round-robin group stage followed by single-elimination playoffs ending in a grand final." },
  { q: "Are matches streamed live?", a: "Yes. Every match is streamed on our official channels and updated in real time on the platform." },
  { q: "How are tie-breakers handled?", a: "By points, then goal difference, then goals scored, then head-to-head." },
  { q: "Is there prize money?", a: "Yes. The champion takes home a guaranteed prize pool that grows with each season." },
];

export default function AboutPage() {
  usePageMeta("About — ApexLeague", "About the platform, how the tournaments work, rules and FAQs.");
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Layout>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-12 pb-20">
        <div className="text-center mb-14">
          <div className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">About ApexLeague</div>
          <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight">Built for the love <br /> of <span className="text-gradient">the game.</span></h1>
          <p className="text-muted-foreground mt-5 max-w-2xl mx-auto">
            ApexLeague is the modern tournament platform that connects teams, organizers and fans through real-time competition, clean data, and a premium experience.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-4 mb-16">
          {[
            { icon: Trophy, title: "Elite competition", text: "Top-tier teams from across the league." },
            { icon: Users, title: "Community first", text: "Built around the fans who make it real." },
            { icon: Calendar, title: "Season by season", text: "Structured competitions that mean something." },
            { icon: Shield, title: "Fair & transparent", text: "Clear rules, public stats, honest play." },
          ].map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="glass rounded-2xl p-5"
            >
              <f.icon className="h-5 w-5 text-primary mb-3" />
              <div className="font-display font-bold">{f.title}</div>
              <div className="text-sm text-muted-foreground mt-1">{f.text}</div>
            </motion.div>
          ))}
        </div>

        <section className="glass rounded-3xl p-6 md:p-10 mb-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">How tournaments work</h2>
          <ol className="space-y-4">
            {[
              ["Registration", "Teams sign up before the season cutoff with roster and captain details."],
              ["Group Stage", "Round-robin matches determine seedings for the playoff bracket."],
              ["Playoffs", "Single elimination through quarter-finals and semi-finals."],
              ["Grand Final", "The two strongest teams meet for the championship."],
            ].map(([t, d], i) => (
              <li key={t} className="flex gap-4">
                <div className="h-9 w-9 shrink-0 rounded-lg bg-gradient-hero flex items-center justify-center font-display font-bold text-primary-foreground">{i + 1}</div>
                <div>
                  <div className="font-semibold">{t}</div>
                  <div className="text-sm text-muted-foreground">{d}</div>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section>
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">Frequently asked</h2>
          <div className="space-y-2">
            {faqs.map((f, i) => (
              <div key={f.q} className="glass rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left"
                >
                  <span className="font-medium">{f.q}</span>
                  <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition", open === i && "rotate-180")} />
                </button>
                <div className={cn("grid transition-all duration-300", open === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
                  <div className="overflow-hidden">
                    <div className="px-5 pb-4 text-sm text-muted-foreground">{f.a}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}
