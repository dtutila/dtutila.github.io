import { useEffect, useState } from 'react';

interface SnowballShakeEffectProps {
  isShaking: boolean;
  tilt?: { x: number; y: number };
}

export const SnowballShakeEffect = ({ isShaking, tilt = { x: 0, y: 0 } }: SnowballShakeEffectProps) => {
  const [snowflakes, setSnowflakes] = useState<Array<{ 
    id: number; 
    x: number; 
    y: number; 
    size: number; 
    delay: number;
    velocityX: number;
    velocityY: number;
  }>>([]);

  useEffect(() => {
    if (isShaking) {
      // Generate burst of snowflakes when shaking with realistic velocity distribution
      const newFlakes = Array.from({ length: 60 }, (_, i) => {
        // More snowflakes in center, fewer at edges (realistic distribution)
        const angle = (Math.random() * Math.PI * 2);
        const distance = Math.random() * Math.random(); // Bias toward center
        
        return {
          id: Date.now() + i,
          x: 50 + Math.cos(angle) * distance * 40, // Centered burst
          y: 50 + Math.sin(angle) * distance * 40,
          size: 2 + Math.random() * 6, // Varied sizes
          delay: Math.random() * 0.15, // Staggered start
          velocityX: (Math.random() - 0.5) * 2.5, // -1.25 to 1.25
          velocityY: (Math.random() - 0.5) * 2.5, // -1.25 to 1.25
        };
      });
      setSnowflakes(newFlakes);

      // Clear snowflakes after animation completes
      const timer = setTimeout(() => setSnowflakes([]), 3000);
      return () => clearTimeout(timer);
    }
  }, [isShaking]);

  if (!isShaking && snowflakes.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {snowflakes.map((flake) => {
        // Apply tilt influence to snowflake movement
        const tiltInfluenceX = tilt.x * 60 * flake.velocityX;
        const tiltInfluenceY = tilt.y * 60 * flake.velocityY;
        
        return (
          <div
            key={flake.id}
            className="absolute animate-shake-snow-smooth"
            style={{
              left: `${flake.x}%`,
              top: `${flake.y}%`,
              width: `${flake.size}px`,
              height: `${flake.size}px`,
              animationDelay: `${flake.delay}s`,
              '--velocity-x': flake.velocityX,
              '--velocity-y': flake.velocityY,
              '--tilt-x': `${tiltInfluenceX}px`,
              '--tilt-y': `${tiltInfluenceY}px`,
            } as React.CSSProperties}
          >
            <div
              className="w-full h-full rounded-full bg-white"
              style={{
                boxShadow: '0 0 10px rgba(255, 255, 255, 0.9), 0 0 20px rgba(255, 255, 255, 0.5)',
                opacity: 0.95,
              }}
            />
          </div>
        );
      })}
    </div>
  );
};
