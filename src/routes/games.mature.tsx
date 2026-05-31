import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { GamesShell, GameCard, type GameTile } from "@/components/GameGrid";
import m1 from "@/assets/games/mature-1.jpg";
import m2 from "@/assets/games/mature-2.jpg";
import m3 from "@/assets/games/mature-3.jpg";
import m4 from "@/assets/games/mature-4.jpg";
import { ShieldAlert } from "lucide-react";

export const Route = createFileRoute("/games/mature")({
  head: () => ({
    meta: [
      { title: "17+ Games — EyeYolk Wing" },
      { name: "description", content: "Mature mockup concepts. Age verification required." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: MaturePage,
});

const GAMES: GameTile[] = [
  { title: "Wet Streets", blurb: "Tactical operator in a rain-soaked neon city.", image: m1, players: "1–4", tag: "Tactical" },
  { title: "Ward 09", blurb: "Atmospheric horror in an abandoned hospital wing.", image: m2, players: "1 player", tag: "Horror-lite" },
  { title: "Cartograph War", blurb: "Real-time global strategy from a holographic war room.", image: m3, players: "1–8", tag: "Strategy" },
  { title: "Nullshell", blurb: "Infiltrate corporate servers. Don't get traced.", image: m4, players: "1 player", tag: "Cyber" },
];

const STORAGE_KEY = "eyeyolk:age-confirmed";

function MaturePage() {
  const [confirmed, setConfirmed] = useState(false);
  useEffect(() => {
    setConfirmed(typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY) === "1");
  }, []);

  const confirm = () => {
    localStorage.setItem(STORAGE_KEY, "1");
    setConfirmed(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <GamesShell
        audience="mature"
        title="17+ Wing"
        subtitle="Mature mockup concepts. Atmospheric, never gratuitous."
        accent="destructive"
      >
        {!confirmed ? (
          <div className="max-w-md border border-destructive/50 bg-card/60 p-6">
            <div className="flex items-center gap-2 text-[10px] font-display tracking-[0.3em] uppercase text-destructive">
              <ShieldAlert className="w-4 h-4" /> Age verification
            </div>
            <h2 className="mt-3 text-xl font-display">This wing is for 17 and older.</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Confirm you're at least 17 to view these mockups. We'll remember this on this device.
            </p>
            <div className="mt-5 flex gap-2">
              <button
                onClick={confirm}
                className="bg-destructive text-destructive-foreground px-4 py-2 text-xs font-display uppercase tracking-widest rounded-sm hover:opacity-90"
              >
                I am 17+
              </button>
              <a
                href="/games/family"
                className="border border-border px-4 py-2 text-xs font-display uppercase tracking-widest rounded-sm hover:border-primary hover:text-primary"
              >
                Take me back
              </a>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {GAMES.map((g) => <GameCard key={g.title} game={g} />)}
          </div>
        )}
      </GamesShell>
      <SiteFooter />
    </div>
  );
}
