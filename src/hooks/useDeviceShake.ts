import { useEffect, useState } from 'react';

export const useDeviceShake = (threshold = 15) => {
  const [isShaking, setIsShaking] = useState(false);
  const [lastShakeTime, setLastShakeTime] = useState(0);

  useEffect(() => {
    let lastX = 0;
    let lastY = 0;
    let lastZ = 0;
    let lastUpdate = 0;

    const handleMotion = (event: DeviceMotionEvent) => {
      const acceleration = event.accelerationIncludingGravity;
      if (!acceleration) return;

      const currentTime = Date.now();
      
      // Only check for shake every 100ms
      if (currentTime - lastUpdate < 100) return;

      lastUpdate = currentTime;

      const x = acceleration.x ?? 0;
      const y = acceleration.y ?? 0;
      const z = acceleration.z ?? 0;

      const deltaX = Math.abs(x - lastX);
      const deltaY = Math.abs(y - lastY);
      const deltaZ = Math.abs(z - lastZ);

      // Check if movement exceeds threshold
      if ((deltaX > threshold && deltaY > threshold) || 
          (deltaX > threshold && deltaZ > threshold) || 
          (deltaY > threshold && deltaZ > threshold)) {
        
        const now = Date.now();
        // Prevent rapid repeated shakes
        if (now - lastShakeTime > 1000) {
          setIsShaking(true);
          setLastShakeTime(now);
          
          // Reset shake state after animation
          setTimeout(() => setIsShaking(false), 2000);
        }
      }

      lastX = x;
      lastY = y;
      lastZ = z;
    };

    // Request permission for iOS 13+
    if (typeof (DeviceMotionEvent as any).requestPermission === 'function') {
      (DeviceMotionEvent as any).requestPermission()
        .then((permissionState: string) => {
          if (permissionState === 'granted') {
            window.addEventListener('devicemotion', handleMotion);
          }
        })
        .catch(console.error);
    } else {
      // Non-iOS or older iOS
      window.addEventListener('devicemotion', handleMotion);
    }

    return () => {
      window.removeEventListener('devicemotion', handleMotion);
    };
  }, [threshold, lastShakeTime]);

  return isShaking;
};
