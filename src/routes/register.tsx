import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, CheckCircle2, Twitter, Instagram, Globe } from "lucide-react";
import { z } from "zod";
import { Layout } from "@/components/site/Layout";
import { toast } from "sonner";
import { usePageMeta } from "@/lib/use-page-meta";

const schema = z.object({
  team: z.string().trim().min(2, "Team name too short").max(60),
  short: z.string().trim().min(2).max(5).regex(/^[A-Z0-9]+$/, "Uppercase letters/numbers only"),
  captain: z.string().trim().min(2).max(60),
  email: z.string().trim().email().max(255),
  description: z.string().trim().max(300).optional(),
  twitter: z.string().trim().max(60).optional(),
  instagram: z.string().trim().max(60).optional(),
  website: z.string().trim().max(120).optional(),
});

export default function RegisterPage() {
  usePageMeta("Register Team — ApexLeague", "Register your team for the next season.");
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ team: "", short: "", captain: "", email: "", description: "", twitter: "", instagram: "", website: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (k: keyof typeof form, v: string) => setForm(f => ({ ...f, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse(form);
    if (!r.success) {
      const errs: Record<string, string> = {};
      r.error.issues.forEach(i => { errs[i.path[0] as string] = i.message; });
      setErrors(errs);
      toast.error("Please fix the highlighted fields.");
      return;
    }
    setErrors({});
    setSubmitted(true);
    toast.success("Team submitted! We'll be in touch soon.");
  };

  if (submitted) {
    return (
      <Layout>
        <div className="mx-auto max-w-2xl px-4 sm:px-6 pt-20 pb-32 text-center">
          <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 200 }}>
            <CheckCircle2 className="h-20 w-20 text-accent mx-auto mb-6" />
          </motion.div>
          <h1 className="font-display text-4xl font-bold">You're in.</h1>
          <p className="text-muted-foreground mt-3">We've received <span className="text-foreground font-semibold">{form.team}</span>'s registration. The organizers will review your application and reach out within 48 hours.</p>
          <button onClick={() => { setSubmitted(false); setForm({ team: "", short: "", captain: "", email: "", description: "", twitter: "", instagram: "", website: "" }); }} className="mt-8 rounded-full bg-gradient-hero px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow-primary">
            Register another team
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 pt-12 pb-20">
        <div className="mb-10 text-center">
          <div className="text-xs font-semibold text-accent uppercase tracking-widest mb-2">Join Season 2027</div>
          <h1 className="font-display text-4xl md:text-5xl font-bold">Register your team</h1>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">Complete the form to enter your team into the next championship.</p>
        </div>

        <form onSubmit={submit} className="glass rounded-3xl p-6 md:p-10 space-y-6">
          <div className="grid md:grid-cols-[1fr_120px] gap-4">
            <Field label="Team name" error={errors.team}>
              <input value={form.team} onChange={e => set("team", e.target.value)} placeholder="Phoenix Vanguard" className="form-input" />
            </Field>
            <Field label="Tag" error={errors.short}>
              <input value={form.short} onChange={e => set("short", e.target.value.toUpperCase())} placeholder="PHX" maxLength={5} className="form-input uppercase tracking-widest" />
            </Field>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <Field label="Captain name" error={errors.captain}>
              <input value={form.captain} onChange={e => set("captain", e.target.value)} placeholder="Full name" className="form-input" />
            </Field>
            <Field label="Email" error={errors.email}>
              <input type="email" value={form.email} onChange={e => set("email", e.target.value)} placeholder="captain@team.com" className="form-input" />
            </Field>
          </div>

          <Field label="Team description (optional)" error={errors.description}>
            <textarea value={form.description} onChange={e => set("description", e.target.value)} rows={3} maxLength={300} placeholder="What makes your team special?" className="form-input resize-none" />
            <div className="text-xs text-muted-foreground text-right mt-1">{form.description.length}/300</div>
          </Field>

          <div>
            <label className="text-sm font-medium mb-2 block">Team logo (optional)</label>
            <div className="glass rounded-xl border-2 border-dashed border-border hover:border-primary/60 transition p-8 text-center cursor-pointer">
              <Upload className="h-6 w-6 mx-auto text-muted-foreground mb-2" />
              <div className="text-sm text-muted-foreground">Click or drop a file (PNG/SVG, 512x512+)</div>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-3 block">Social links (optional)</label>
            <div className="space-y-2">
              <SocialInput icon={Twitter} value={form.twitter} onChange={v => set("twitter", v)} placeholder="@yourteam" />
              <SocialInput icon={Instagram} value={form.instagram} onChange={v => set("instagram", v)} placeholder="@yourteam" />
              <SocialInput icon={Globe} value={form.website} onChange={v => set("website", v)} placeholder="yourteam.com" />
            </div>
          </div>

          <button type="submit" className="w-full rounded-full bg-gradient-hero py-3.5 text-sm font-semibold text-primary-foreground shadow-glow-primary hover:scale-[1.01] transition">
            Submit registration
          </button>
        </form>
      </div>

      <style>{`
        .form-input {
          width: 100%;
          background: oklch(0.18 0.025 265 / 60%);
          border: 1px solid var(--color-border);
          border-radius: 0.625rem;
          padding: 0.625rem 0.875rem;
          font-size: 0.875rem;
          outline: none;
          transition: all 0.15s;
        }
        .form-input:focus { border-color: var(--color-primary); box-shadow: 0 0 0 3px oklch(0.78 0.18 220 / 15%); }
      `}</style>
    </Layout>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-sm font-medium mb-2 block">{label}</label>
      {children}
      {error && <div className="text-xs text-destructive mt-1">{error}</div>}
    </div>
  );
}

function SocialInput({ icon: Icon, value, onChange, placeholder }: { icon: any; value: string; onChange: (v: string) => void; placeholder: string }) {
  return (
    <div className="relative">
      <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className="form-input pl-10" />
    </div>
  );
}
