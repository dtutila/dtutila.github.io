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

export const EasterEggProvider = ({ children }: { children: ReactNode }) => {
  const [isDropped, setIsDropped] = useState(false);
  const [isSnowActive, setIsSnowActive] = useState(false);

  // Auto-activate snow effect during Christmas season
  useEffect(() => {
    if (isChristmasSeason()) {
      setIsSnowActive(true);
    }
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
