import { useEffect, useState, useCallback } from 'react';

export const useDeviceShake = (threshold = 15) => {
  const [isShaking, setIsShaking] = useState(false);
  const [lastShakeTime, setLastShakeTime] = useState(0);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  // Request permission function for iOS
  const requestPermission = useCallback(async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (typeof (DeviceMotionEvent as any).requestPermission === 'function') {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const permissionState = await (DeviceMotionEvent as any).requestPermission();
        if (permissionState === 'granted') {
          setPermissionGranted(true);
          return true;
        }
        return false;
      } catch (error) {
        console.warn('DeviceMotion permission denied:', error);
        return false;
      }
    }
    // Non-iOS or older iOS - permission not needed
    setPermissionGranted(true);
    return true;
  }, []);

  useEffect(() => {
    // Check if device motion is supported
    if (!window.DeviceMotionEvent) {
      console.warn('DeviceMotion not supported on this device');
      return;
    }

    let lastX = 0;
    let lastY = 0;
    let lastZ = 0;
    let lastUpdate = 0;
    let isListening = false;

    const handleMotion = (event: DeviceMotionEvent) => {
      // Try both accelerationIncludingGravity and acceleration for compatibility
      const acceleration = event.accelerationIncludingGravity || event.acceleration;
      if (!acceleration) return;

      const currentTime = Date.now();
      
      // Only check for shake every 100ms
      if (currentTime - lastUpdate < 100) return;

      lastUpdate = currentTime;

      // Handle null values with fallback to 0
      const x = acceleration.x !== null ? acceleration.x : 0;
      const y = acceleration.y !== null ? acceleration.y : 0;
      const z = acceleration.z !== null ? acceleration.z : 0;

      // Update tilt for snow direction (normalize to -1 to 1 range)
      // X: left/right tilt, Y: forward/backward tilt
      setTilt({
        x: Math.max(-1, Math.min(1, x / 10)), // Normalize to -1 to 1
        y: Math.max(-1, Math.min(1, y / 10))
      });

      // Calculate deltas
      const deltaX = Math.abs(x - lastX);
      const deltaY = Math.abs(y - lastY);
      const deltaZ = Math.abs(z - lastZ);

      // Check if movement exceeds threshold (more lenient for better detection)
      const isShakeDetected = 
        (deltaX > threshold && deltaY > threshold) || 
        (deltaX > threshold && deltaZ > threshold) || 
        (deltaY > threshold && deltaZ > threshold) ||
        (deltaX + deltaY + deltaZ > threshold * 2.5); // Combined threshold for better detection
      
      if (isShakeDetected) {
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

    const startListening = async () => {
      if (isListening) return;

      // Request permission if needed (iOS 13+)
      const hasPermission = await requestPermission();
      
      if (hasPermission) {
        window.addEventListener('devicemotion', handleMotion, { passive: true });
        isListening = true;
      }
    };

    // Auto-start for Android and older iOS
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (typeof (DeviceMotionEvent as any).requestPermission !== 'function') {
      startListening();
    }

    // Cleanup
    return () => {
      if (isListening) {
        window.removeEventListener('devicemotion', handleMotion);
        isListening = false;
      }
    };
  }, [threshold, lastShakeTime, requestPermission]);

  return { isShaking, requestPermission, permissionGranted, tilt };
};
