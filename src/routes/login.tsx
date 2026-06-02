import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { Layout } from "@/components/site/Layout";
import { useAuth } from "@/lib/auth-context";
import { usePageMeta } from "@/lib/use-page-meta";

const schema = z.object({
  email: z.string().trim().email("Enter a valid email").max(255),
  password: z.string().min(6, "At least 6 characters").max(72),
});

export default function LoginPage() {
  usePageMeta("Sign in — ApexLeague", "Sign in to your ApexLeague account.");
  const { login } = useAuth();
  const nav = useNavigate();
  const loc = useLocation() as { state?: { from?: string } };
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

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
    const res = await login(form.email, form.password);
    setSubmitting(false);
    if (!res.ok) {
      toast.error(res.error || "Login failed");
      return;
    }
    toast.success("Welcome back!");
    nav(loc.state?.from || "/", { replace: true });
  };

  return (
    <Layout>
      <div className="mx-auto max-w-md px-4 sm:px-6 pt-16 pb-24">
        <motion.div initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <div className="text-center mb-8">
            <Trophy className="h-10 w-10 mx-auto text-primary mb-3" />
            <h1 className="font-display text-3xl font-bold">Welcome back</h1>
            <p className="text-muted-foreground mt-2 text-sm">Sign in to register teams, vote, and predict.</p>
          </div>

          <form onSubmit={submit} className="glass rounded-3xl p-6 md:p-8 space-y-5">
            <div>
              <label className="text-sm font-medium mb-2 block">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                placeholder="you@example.com"
                className="form-input"
                autoComplete="email"
              />
              {errors.email && <div className="text-xs text-destructive mt-1">{errors.email}</div>}
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Password</label>
              <input
                type="password"
                value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                placeholder="••••••••"
                className="form-input"
                autoComplete="current-password"
              />
              {errors.password && <div className="text-xs text-destructive mt-1">{errors.password}</div>}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-full bg-gradient-hero py-3 text-sm font-semibold text-primary-foreground shadow-glow-primary hover:scale-[1.01] transition disabled:opacity-60"
            >
              {submitting ? "Signing in..." : "Sign in"}
            </button>

            <div className="text-xs text-muted-foreground text-center">
              Demo account: <span className="text-foreground">demo@apexleague.gg</span> / <span className="text-foreground">password123</span>
            </div>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            New here?{" "}
            <Link to="/signup" className="text-primary hover:underline font-medium">Create an account</Link>
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
