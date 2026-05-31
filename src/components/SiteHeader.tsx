import { Link } from "@tanstack/react-router";
import logo from "@/assets/eyeyolk-logo.png";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 backdrop-blur bg-background/70">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2 group">
          <img src={logo} alt="" width={28} height={28} className="opacity-90 group-hover:opacity-100" />
          <span className="font-display text-sm tracking-widest text-foreground">
            EYE<span className="text-primary">YOLK</span>
          </span>
        </Link>
        <nav className="flex items-center gap-1 text-xs font-display uppercase tracking-widest">
          <Link to="/" activeOptions={{ exact: true }} className="px-3 py-1.5 text-muted-foreground hover:text-foreground" activeProps={{ className: "text-primary" }}>
            Home
          </Link>
          <Link to="/games/kids" className="px-3 py-1.5 text-muted-foreground hover:text-foreground" activeProps={{ className: "text-primary" }}>
            Games
          </Link>
          <Link to="/president" className="px-3 py-1.5 text-muted-foreground hover:text-foreground" activeProps={{ className: "text-primary" }}>
            President
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 mt-24">
      <div className="mx-auto max-w-6xl px-6 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-muted-foreground font-display tracking-wider">
        <div>
          <span className="text-foreground">EYEYOLK</span> SECURITY // ALL RIGHTS RESERVED // {new Date().getFullYear()}
        </div>
        <div>EVASION · REPARATION · DISCIPLINE</div>
      </div>
    </footer>
  );
}
