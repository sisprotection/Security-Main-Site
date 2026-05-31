import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { GamesShell, GameCard, type GameTile } from "@/components/GameGrid";
import k1 from "@/assets/games/kids-1.jpg";
import k2 from "@/assets/games/kids-2.jpg";
import k3 from "@/assets/games/kids-3.jpg";
import k4 from "@/assets/games/kids-4.jpg";

export const Route = createFileRoute("/games/kids")({
  head: () => ({
    meta: [
      { title: "Kids Games — EyeYolk Wing" },
      { name: "description", content: "Friendly game mockups for younger players." },
    ],
  }),
  component: KidsPage,
});

const GAMES: GameTile[] = [
  { title: "Puzzle Island", blurb: "A clever fox helps you piece together sunny puzzle worlds.", image: k1, players: "1 player", tag: "Puzzle" },
  { title: "Kappy Knight", blurb: "A tiny knight kitten on a cotton-candy quest.", image: k2, players: "1 player", tag: "Adventure" },
  { title: "Dino ABCs", blurb: "Learn letters and sounds with friendly dinos.", image: k3, players: "1–2 players", tag: "Learning" },
  { title: "Jelly Planets", blurb: "Bounce a space bunny across glowing jelly worlds.", image: k4, players: "1 player", tag: "Arcade" },
];

function KidsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <GamesShell
        audience="kids"
        title="Kids Wing"
        subtitle="Bright, gentle, no surprises. Mockups for inspiration."
        accent="accent"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {GAMES.map((g) => <GameCard key={g.title} game={g} />)}
        </div>
      </GamesShell>
      <SiteFooter />
    </div>
  );
}
