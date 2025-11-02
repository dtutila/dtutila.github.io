import { useState, useEffect } from "react";

interface ChristmasLightsProps {
  isActive: boolean;
}

export const ChristmasLights = ({ isActive }: ChristmasLightsProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isChristmasSeason, setIsChristmasSeason] = useState(false);
  const [lightCount, setLightCount] = useState(20);

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
    const currentMonth = new Date().getMonth();
    setIsChristmasSeason(currentMonth === 10 || currentMonth === 11);
    
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Calculate number of lights based on screen width
    const calculateLightCount = () => {
      const width = window.innerWidth;
      
      // Responsive breakpoints
      if (width < 640) {
        // Mobile: 8-12 lights
        setLightCount(Math.max(8, Math.floor(width / 50)));
      } else if (width < 768) {
        // Small tablet: 12-15 lights
        setLightCount(Math.max(12, Math.floor(width / 55)));
      } else if (width < 1024) {
        // Tablet: 15-20 lights
        setLightCount(Math.max(15, Math.floor(width / 60)));
      } else if (width < 1280) {
        // Small desktop: 20-25 lights
        setLightCount(Math.max(20, Math.floor(width / 55)));
      } else if (width < 1536) {
        // Desktop: 25-30 lights
        setLightCount(Math.max(25, Math.floor(width / 52)));
      } else {
        // Large desktop: 30-35 lights
        setLightCount(Math.max(30, Math.floor(width / 50)));
      }
    };

    calculateLightCount();

    // Recalculate on window resize
    window.addEventListener('resize', calculateLightCount);
    return () => window.removeEventListener('resize', calculateLightCount);
  }, []);

  // Only show in dark mode during November/December when active
  if (!isDarkMode || !isChristmasSeason || !isActive) {
    return null;
  }

  const lightColors = [
    '#EF4444', // red
    '#10B981', // green
    '#3B82F6', // blue
    '#F59E0B', // yellow/amber
    '#8B5CF6', // purple
    '#EC4899', // pink
    '#14B8A6', // teal
    '#F97316', // orange
  ];

  const lights = Array.from({ length: lightCount }, (_, i) => ({
    id: i,
    color: lightColors[i % lightColors.length],
    delay: i * 0.1,
  }));

  return (
    <div className="absolute -bottom-6 left-0 right-0 h-8 pointer-events-none overflow-visible">
      {/* Electric cable - thicker, more realistic */}
      <svg
        className="absolute inset-x-0 top-0 w-full h-full"
        preserveAspectRatio="none"
        viewBox="0 0 1000 100"
      >
        {/* Cable shadow/bottom edge */}
        <path
          d="M 0,22 Q 50,37 100,32 Q 150,27 200,32 Q 250,37 300,32 Q 350,27 400,32 Q 450,37 500,32 Q 550,27 600,32 Q 650,37 700,32 Q 750,27 800,32 Q 850,37 900,32 Q 950,27 1000,22"
          stroke="#000000"
          strokeWidth="3.5"
          fill="none"
          opacity="0.3"
        />
        {/* Main cable */}
        <path
          d="M 0,20 Q 50,35 100,30 Q 150,25 200,30 Q 250,35 300,30 Q 350,25 400,30 Q 450,35 500,30 Q 550,25 600,30 Q 650,35 700,30 Q 750,25 800,30 Q 850,35 900,30 Q 950,25 1000,20"
          stroke={isActive ? "#1a1a1a" : "#2d2d2d"}
          strokeWidth="3"
          fill="none"
          opacity="0.9"
        />
        {/* Cable highlight/top edge */}
        <path
          d="M 0,19 Q 50,34 100,29 Q 150,24 200,29 Q 250,34 300,29 Q 350,24 400,29 Q 450,34 500,29 Q 550,24 600,29 Q 650,34 700,29 Q 750,24 800,29 Q 850,34 900,29 Q 950,24 1000,19"
          stroke="#4a4a4a"
          strokeWidth="1"
          fill="none"
          opacity="0.6"
        />
      </svg>
      
      {/* Light bulbs */}
      <div className="absolute inset-0 flex justify-around items-start">
        {lights.map((light) => {
          return (
            <div
              key={light.id}
              className="relative"
              style={{
                marginTop: '10px',
                animation: isActive ? `twinkle 1.5s ease-in-out infinite` : 'none',
                animationDelay: `${light.delay}s`,
              }}
            >
              {/* Wire from string to bulb */}
              <div 
                className="absolute left-1/2 -translate-x-1/2 w-0.5 bg-gray-700 -top-2 h-2"
              />
              
              {/* LED base - white plastic housing */}
              <div
                className="w-2.5 h-2 bg-white mx-auto"
                style={{
                  borderRadius: '2px 2px 0 0',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
                  background: 'linear-gradient(180deg, #f9fafb 0%, #e5e7eb 100%)',
                }}
              />
              
              {/* LED bulb - faceted gem-like appearance */}
              <div className="relative w-3.5 h-5.5 mx-auto">
                <svg
                  viewBox="0 0 16 20"
                  className="w-full h-full transition-all duration-300"
                  style={{
                    filter: isActive 
                      ? `drop-shadow(0 0 6px ${light.color}) drop-shadow(0 0 12px ${light.color}cc) drop-shadow(0 0 18px ${light.color}66)`
                      : 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))',
                  }}
                >
                  {/* Main LED body - strawberry/dome shape */}
                  <path
                    d="M 2 2 L 2 10 Q 2 16 8 18 Q 14 16 14 10 L 14 2 Q 12 0 8 0 Q 4 0 2 2 Z"
                    fill={isActive ? light.color : '#374151'}
                    opacity={isActive ? '0.9' : '1'}
                  />
                  
                  {/* Top facet - bright highlight */}
                  <ellipse
                    cx="8"
                    cy="4"
                    rx="4"
                    ry="2.5"
                    fill="white"
                    opacity={isActive ? '0.5' : '0.2'}
                  />
                  
                  {/* Left facet highlight */}
                  <path
                    d="M 3 3 L 3 10 Q 3 14 5 16 L 5 3 Z"
                    fill="white"
                    opacity={isActive ? '0.35' : '0.15'}
                  />
                  
                  {/* Right facet shadow */}
                  <path
                    d="M 13 3 L 13 10 Q 13 14 11 16 L 11 3 Z"
                    fill="black"
                    opacity="0.15"
                  />
                  
                  {/* Bottom glow when active */}
                  {isActive && (
                    <ellipse
                      cx="8"
                      cy="16"
                      rx="5"
                      ry="2"
                      fill={light.color}
                      opacity="0.6"
                    />
                  )}
                  
                  {/* Specular highlight - glossy shine */}
                  <ellipse
                    cx="6"
                    cy="5"
                    rx="1.5"
                    ry="2.5"
                    fill="white"
                    opacity={isActive ? '0.7' : '0.3'}
                  />
                </svg>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
