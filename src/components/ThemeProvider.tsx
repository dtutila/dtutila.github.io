import { useEffect, useMemo, useState } from "react";
import { ThemeContext, type Theme } from "@/contexts/ThemeContext";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
};

// Safe localStorage access helper
const getStoredTheme = (defaultTheme: Theme): Theme => {
  try {
    const stored = localStorage.getItem("theme");
    if (stored === "dark" || stored === "light") {
      return stored;
    }
  } catch (error) {
    // localStorage might be unavailable in private mode or SSR
    console.warn("localStorage is not available:", error);
  }
  // First visit: follow the OS preference, falling back to the default
  if (window.matchMedia?.("(prefers-color-scheme: light)").matches) {
    return "light";
  }
  return defaultTheme;
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
    root.style.colorScheme = theme;
    document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')?.setAttribute(
      "content",
      theme === "dark" ? "#1a1b26" : "#fbf1c7",
    );
    setStoredTheme(theme);
  }, [theme]);

  const value = useMemo(() => ({
    theme,
    setTheme,
    toggleTheme: () => setTheme((current) => current === "light" ? "dark" : "light"),
  }), [theme]);

  return (
    <ThemeContext.Provider {...props} value={value}>
      {children}
    </ThemeContext.Provider>
  );
}
