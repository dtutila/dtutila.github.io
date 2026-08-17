import pumpkin from "@/assets/pumpkin.svg";

interface PumpkinOverlayProps {
  isActive: boolean;
}

export const PumpkinOverlay = ({ isActive }: PumpkinOverlayProps) => {
  if (!isActive) {
    return null;
  }

  return (
    <div className="absolute top-[27%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none z-20 animate-in fade-in duration-500">
      <img
        src={pumpkin}
        alt="Halloween pumpkin"
        className="w-full h-full object-contain"
        style={{
          filter: 'drop-shadow(0 6px 12px rgba(0, 0, 0, 0.3)) drop-shadow(0 0 18px rgba(234, 88, 12, 0.45))',
          backgroundColor: 'transparent',
          mixBlendMode: 'normal',
        }}
      />
    </div>
  );
};
