import { useState, ReactNode, useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { isChristmasSeason, isHalloweenSeason } from "@/lib/seasons";
import { EasterEggContext } from "@/contexts/EasterEggState";

export const EasterEggProvider = ({ children }: { children: ReactNode }) => {
  const { theme } = useTheme();
  const [isDropped, setIsDropped] = useState(false);
  const [isSnowActive, setIsSnowActive] = useState(() => isChristmasSeason() && theme === "dark");
  const [isHalloweenActive, setIsHalloweenActive] = useState(() => isHalloweenSeason() && theme === "dark");

  // Auto-activate seasonal effects in dark mode (Christmas: Nov/Dec, Halloween: Oct 1 - Nov 2)
  useEffect(() => {
    setIsSnowActive(isChristmasSeason() && theme === "dark");
    setIsHalloweenActive(isHalloweenSeason() && theme === "dark");
  }, [theme]);

  const triggerDrop = () => {
    setIsDropped(true);
  };

  return (
    <EasterEggContext.Provider value={{ isDropped, triggerDrop, isSnowActive, setIsSnowActive, isHalloweenActive, setIsHalloweenActive }}>
      {children}
    </EasterEggContext.Provider>
  );
};
