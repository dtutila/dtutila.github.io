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
      // Generate burst of snowflakes when shaking with velocity
      const newFlakes = Array.from({ length: 50 }, (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 3 + Math.random() * 5,
        delay: Math.random() * 0.2,
        velocityX: (Math.random() - 0.5) * 2, // -1 to 1
        velocityY: (Math.random() - 0.5) * 2, // -1 to 1
      }));
      setSnowflakes(newFlakes);

      // Clear snowflakes after animation
      const timer = setTimeout(() => setSnowflakes([]), 2500);
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
