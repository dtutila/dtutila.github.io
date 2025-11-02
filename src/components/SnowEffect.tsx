import { useEffect, useState } from "react";

interface Snowflake {
  id: number;
  left: number;
  animationDuration: number;
  size: number;
  delay: number;
}

interface SnowEffectProps {
  tilt?: { x: number; y: number };
}

export const SnowEffect = ({ tilt = { x: 0, y: 0 } }: SnowEffectProps) => {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

  useEffect(() => {
    // Generate 50 snowflakes with random properties
    const flakes: Snowflake[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      animationDuration: 10 + Math.random() * 20, // 10-30 seconds
      size: 2 + Math.random() * 4, // 2-6px
      delay: Math.random() * 5, // 0-5 seconds delay
    }));
    setSnowflakes(flakes);
  }, []);

  // Calculate horizontal drift based on tilt
  const horizontalDrift = tilt.x * 100; // -100 to 100 pixels

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Falling snowflakes */}
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute animate-snowfall-accumulate"
          style={{
            left: `${flake.left}%`,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            animationDuration: `${flake.animationDuration}s`,
            animationDelay: `${flake.delay}s`,
            transform: `translateX(${horizontalDrift}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        >
          <div
            className="rounded-full bg-white opacity-80"
            style={{
              width: '100%',
              height: '100%',
              boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
            }}
          />
        </div>
      ))}
    </div>
  );
};
