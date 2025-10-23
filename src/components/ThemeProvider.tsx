import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const initialState: ThemeProviderState = {
  theme: "dark",
  setTheme: () => null,
  toggleTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

// Safe localStorage access helper
const getStoredTheme = (defaultTheme: Theme): Theme => {
  try {
    const stored = localStorage.getItem("theme");
    return (stored as Theme) || defaultTheme;
  } catch (error) {
    // localStorage might be unavailable in private mode or SSR
    console.warn("localStorage is not available:", error);
    return defaultTheme;
  }
};

const setStoredTheme = (theme: Theme): void => {
  try {
    localStorage.setItem("theme", theme);
  } catch (error) {
    // Silently fail if localStorage is unavailable
    console.warn("Could not save theme to localStorage:", error);
  }
};

export function ThemeProvider({
  children,
  defaultTheme = "dark",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => getStoredTheme(defaultTheme));

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    setStoredTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const value = {
    theme,
    setTheme,
    toggleTheme,
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
