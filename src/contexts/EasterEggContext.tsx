import { createContext, useContext, useState, ReactNode } from "react";

interface EasterEggContextType {
  isDropped: boolean;
  triggerDrop: () => void;
}

const EasterEggContext = createContext<EasterEggContextType | undefined>(undefined);

export const EasterEggProvider = ({ children }: { children: ReactNode }) => {
  const [isDropped, setIsDropped] = useState(false);

  const triggerDrop = () => {
    setIsDropped(true);
  };

  return (
    <EasterEggContext.Provider value={{ isDropped, triggerDrop }}>
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
