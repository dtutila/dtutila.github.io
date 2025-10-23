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

The build output will be in the `dist` directory.

## 📤 Deploying to GitHub Pages

This project is configured for GitHub Pages deployment with two methods:

### Method 1: Automatic Deployment with GitHub Actions (Recommended)

The project includes a GitHub Actions workflow that automatically builds and deploys your site when you push to the main branch.

**Setup Steps:**

1. Push your code to GitHub
2. Go to your repository Settings → Pages
3. Under "Build and deployment", set Source to "GitHub Actions"
4. Push a commit to the main branch or manually trigger the workflow
5. Your site will be available at `https://<username>.github.io/<repository-name>/`

**Important:** Update the `base` setting in `vite.config.ts`:
- For `https://<username>.github.io/<repo-name>/`, set: `base: '/<repo-name>/'`
- For custom domain or `https://<username>.github.io/`, set: `base: '/'`

### Method 2: Manual Deployment with gh-pages

You can also deploy manually using the gh-pages package:

1. Install dependencies: `npm install`
2. Update `base` in `vite.config.ts` if needed (see above)
3. Run: `npm run deploy`

This will build the project and push the `dist` folder to the `gh-pages` branch.

**Note:** For manual deployment, ensure GitHub Pages is set to deploy from the `gh-pages` branch in your repository settings.


