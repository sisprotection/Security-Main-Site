import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { GamesShell, GameCard, type GameTile } from "@/components/GameGrid";
import f1 from "@/assets/games/family-1.jpg";
import f2 from "@/assets/games/family-2.jpg";
import f3 from "@/assets/games/family-3.jpg";
import f4 from "@/assets/games/family-4.jpg";

export const Route = createFileRoute("/games/family")({
  head: () => ({
    meta: [
      { title: "Family Games — EyeYolk Wing" },
      { name: "description", content: "Co-op and party game mockups for parents and children." },
    ],
  }),
  component: FamilyPage,
});

const GAMES: GameTile[] = [
  { title: "Autumn Kart Co-op", blurb: "Drive together through changing seasons. One steers, one boosts.", image: f1, players: "2 players", tag: "Co-op" },
  { title: "Family Party Holes", blurb: "Mini-golf on tiny floating islands. Easy to learn, hard to master.", image: f2, players: "2–4", tag: "Party" },
  { title: "Treehouse Builders", blurb: "Design and decorate a treehouse together over the weekend.", image: f3, players: "2 players", tag: "Creative" },
  { title: "Backyard League", blurb: "Pickup soccer matches with mixed skill levels.", image: f4, players: "2–4", tag: "Sports" },
];

function FamilyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <GamesShell
        audience="family"
        title="Family Wing"
        subtitle="Designed for parents and children to share a controller — or a couch."
        accent="primary"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {GAMES.map((g) => <GameCard key={g.title} game={g} />)}
        </div>
      </GamesShell>
      <SiteFooter />
    </div>
  );
}
