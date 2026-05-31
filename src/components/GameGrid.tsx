import { Link } from "@tanstack/react-router";
import { Play, Users } from "lucide-react";

export type GameTile = {
  title: string;
  blurb: string;
  image: string;
  players: string;
  tag: string;
};

export function GamesShell({
  audience,
  title,
  subtitle,
  accent,
  children,
}: {
  audience: "kids" | "family" | "mature";
  title: string;
  subtitle: string;
  accent: "primary" | "accent" | "destructive";
  children: React.ReactNode;
}) {
  const tabs = [
    { to: "/games/kids" as const, label: "Kids" },
    { to: "/games/family" as const, label: "Family" },
    { to: "/games/mature" as const, label: "17+" },
  ];
  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-12">
      <div className="text-[10px] font-display tracking-[0.3em] text-primary uppercase">
        // EyeYolk Games Wing · {audience.toUpperCase()}
      </div>
      <h1 className={`mt-2 text-4xl font-display ${accent === "destructive" ? "text-destructive" : accent === "accent" ? "text-accent" : "text-primary"}`}>
        {title}
      </h1>
      <p className="mt-2 text-sm text-muted-foreground max-w-xl">{subtitle}</p>

      <nav className="mt-6 inline-flex border border-border rounded-sm overflow-hidden text-xs font-display uppercase tracking-widest">
        {tabs.map((t) => (
          <Link
            key={t.to}
            to={t.to}
            className="px-4 py-2 text-muted-foreground hover:text-foreground"
            activeProps={{ className: "bg-primary/15 text-primary" }}
          >
            {t.label}
          </Link>
        ))}
      </nav>

      <div className="mt-8">{children}</div>
    </div>
  );
}

export function GameCard({ game }: { game: GameTile }) {
  return (
    <div className="group relative border border-border/60 bg-card/40 overflow-hidden hover:border-primary/60 transition">
      <div className="aspect-[3/4] overflow-hidden bg-muted">
        <img
          src={game.image}
          alt={game.title}
          loading="lazy"
          width={768}
          height={1024}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />
      </div>
      <div className="absolute top-2 left-2 bg-background/80 backdrop-blur px-2 py-0.5 text-[9px] font-display tracking-widest uppercase">
        {game.tag}
      </div>
      <div className="p-4">
        <div className="font-display text-sm">{game.title}</div>
        <div className="mt-1 text-xs text-muted-foreground line-clamp-2">{game.blurb}</div>
        <div className="mt-3 flex items-center justify-between text-[10px] text-muted-foreground font-display tracking-widest uppercase">
          <span className="inline-flex items-center gap-1">
            <Users className="w-3 h-3" /> {game.players}
          </span>
          <span className="inline-flex items-center gap-1 text-primary group-hover:text-accent">
            <Play className="w-3 h-3" /> Mock
          </span>
        </div>
      </div>
    </div>
  );
}
