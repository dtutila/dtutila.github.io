import { useEasterEgg } from "@/contexts/EasterEggState";
import { SnowAccumulation } from "./SnowAccumulation";
import { useTheme } from "@/contexts/ThemeContext";

export const Footer = () => {
  const { isDropped, isSnowActive } = useEasterEgg();
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  return (
    <footer className="site-footer">
      {isSnowActive && isDarkMode && <SnowAccumulation />}
      <div className="safe-inline container relative mx-auto py-3 sm:py-4">
        {isDropped && !isDarkMode && (
          <div aria-hidden="true" className="absolute left-8 bottom-4 text-lg font-semibold text-foreground animate-in fade-in duration-300">
            dtutila
          </div>
        )}
        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </footer>
  );
};
