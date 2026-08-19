import { ThemeToggle } from "./ThemeToggle";
import { useEasterEgg } from "@/contexts/EasterEggState";
import { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { ChristmasHat } from "./ChristmasHat";
import { ChristmasLights } from "./ChristmasLights";
import { HalloweenPumpkin } from "./HalloweenPumpkin";

export const Header = () => {
  const { isDropped, triggerDrop, isSnowActive, setIsSnowActive, isHalloweenActive, setIsHalloweenActive } = useEasterEgg();
  const [isAnimating, setIsAnimating] = useState(false);
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  const handleMouseEnter = () => {
    // Only trigger easter egg in light mode
    if (!isDarkMode && !isDropped && !isAnimating) {
      setIsAnimating(true);
      triggerDrop();
    }
  };

  return (
    <header className="site-header">
      <a href="#main-content" className="skip-link">Skip to content</a>
      <ChristmasLights isActive={isSnowActive} />
      <div className="safe-inline container mx-auto flex items-center justify-between py-3 sm:py-4">
        <div className="text-lg font-semibold text-foreground">
          {!isDropped || isDarkMode ? (
            <a 
              href="https://dtutila.com" 
              onMouseEnter={handleMouseEnter}
              className="rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
            >
              dtutila
            </a>
          ) : (
            <span className="invisible">dtutila</span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <ChristmasHat
            isActive={isSnowActive}
            onToggle={() => setIsSnowActive(!isSnowActive)}
          />
          <HalloweenPumpkin
            isActive={isHalloweenActive}
            onToggle={() => setIsHalloweenActive(!isHalloweenActive)}
          />
          <ThemeToggle />
        </div>
      </div>
      
      {/* Falling animation element - only in light mode */}
      {isAnimating && !isDarkMode && (
        <div 
          aria-hidden="true"
          className="fixed text-lg font-semibold text-foreground pointer-events-none z-[100]"
          style={{
            left: '2rem',
            top: '1rem',
            animation: 'fall-and-bounce 2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
          }}
        >
          dtutila
        </div>
      )}
    </header>
  );
};
