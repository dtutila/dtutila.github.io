# Design System

All design tokens are defined as HSL CSS custom properties in `src/index.css`
and consumed through Tailwind (`tailwind.config.ts`, `darkMode: ["class"]`).
The `.dark` / `.light` class on `<html>` selects the theme; the choice persists
in `localStorage["theme"]` via `src/components/ThemeProvider.tsx`. Default is
**dark**.

- **Light theme:** Gruvbox Light (warm, retro)
- **Dark theme:** Tokyo Night (cool, blue-toned)

## Color tokens

### Light — Gruvbox Light (`:root`)

| Token | HSL | Hex | Usage |
|---|---|---|---|
| `--background` | `40 56% 91%` | `#fbf1c7` | Page background (light0) |
| `--foreground` | `30 22% 25%` | `#3c3836` | Primary text (dark1) |
| `--card` / `--popover` | `39 57% 94%` | `#f9f5d7` | Card & popover surfaces (light0_hard) |
| `--card-foreground` / `--popover-foreground` | `30 22% 25%` | `#3c3836` | Text on surfaces |
| `--primary` / `--ring` | `24 56% 50%` | `#d65d0e` | Brand/action color, focus rings (neutral_orange) |
| `--primary-foreground` | `40 56% 91%` | `#fbf1c7` | Text on primary |
| `--secondary` / `--muted` | `40 40% 81%` | `#ebdbb2` | Subtle fills (light1) |
| `--secondary-foreground` | `30 22% 25%` | `#3c3836` | Text on secondary |
| `--muted-foreground` | `30 17% 38%` | `#665c54` | De-emphasized text (dark3) |
| `--accent` | `62 61% 41%` | `#98971a` | Highlights, hover states (neutral_green) |
| `--accent-foreground` | `40 56% 91%` | `#fbf1c7` | Text on accent |
| `--destructive` | `4 89% 58%` | `#fb4934` | Errors, destructive actions (bright_red) |
| `--destructive-foreground` | `40 56% 91%` | `#fbf1c7` | Text on destructive |
| `--border` / `--input` | `40 29% 73%` | `#d5c4a1` | Borders, form inputs (light2) |

### Dark — Tokyo Night (`.dark`)

| Token | HSL | Hex | Usage |
|---|---|---|---|
| `--background` | `225 27% 12%` | `#1a1b26` | Page background |
| `--foreground` | `230 16% 77%` | `#c0caf5` | Primary text |
| `--card` / `--popover` | `230 20% 16%` | `#24283b` | Card & popover surfaces |
| `--card-foreground` / `--popover-foreground` | `230 16% 77%` | `#c0caf5` | Text on surfaces |
| `--primary` / `--ring` | `217 92% 76%` | `#7aa2f7` | Brand/action color, focus rings |
| `--primary-foreground` | `225 27% 12%` | `#1a1b26` | Text on primary |
| `--secondary` / `--muted` / `--border` / `--input` | `230 20% 21%` | `#414868` | Subtle fills, borders, inputs |
| `--secondary-foreground` | `230 16% 77%` | `#c0caf5` | Text on secondary |
| `--muted-foreground` | `230 14% 62%` | `#9aa5ce` | De-emphasized text |
| `--accent` | `267 84% 81%` | `#bb9af7` | Highlights, hover states |
| `--accent-foreground` | `225 27% 12%` | `#1a1b26` | Text on accent |
| `--destructive` | `354 70% 71%` | `#f7768e` | Errors, destructive actions |
| `--destructive-foreground` | `230 16% 77%` | `#c0caf5` | Text on destructive |

## Gradients

| Token | Light | Dark |
|---|---|---|
| `--gradient-primary` | 135° `#d65d0e` → `#98971a` (orange → green) | 135° `#7aa2f7` → `#bb9af7` (blue → purple) |
| `--gradient-background` | 180° `#fbf1c7` → `#ebdbb2` | 180° `#1a1b26` → `#24283b` |

## Glow colors

Used for the logo radial glow and social-icon drop shadows
(`hsla(var(--glow-*), alpha)`).

| Token | Light | Dark |
|---|---|---|
| `--glow-primary` | `#d65d0e` orange | `#7aa2f7` bright blue |
| `--glow-secondary` | `#98971a` green | `#7dcfff` light blue |
| `--glow-tertiary` | `#076678` faded blue | `#7aa2f7` bright blue |

## Typography

- **Font:** Inter (400/500/600/700), loaded from Google Fonts in `index.html`.
- **Stack:** `font-sans` = `Inter, system-ui, sans-serif`.
- **Hierarchy on the home page:** `h1` brand "dtutila", `h2` subtitle
  "Software Engineer".

## Radius, spacing, transitions

- `--radius: 0.75rem` — `lg` = radius, `md` = −2px, `sm` = −4px.
- Global theme cross-fade: every element transitions `background-color`,
  `color`, and `border-color` over `0.3s ease` (`src/index.css:96`).
- `--transition-smooth: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)` — defined but
  currently unused.

## Animations

| Name | Duration / easing | Used by |
|---|---|---|
| `snowfall-accumulate` | 10–30s linear infinite (per flake) | `SnowEffect` falling flakes |
| `twinkle` | 1.5s ease-in-out infinite, staggered `i * 0.1s` | `ChristmasLights` bulbs |
| `shake-snow-physics` | 2.8s `cubic-bezier(0.25, 0.46, 0.45, 0.94)` forwards | `SnowballShakeEffect` |
| `fall-and-bounce` | per-component | Header falling-text easter egg |
| `accordion-down/up` | 0.2s ease-out | shadcn accordion |
| `animate-in` / `fade-in` etc. | — | via `tailwindcss-animate` |

Note: none of the effect animations currently honor `prefers-reduced-motion`.

## Seasonal palette (Christmas mode)

Hardcoded, theme-independent (`src/components/ChristmasLights.tsx:73`):

- Bulbs: `#EF4444` `#10B981` `#3B82F6` `#F59E0B` `#8B5CF6` `#EC4899` `#14B8A6` `#F97316`
- Santa hat: `#DC2626` active / `#4B5563` inactive
- Snow: white flakes with `box-shadow: 0 0 10px rgba(255,255,255,.8)`;
  accumulation gradient `#FFFFFF → #EEEEEE`

## Usage guidelines

- Always reference colors through the semantic tokens (`bg-background`,
  `text-foreground`, `bg-primary`, …) — never hardcode theme colors in
  components, so both themes keep working. (`src/pages/NotFound.tsx` currently
  violates this with hardcoded `bg-gray-100` / `text-blue-500`.)
- All new colors MUST be added as HSL values in `src/index.css` (project
  convention stated at the top of that file).
- Seasonal/effect colors are the one exception to the token rule — they are
  intentionally theme-independent.
