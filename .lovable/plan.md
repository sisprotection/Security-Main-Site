## EyeYolk Security — Plan

### 1. Front page (`/`) — Corporate cyber-noir
Public landing for EyeYolk Security with a serious, cinematic tone (dark slate, neon cyan/green accent, subtle grid + scanline texture, mono+sans pairing).
- Hero: "EyeYolk Security — Evasion. Reparation. Discipline." with tagline "If you know what we mean, you're good. If not, go learn coding and ethical principles of value."
- Capability strip: Evasion · Reparation · Threat Intel · Red Team Ops
- "Doctrine" section (ethical principles)
- Locked Archive teaser linking to the president's office (login required)
- Discreet nav: Home · Games · President's Office
- Footer with contact placeholder

### 2. President's Office (`/president`) — private, auth-gated
- Lovable Cloud auth (Email/Password + Google sign-in)
- Hardcoded president email: **blackhatterxvi@gmail.com** — on first login, this account is auto-promoted to `president` role and stamped/badged in the office UI
- Role table (`user_roles`) with `has_role()` security-definer function and RLS — only `president` role can view the office
- Uploaded PDFs copied into the project and listed as a document canister:
  - Mr_Infinities_Neurology_Reflection_Log.pdf
  - Mr_Infinities_Full_Conversation_Container.pdf
  - Mr_Infinities_Full_Conversation_Container-1.pdf
  - Infinite_War_AI_Concept_Update.pdf
  - Mr_Infinities_OS_Legacy_Update.pdf
- "Presidential Seal" card showing the stamped email and role
- Non-presidents who reach the URL get a clean "Access denied" screen

### 3. Games hub — Roblox-style tile grids, three separate pages
Shared layout component (header, search-looking bar visual only, grid of cover tiles with title + audience badge + play count mock).

- `/games/kids` — bright, friendly palette overlay; 4 AI-generated tiles (cute/adventure/puzzle/learning)
- `/games/family` — parents & children; 4 AI-generated tiles (co-op/party/creative/sports)
- `/games/mature` — 17+; **age gate modal** (confirm 17+, stored in localStorage) before tiles render; darker overlay; 4 AI-generated tiles (tactical/horror-lite/strategy/cyber)
- Each page links across to the other two but stays visually distinct
- Cross-links from the front page nav

### 4. Image generation
12 game cover tiles total via the agent's image tool, saved to `src/assets/games/`, imported as ES6 modules. Cyber-noir cohesion across mature tier; brighter art for kids/family.

---

### Technical notes
- TanStack Start routes: `src/routes/index.tsx`, `president.tsx`, `login.tsx`, `games.kids.tsx`, `games.family.tsx`, `games.mature.tsx`, plus a shared `games.tsx` layout for the grid chrome
- Enable Lovable Cloud; migration creates `app_role` enum (`president`, `user`), `user_roles` table with RLS, `has_role()` SECURITY DEFINER function, and a trigger that grants `president` role on signup when email = `blackhatterxvi@gmail.com`
- Auth uses `onAuthStateChange` + `getSession`; `/president` redirects unauthenticated users to `/login`
- Design tokens (oklch) defined in `src/styles.css`: deep slate background, neon cyan primary, acid-green accent, mono display font (JetBrains Mono) + Inter body
- Each route gets its own `head()` metadata (title/description/og)
- No PDFs exposed publicly — they live behind the role check and are only listed inside `/president`

### Out of scope (ask later if wanted)
- Real game playability (tiles are mockups only)
- Custom domain / email branding
- Search, comments, or social features on the games pages
