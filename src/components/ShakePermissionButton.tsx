import { useState, useEffect } from 'react';

interface ShakePermissionButtonProps {
  requestPermission: () => Promise<boolean>;
  permissionGranted: boolean;
}

export const ShakePermissionButton = ({ requestPermission, permissionGranted }: ShakePermissionButtonProps) => {
  const [needsPermission, setNeedsPermission] = useState(false);
  const [isRequesting, setIsRequesting] = useState(false);

  useEffect(() => {
    // Check if we need to show permission button (iOS 13+)
    if (typeof (DeviceMotionEvent as any).requestPermission === 'function' && !permissionGranted) {
      setNeedsPermission(true);
    }
  }, [permissionGranted]);

  const handleRequest = async () => {
    setIsRequesting(true);
    const granted = await requestPermission();
    setIsRequesting(false);
    if (granted) {
      setNeedsPermission(false);
    }
  };

  if (!needsPermission) return null;

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom duration-500">
      <button
        onClick={handleRequest}
        disabled={isRequesting}
        className="px-6 py-3 bg-primary text-primary-foreground rounded-lg shadow-lg hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
      >
        <span className="text-2xl">📱</span>
        <span className="font-medium">
          {isRequesting ? 'Requesting...' : 'Enable Shake Effect'}
        </span>
      </button>
    </div>
  );
};
