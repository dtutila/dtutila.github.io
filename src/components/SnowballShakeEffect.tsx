import { useEffect, useState } from 'react';

interface SnowballShakeEffectProps {
  isShaking: boolean;
}

export const SnowballShakeEffect = ({ isShaking }: SnowballShakeEffectProps) => {
  const [snowflakes, setSnowflakes] = useState<Array<{ id: number; x: number; y: number; size: number; delay: number }>>([]);

  useEffect(() => {
    if (isShaking) {
      // Generate burst of snowflakes when shaking
      const newFlakes = Array.from({ length: 30 }, (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 3 + Math.random() * 5,
        delay: Math.random() * 0.3,
      }));
      setSnowflakes(newFlakes);

      // Clear snowflakes after animation
      const timer = setTimeout(() => setSnowflakes([]), 2000);
      return () => clearTimeout(timer);
    }
  }, [isShaking]);

  if (!isShaking && snowflakes.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute animate-shake-snow"
          style={{
            left: `${flake.x}%`,
            top: `${flake.y}%`,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            animationDelay: `${flake.delay}s`,
          }}
        >
          <div
            className="w-full h-full rounded-full bg-white"
            style={{
              boxShadow: '0 0 8px rgba(255, 255, 255, 0.8)',
              opacity: 0.9,
            }}
          />
        </div>
      ))}
    </div>
  );
};
