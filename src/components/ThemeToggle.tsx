import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { Button } from "./ui/button";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="transition-all hover:scale-110"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <Moon className="h-5 w-5 transition-transform" />
      ) : (
        <Sun className="h-5 w-5 transition-transform" />
      )}
    </Button>
  );
}
