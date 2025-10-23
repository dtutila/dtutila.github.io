# Personal site
This is my personal site

## 📦 Tech Stack

### Core
- React 18.3
- TypeScript 5.8
- Vite 7.1

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd vite_react_shadcn_ts
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

## 📁 Project Structure

```
├── src/
│   ├── assets/          # Static assets (images, etc.)
│   ├── components/      # React components
│   │   ├── ui/         # shadcn/ui components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── ThemeProvider.tsx
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions
│   ├── pages/          # Page components
│   │   ├── Index.tsx
│   │   └── NotFound.tsx
│   ├── App.tsx         # Main app component
│   ├── main.tsx        # Entry point
│   └── index.css       # Global styles
├── public/             # Public static files
├── vite.config.ts      # Vite configuration
├── tailwind.config.ts  # Tailwind configuration
├── tsconfig.json       # TypeScript configuration
└── package.json        # Dependencies and scripts
```


## 🚀 Building for Production

```bash
npm run build
```


