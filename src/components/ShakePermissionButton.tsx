import { useState } from "react";

interface ShakePermissionButtonProps {
  requestPermission: () => Promise<boolean>;
  permissionGranted: boolean;
  requiresPermission: boolean;
}

export const ShakePermissionButton = ({ requestPermission, permissionGranted, requiresPermission }: ShakePermissionButtonProps) => {
  const [isRequesting, setIsRequesting] = useState(false);

  const handleRequest = async () => {
    setIsRequesting(true);
    await requestPermission();
    setIsRequesting(false);
  };

  if (!requiresPermission || permissionGranted) return null;

  return (
    <div className="fixed bottom-20 left-1/2 z-50 w-[min(90vw,20rem)] -translate-x-1/2 animate-in slide-in-from-bottom duration-500 sm:bottom-24">
      <button
        type="button"
        onClick={handleRequest}
        disabled={isRequesting}
        className="flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-primary-foreground shadow-lg transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50"
        aria-live="polite"
      >
        <span aria-hidden="true" className="text-2xl">📱</span>
        <span className="font-medium">
          {isRequesting ? 'Requesting...' : 'Enable Shake Effect'}
        </span>
      </button>
    </div>
  );
};
