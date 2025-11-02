import { ThemeToggle } from "./ThemeToggle";
import { useEasterEgg } from "@/contexts/EasterEggContext";
import { useState, useEffect } from "react";

export const Header = () => {
  const { isDropped, triggerDrop } = useEasterEgg();
  const [isAnimating, setIsAnimating] = useState(false);
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

  const handleMouseEnter = () => {
    // Only trigger easter egg in light mode
    if (!isDarkMode && !isDropped && !isAnimating) {
      setIsAnimating(true);
      triggerDrop();
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-background/80 border-b border-border">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-lg font-semibold text-foreground">
          {!isDropped || isDarkMode ? (
            <a 
              href="https://dtutila.com" 
              onMouseEnter={handleMouseEnter}
              className="cursor-pointer"
            >
              dtutila
            </a>
          ) : (
            <span className="invisible">dtutila</span>
          )}
        </div>
        <ThemeToggle />
      </div>
      
      {/* Falling animation element - only in light mode */}
      {isAnimating && !isDarkMode && (
        <div 
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
