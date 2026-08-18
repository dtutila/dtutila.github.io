import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface EasterEggContextType {
  isDropped: boolean;
  triggerDrop: () => void;
  isSnowActive: boolean;
  setIsSnowActive: (active: boolean) => void;
  isHalloweenActive: boolean;
  setIsHalloweenActive: (active: boolean) => void;
}

const EasterEggContext = createContext<EasterEggContextType | undefined>(undefined);

// Check if it's November or December
const isChristmasSeason = () => {
  const month = new Date().getMonth();
  return month === 10 || month === 11; // November (10) or December (11)
};

// Check if it's Halloween season: October 1 - November 2
const isHalloweenSeason = () => {
  const now = new Date();
  const month = now.getMonth();
  return month === 9 || (month === 10 && now.getDate() <= 2); // October (9), or November 1-2
};

// Halloween mode is available during the season only
export const isHalloweenSeasonActive = () => {
  return isHalloweenSeason();
};

// Check if dark mode is active
const isDarkMode = () => {
  return document.documentElement.classList.contains('dark');
};

export const EasterEggProvider = ({ children }: { children: ReactNode }) => {
  const [isDropped, setIsDropped] = useState(false);
  const [isSnowActive, setIsSnowActive] = useState(false);
  const [isHalloweenActive, setIsHalloweenActive] = useState(false);

  // Auto-activate seasonal effects in dark mode (Christmas: Nov/Dec, Halloween: Oct 1 - Nov 2)
  useEffect(() => {
    const checkAndActivate = () => {
      setIsSnowActive(isChristmasSeason() && isDarkMode());
      setIsHalloweenActive(isHalloweenSeasonActive() && isDarkMode());
    };

    // Check on mount
    checkAndActivate();

    // Watch for theme changes
    const observer = new MutationObserver(checkAndActivate);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  const triggerDrop = () => {
    setIsDropped(true);
  };

  return (
    <EasterEggContext.Provider value={{ isDropped, triggerDrop, isSnowActive, setIsSnowActive, isHalloweenActive, setIsHalloweenActive }}>
      {children}
    </EasterEggContext.Provider>
  );
};

export const useEasterEgg = () => {
  const context = useContext(EasterEggContext);
  if (!context) {
    throw new Error("useEasterEgg must be used within EasterEggProvider");
  }
  return context;
};
