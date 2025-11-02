import santaHat from "@/assets/image.png";

interface SantaHatOverlayProps {
  isActive: boolean;
}

export const SantaHatOverlay = ({ isActive }: SantaHatOverlayProps) => {
  if (!isActive) {
    return null;
  }

  return (
    <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-32 h-32 pointer-events-none z-20 animate-in fade-in duration-500">
      <img
        src={santaHat}
        alt="Santa Hat"
        className="w-full h-full object-contain"
        style={{
          filter: 'drop-shadow(0 6px 12px rgba(0, 0, 0, 0.3))',
          transform: 'rotate(-10deg) translateX(8px) scale(1.1)',
          backgroundColor: 'transparent',
          mixBlendMode: 'normal',
        }}
      />
    </div>
  );
};
