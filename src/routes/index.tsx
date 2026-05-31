import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { ShieldCheck, Eye, Lock, Terminal, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EyeYolk Security — Evasion. Reparation. Discipline." },
      {
        name: "description",
        content:
          "EyeYolk Security: a serious operations group. We understand evasion — and reparation. If you know what we mean, you're good.",
      },
      { property: "og:title", content: "EyeYolk Security" },
      { property: "og:description", content: "Evasion. Reparation. Discipline." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
  }),
  component: IndexPage,
});

function IndexPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
        <div className="absolute inset-x-0 -top-32 h-96 bg-[radial-gradient(ellipse_at_center,_var(--color-primary)_0%,_transparent_60%)] opacity-10 pointer-events-none" />
        <div className="mx-auto max-w-6xl px-6 pt-24 pb-32 relative">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/40 px-3 py-1 text-[10px] font-display uppercase tracking-[0.25em] text-muted-foreground">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            Operating since the question was asked
          </div>
          <h1 className="mt-6 font-display text-5xl sm:text-7xl leading-[0.95] text-foreground">
            Evasion.
            <br />
            <span className="text-primary text-glow">Reparation.</span>
            <br />
            Discipline.
          </h1>
          <p className="mt-8 max-w-xl text-base text-muted-foreground leading-relaxed">
            EyeYolk Security is a serious operations group. We don't ship slogans — we ship outcomes.
            If you know what we mean, you're good to go. If not, it's time to go learn some coding
            and ethical principles of value.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              to="/president"
              className="inline-flex items-center gap-2 rounded-sm bg-primary px-5 py-3 text-sm font-display uppercase tracking-widest text-primary-foreground hover:bg-primary/90 transition"
            >
              <Lock className="w-4 h-4" /> Enter President's Office
            </Link>
            <Link
              to="/games/kids"
              className="inline-flex items-center gap-2 rounded-sm border border-border px-5 py-3 text-sm font-display uppercase tracking-widest text-foreground hover:border-primary hover:text-primary transition"
            >
              Public Games Wing <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Capability strip */}
      <section className="border-y border-border/60 bg-card/30">
        <div className="mx-auto max-w-6xl px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-xs font-display uppercase tracking-widest">
          {["Evasion", "Reparation", "Threat Intel", "Red Team Ops"].map((c) => (
            <div key={c} className="flex items-center gap-2 text-muted-foreground">
              <span className="w-1.5 h-1.5 bg-primary rounded-full" />
              {c}
            </div>
          ))}
        </div>
      </section>

      {/* Doctrine */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid md:grid-cols-[1fr_2fr] gap-12">
          <div>
            <div className="text-[10px] font-display tracking-[0.3em] text-primary uppercase">// 01 — Doctrine</div>
            <h2 className="mt-3 text-3xl font-display">Principles, not posture.</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { icon: Eye, title: "Awareness", body: "See it before it sees you. Surveillance is a discipline, not a hobby." },
              { icon: ShieldCheck, title: "Reparation", body: "Break nothing you cannot heal. We restore what we touch." },
              { icon: Terminal, title: "Craft", body: "Tools are an extension of thought. The thought has to be sound first." },
              { icon: Lock, title: "Containment", body: "The back office stays in the back office. The front speaks for itself." },
            ].map((d) => (
              <div key={d.title} className="border border-border/60 bg-card/40 p-5 hover:border-primary/60 transition">
                <d.icon className="w-5 h-5 text-primary" />
                <div className="mt-3 font-display text-sm uppercase tracking-widest">{d.title}</div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{d.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Locked archive teaser */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="border border-border/60 bg-card/40 p-8 md:p-12 border-glow">
          <div className="flex items-start justify-between gap-6 flex-wrap">
            <div>
              <div className="text-[10px] font-display tracking-[0.3em] text-accent uppercase">// 02 — Restricted</div>
              <h3 className="mt-2 text-2xl md:text-3xl font-display">The President's Office</h3>
              <p className="mt-3 max-w-lg text-sm text-muted-foreground leading-relaxed">
                Conception documents, neurology logs, OS legacy notes, and full conversation containers
                live behind credentials. The presidential seal is stamped to{" "}
                <span className="text-primary font-display">blackhatterxvi@gmail.com</span>.
              </p>
            </div>
            <Link
              to="/president"
              className="inline-flex items-center gap-2 rounded-sm border border-primary/60 bg-primary/10 px-5 py-3 text-sm font-display uppercase tracking-widest text-primary hover:bg-primary/20 transition"
            >
              <Lock className="w-4 h-4" /> Authenticate
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
