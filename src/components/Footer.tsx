import { useEasterEgg } from "@/contexts/EasterEggContext";
import { useState, useEffect } from "react";
import { SnowAccumulation } from "./SnowAccumulation";

export const Footer = () => {
  const { isDropped, isSnowActive } = useEasterEgg();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check if dark mode is active
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };
    
    checkDarkMode();
    
    // Watch for theme changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    
    return () => observer.disconnect();
  }, []);

  return (
    <footer className="fixed bottom-0 left-0 right-0 backdrop-blur-sm bg-background/80 border-t border-border">
      {isSnowActive && isDarkMode && <SnowAccumulation />}
      <div className="container mx-auto px-6 py-4 relative">
        {isDropped && !isDarkMode && (
          <div className="absolute left-8 bottom-4 text-lg font-semibold text-foreground animate-in fade-in duration-300">
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
