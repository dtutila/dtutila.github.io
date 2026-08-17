# Personal site

Personal portfolio site of dtutila — Software Engineer. Single-page site with
dual theming (Gruvbox Light / Tokyo Night dark), a Christmas season mode, and
several hidden interactive easter eggs.

Live at [dtutila.com](https://dtutila.com).

## ✨ Features

- **Dual theming** — dark (Tokyo Night, default) and light (Gruvbox Light),
  persisted in localStorage. See `DESIGN_SYSTEM.md`.
- **Christmas season mode** — automatic snowfall, Santa hat, twinkling lights,
  and footer snow accumulation during November/December in dark mode.
  See `CHRISTMAS_SEASON_BEHAVIOR.md`.
- **Halloween season mode** — a glowing jack-o'-lantern perched on the logo
  from October 1 to November 2 in dark mode, with a header toggle.
- **Easter eggs** — falling brand text, shake-to-snowball on mobile,
  tilt-steered snow, and more. See `EASTER_EGGS.md`.

## 📚 Documentation

- `DESIGN_SYSTEM.md` — color tokens, gradients, typography, and animations for both themes
- `EASTER_EGGS.md` — full list of hidden features and how to trigger them
- `CHRISTMAS_SEASON_BEHAVIOR.md` — how the Christmas season auto-activation works
- `SNOWBALL_PHYSICS.md` — physics breakdown of the shake snowball burst
- `SHAKE_EFFECT_COMPATIBILITY.md` — device shake support across browsers
- `RESPONSIVE_LIGHTS.md` — responsive Christmas light count formulas

## 📦 Tech Stack

### Core
- React 18.3
- TypeScript 5.8
- Vite 7.1 (with SWC via `@vitejs/plugin-react-swc`)

### UI & Styling
- Tailwind CSS 3.4 + tailwindcss-animate
- shadcn/ui (Radix UI primitives)
- lucide-react icons

### Routing & Data
- react-router-dom 6
- @tanstack/react-query 5

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd dtutila.github.io
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:8080`

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run deploy` - Build and deploy to GitHub Pages via gh-pages

## 📁 Project Structure

```
├── src/
│   ├── assets/          # Static assets (logo, Santa hat image)
│   ├── components/      # React components
│   │   ├── ui/          # shadcn/ui components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── ThemeProvider.tsx
│   │   ├── ThemeToggle.tsx
│   │   ├── SocialLinks.tsx
│   │   ├── ChristmasHat.tsx
│   │   ├── ChristmasLights.tsx
│   │   ├── SnowEffect.tsx
│   │   ├── SnowAccumulation.tsx
│   │   ├── SantaHatOverlay.tsx
│   │   ├── SnowballShakeEffect.tsx
│   │   └── ShakePermissionButton.tsx
│   ├── contexts/        # React contexts (EasterEggContext)
│   ├── hooks/           # Custom hooks (useDeviceShake, use-mobile, use-toast)
│   ├── lib/             # Utility functions (cn)
│   ├── pages/           # Page components
│   │   ├── Index.tsx
│   │   └── NotFound.tsx
│   ├── App.tsx          # Main app component
│   ├── main.tsx         # Entry point
│   └── index.css        # Global styles + design tokens (HSL CSS variables)
├── public/              # Public static files (favicon, robots.txt)
├── vite.config.ts       # Vite configuration (base: './')
├── tailwind.config.ts   # Tailwind configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Dependencies and scripts
```

## 🚀 Building for Production

```bash
npm run build
```

The build output will be in the `dist` directory.

## 📤 Deploying to GitHub Pages

This project is configured for GitHub Pages deployment with two methods:

### Method 1: Automatic Deployment with GitHub Actions (Recommended)

The project includes a GitHub Actions workflow that automatically builds and
deploys the site when you push to the main branch.

**Setup Steps:**

1. Push your code to GitHub
2. Go to your repository Settings → Pages
3. Under "Build and deployment", set Source to "GitHub Actions"
4. Push a commit to the main branch or manually trigger the workflow

### Method 2: Manual Deployment with gh-pages

1. Install dependencies: `npm install`
2. Run: `npm run deploy`

This builds the project and pushes the `dist` folder to the `gh-pages` branch.

**Note:** For manual deployment, ensure GitHub Pages is set to deploy from the
`gh-pages` branch in your repository settings.

### Base path

`vite.config.ts` uses `base: './'` (relative asset paths), which works for both
the custom domain (`dtutila.com`, via `CNAME`) and project-page URLs — no
changes needed when switching between them.
