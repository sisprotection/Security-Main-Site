import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { FileText, Shield, LogOut, Lock } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/president")({
  head: () => ({
    meta: [
      { title: "President's Office — EyeYolk Security" },
      { name: "description", content: "Restricted back office for EyeYolk Security." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: PresidentPage,
});

const ARCHIVE = [
  { name: "Mr. Infinities — Neurology Reflection Log", file: "/archive/neurology-reflection-log.pdf", tag: "Neuro" },
  { name: "Mr. Infinities — Full Conversation Container", file: "/archive/full-conversation-container.pdf", tag: "Container" },
  { name: "Mr. Infinities — Full Conversation Container II", file: "/archive/full-conversation-container-2.pdf", tag: "Container" },
  { name: "Infinite War — AI Concept Update", file: "/archive/infinite-war-ai-concept.pdf", tag: "Concept" },
  { name: "Mr. Infinities — OS Legacy Update", file: "/archive/os-legacy-update.pdf", tag: "OS" },
];

type State = "loading" | "denied" | "president";

function PresidentPage() {
  const navigate = useNavigate();
  const [state, setState] = useState<State>("loading");
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const check = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate({ to: "/login" });
        return;
      }
      if (!active) return;
      setEmail(session.user.email ?? null);
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id);
      if (!active) return;
      const isPresident = roles?.some((r) => r.role === "president") ?? false;
      setState(isPresident ? "president" : "denied");
    };
    check();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => {
      if (!s) navigate({ to: "/login" });
    });
    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [navigate]);

  const signOut = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out");
    navigate({ to: "/" });
  };

  if (state === "loading") {
    return (
      <div className="min-h-screen flex flex-col">
        <SiteHeader />
        <div className="flex-1 flex items-center justify-center text-xs font-display tracking-widest text-muted-foreground">
          Verifying credentials...
        </div>
      </div>
    );
  }

  if (state === "denied") {
    return (
      <div className="min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-1 flex items-center justify-center px-6">
          <div className="max-w-md text-center border border-destructive/40 bg-card/40 p-8">
            <Lock className="w-6 h-6 text-destructive mx-auto" />
            <h1 className="mt-4 text-2xl font-display">Access Denied</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              The back office is governed by presidential authority. Your account ({email}) does
              not hold that role.
            </p>
            <button
              onClick={signOut}
              className="mt-6 inline-flex items-center gap-2 border border-border px-4 py-2 text-xs font-display uppercase tracking-widest hover:border-primary hover:text-primary"
            >
              <LogOut className="w-3 h-3" /> Sign out
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 mx-auto w-full max-w-6xl px-6 py-12">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="text-[10px] font-display tracking-[0.3em] text-primary uppercase">
              // Office of the President
            </div>
            <h1 className="mt-2 text-4xl font-display">Back Office</h1>
            <p className="mt-2 text-sm text-muted-foreground max-w-xl">
              Conception, neurology, and legacy documents. Governed by the protection of this page.
            </p>
          </div>
          <button
            onClick={signOut}
            className="inline-flex items-center gap-2 border border-border px-4 py-2 text-xs font-display uppercase tracking-widest hover:border-primary hover:text-primary"
          >
            <LogOut className="w-3 h-3" /> Sign out
          </button>
        </div>

        {/* Presidential seal */}
        <section className="mt-10 border border-primary/40 bg-card/60 p-6 border-glow flex items-start gap-5">
          <div className="relative">
            <div className="w-20 h-20 rounded-full border-2 border-primary flex items-center justify-center">
              <Shield className="w-9 h-9 text-primary" />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-accent text-accent-foreground text-[8px] font-display uppercase tracking-widest px-1.5 py-0.5 rounded-sm">
              Seal
            </div>
          </div>
          <div>
            <div className="text-[10px] font-display tracking-[0.3em] text-accent uppercase">Presidential Seal</div>
            <div className="mt-1 font-display text-xl">{email}</div>
            <div className="mt-1 text-xs text-muted-foreground">Role: PRESIDENT · Stamped & solidified</div>
          </div>
        </section>

        {/* Canister */}
        <section className="mt-12">
          <div className="text-[10px] font-display tracking-[0.3em] text-primary uppercase">// Document Canister</div>
          <h2 className="mt-2 text-2xl font-display">Restricted archive</h2>
          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            {ARCHIVE.map((doc) => (
              <a
                key={doc.file}
                href={doc.file}
                target="_blank"
                rel="noreferrer"
                className="group border border-border/60 bg-card/40 p-5 hover:border-primary/60 hover:bg-card transition flex items-start gap-4"
              >
                <FileText className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="text-[10px] font-display tracking-widest text-muted-foreground uppercase">{doc.tag}</div>
                  <div className="mt-1 text-sm font-display group-hover:text-primary">{doc.name}</div>
                  <div className="mt-1 text-[10px] text-muted-foreground">PDF · open in new tab</div>
                </div>
              </a>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
