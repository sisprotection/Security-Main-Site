import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { SiteHeader } from "@/components/SiteHeader";
import { toast } from "sonner";
import { Lock } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Authenticate — EyeYolk Security" },
      { name: "description", content: "Sign in to the EyeYolk Security back office." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/president" });
    });
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/president` },
        });
        if (error) throw error;
        toast.success("Check your email to confirm your account.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Welcome back.");
        navigate({ to: "/president" });
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: `${window.location.origin}/president`,
    });
    if (result.error) toast.error("Google sign-in failed");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md border border-border/60 bg-card/60 p-8 border-glow">
          <div className="flex items-center gap-2 text-[10px] font-display tracking-[0.3em] text-primary uppercase">
            <Lock className="w-3 h-3" /> Restricted Access
          </div>
          <h1 className="mt-2 text-2xl font-display">
            {mode === "signin" ? "Sign In" : "Create Credentials"}
          </h1>
          <p className="mt-1 text-xs text-muted-foreground">
            Only the president sees the office documents.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-3">
            <input
              type="email"
              required
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-input border border-border px-3 py-2 text-sm rounded-sm focus:outline-none focus:border-primary"
            />
            <input
              type="password"
              required
              minLength={6}
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-input border border-border px-3 py-2 text-sm rounded-sm focus:outline-none focus:border-primary"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-primary-foreground py-2 text-sm font-display uppercase tracking-widest rounded-sm hover:bg-primary/90 disabled:opacity-50"
            >
              {loading ? "..." : mode === "signin" ? "Authenticate" : "Sign Up"}
            </button>
          </form>

          <div className="my-4 flex items-center gap-3 text-[10px] font-display tracking-widest text-muted-foreground">
            <span className="flex-1 h-px bg-border" /> OR <span className="flex-1 h-px bg-border" />
          </div>
          <button
            onClick={handleGoogle}
            className="w-full border border-border py-2 text-sm font-display uppercase tracking-widest rounded-sm hover:border-primary hover:text-primary"
          >
            Continue with Google
          </button>

          <button
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            className="mt-6 w-full text-xs text-muted-foreground hover:text-foreground"
          >
            {mode === "signin" ? "No account? Create credentials" : "Have an account? Sign in"}
          </button>

          <Link to="/" className="block mt-4 text-center text-[10px] font-display tracking-widest text-muted-foreground hover:text-primary">
            ← Back to front
          </Link>
        </div>
      </main>
    </div>
  );
}
