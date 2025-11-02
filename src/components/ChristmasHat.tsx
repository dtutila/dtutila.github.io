import { useState, useEffect } from "react";

interface ChristmasHatProps {
  isActive: boolean;
  onToggle: () => void;
}

export const ChristmasHat = ({ isActive, onToggle }: ChristmasHatProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isChristmasSeason, setIsChristmasSeason] = useState(false);

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
    
    // Check if it's November or December
    const currentMonth = new Date().getMonth(); // 0-indexed: 10 = November, 11 = December
    const isChristmas = currentMonth === 10 || currentMonth === 11;
    console.log('Christmas Hat - Current month:', currentMonth, 'Is Christmas season:', isChristmas);
    setIsChristmasSeason(isChristmas);
    
    return () => observer.disconnect();
  }, []);

  // Only show in dark mode during November/December
  console.log('Christmas Hat - Dark mode:', isDarkMode, 'Christmas season:', isChristmasSeason, 'Should show:', isDarkMode && isChristmasSeason);
  
  if (!isDarkMode || !isChristmasSeason) {
    return null;
  }

  return (
    <button
      onClick={onToggle}
      className="transition-all hover:scale-110 cursor-pointer"
      aria-label="Toggle snow effect"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-all duration-300"
      >
        {/* Santa hat */}
        <path
          d="M12 3C12 3 8 6 6 10C4 14 4 16 4 16C4 16 4 18 6 18C8 18 16 18 18 18C20 18 20 16 20 16C20 16 20 14 18 10C16 6 12 3 12 3Z"
          fill={isActive ? "#DC2626" : "#4B5563"}
          className="transition-colors duration-300"
        />
        {/* White trim */}
        <ellipse
          cx="12"
          cy="17"
          rx="8"
          ry="1.5"
          fill={isActive ? "#FFFFFF" : "#6B7280"}
          className="transition-colors duration-300"
        />
        {/* Pom-pom */}
        <circle
          cx="12"
          cy="3"
          r="2"
          fill={isActive ? "#FFFFFF" : "#6B7280"}
          className="transition-colors duration-300"
        />
      </svg>
    </button>
  );
};
