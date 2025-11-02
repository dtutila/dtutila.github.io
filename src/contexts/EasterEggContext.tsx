import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface EasterEggContextType {
  isDropped: boolean;
  triggerDrop: () => void;
  isSnowActive: boolean;
  setIsSnowActive: (active: boolean) => void;
}

const EasterEggContext = createContext<EasterEggContextType | undefined>(undefined);

// Check if it's November or December
const isChristmasSeason = () => {
  const month = new Date().getMonth();
  return month === 10 || month === 11; // November (10) or December (11)
};

// Check if dark mode is active
const isDarkMode = () => {
  return document.documentElement.classList.contains('dark');
};

export const EasterEggProvider = ({ children }: { children: ReactNode }) => {
  const [isDropped, setIsDropped] = useState(false);
  const [isSnowActive, setIsSnowActive] = useState(false);

  // Auto-activate snow effect during Christmas season in dark mode
  useEffect(() => {
    const checkAndActivate = () => {
      if (isChristmasSeason() && isDarkMode()) {
        setIsSnowActive(true);
      } else {
        setIsSnowActive(false);
      }
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
    <EasterEggContext.Provider value={{ isDropped, triggerDrop, isSnowActive, setIsSnowActive }}>
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
