import { createContext, useContext } from "react";

export interface EasterEggContextValue {
  isDropped: boolean;
  triggerDrop: () => void;
  isSnowActive: boolean;
  setIsSnowActive: (active: boolean) => void;
  isHalloweenActive: boolean;
  setIsHalloweenActive: (active: boolean) => void;
}

export const EasterEggContext = createContext<EasterEggContextValue | undefined>(undefined);

export const useEasterEgg = () => {
  const context = useContext(EasterEggContext);

  if (!context) {
    throw new Error("useEasterEgg must be used within EasterEggProvider");
  }

  return context;
};
