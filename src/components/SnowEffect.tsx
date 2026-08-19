import { useState } from "react";

interface Snowflake {
  id: number;
  left: number;
  animationDuration: number;
  size: number;
  delay: number;
  drift: number;
}

interface SnowEffectProps {
  tilt?: { x: number; y: number };
}

export const SnowEffect = ({ tilt = { x: 0, y: 0 } }: SnowEffectProps) => {
  const [snowflakes] = useState<Snowflake[]>(() =>
    Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      animationDuration: 10 + Math.random() * 20, // 10-30 seconds
      size: 2 + Math.random() * 4, // 2-6px
      delay: Math.random() * 5, // 0-5 seconds delay
      drift: (Math.random() - 0.5) * 80,
    })),
  );

  // Calculate horizontal drift based on tilt
  const horizontalDrift = tilt.x * 100; // -100 to 100 pixels

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden" aria-hidden="true">
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
            '--snow-drift': `${flake.drift + horizontalDrift}px`,
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
