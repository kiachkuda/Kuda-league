import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { Layout } from "@/components/site/Layout";
import { useAuth } from "@/lib/auth-context";
import { usePageMeta } from "@/lib/use-page-meta";
import { teams } from "@/lib/mock-data";

const schema = z.object({
  fullName: z.string().trim().min(2, "Name too short").max(60),
  username: z.string().trim().min(3, "At least 3 characters").max(24).regex(/^[a-zA-Z0-9_]+$/, "Letters, numbers, underscores"),
  email: z.string().trim().email("Enter a valid email").max(255),
  password: z.string().min(6, "At least 6 characters").max(72),
  favoriteTeamId: z.string().optional(),
});

export default function SignupPage() {
  usePageMeta("Create account — ApexLeague", "Create your ApexLeague account.");
  const { signup } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ fullName: "", username: "", email: "", password: "", favoriteTeamId: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const set = (k: keyof typeof form, v: string) => setForm(f => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse(form);
    if (!r.success) {
      const errs: Record<string, string> = {};
      r.error.issues.forEach(i => { errs[i.path[0] as string] = i.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitting(true);
    const res = await signup({
      fullName: form.fullName,
      username: form.username,
      email: form.email,
      password: form.password,
      favoriteTeamId: form.favoriteTeamId || undefined,
    });
    setSubmitting(false);
    if (!res.ok) {
      toast.error(res.error || "Sign-up failed");
      return;
    }
    toast.success("Account created!");
    nav("/", { replace: true });
  };

  return (
    <Layout>
      <div className="mx-auto max-w-md px-4 sm:px-6 pt-16 pb-24">
        <motion.div initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <div className="text-center mb-8">
            <Trophy className="h-10 w-10 mx-auto text-primary mb-3" />
            <h1 className="font-display text-3xl font-bold">Create your account</h1>
            <p className="text-muted-foreground mt-2 text-sm">Join the league to register teams and follow the action.</p>
          </div>

          <form onSubmit={submit} className="glass rounded-3xl p-6 md:p-8 space-y-5">
            <div>
              <label className="text-sm font-medium mb-2 block">Full name</label>
              <input value={form.fullName} onChange={e => set("fullName", e.target.value)} className="form-input" placeholder="Jane Doe" />
              {errors.fullName && <div className="text-xs text-destructive mt-1">{errors.fullName}</div>}
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Username</label>
              <input value={form.username} onChange={e => set("username", e.target.value)} className="form-input" placeholder="janedoe" maxLength={24} />
              {errors.username && <div className="text-xs text-destructive mt-1">{errors.username}</div>}
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Email</label>
              <input type="email" value={form.email} onChange={e => set("email", e.target.value)} className="form-input" placeholder="you@example.com" autoComplete="email" />
              {errors.email && <div className="text-xs text-destructive mt-1">{errors.email}</div>}
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Password</label>
              <input type="password" value={form.password} onChange={e => set("password", e.target.value)} className="form-input" placeholder="At least 6 characters" autoComplete="new-password" />
              {errors.password && <div className="text-xs text-destructive mt-1">{errors.password}</div>}
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Favorite team (optional)</label>
              <select value={form.favoriteTeamId} onChange={e => set("favoriteTeamId", e.target.value)} className="form-input">
                <option value="">— None —</option>
                {teams.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-full bg-gradient-hero py-3 text-sm font-semibold text-primary-foreground shadow-glow-primary hover:scale-[1.01] transition disabled:opacity-60"
            >
              {submitting ? "Creating..." : "Create account"}
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline font-medium">Sign in</Link>
          </p>
        </motion.div>
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
