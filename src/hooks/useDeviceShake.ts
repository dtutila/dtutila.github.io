import { useCallback, useEffect, useRef, useState } from "react";

type DeviceMotionConstructorWithPermission = typeof DeviceMotionEvent & {
  requestPermission?: () => Promise<"granted" | "denied">;
};

const getMotionConstructor = () =>
  window.DeviceMotionEvent as DeviceMotionConstructorWithPermission | undefined;

export const useDeviceShake = (enabled: boolean, threshold = 15) => {
  const motionConstructor = getMotionConstructor();
  const requiresPermission = typeof motionConstructor?.requestPermission === "function";
  const [isShaking, setIsShaking] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(!requiresPermission);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const lastShakeTime = useRef(0);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Request permission function for iOS
  const requestPermission = useCallback(async () => {
    const constructor = getMotionConstructor();

    if (typeof constructor?.requestPermission === "function") {
      try {
        const granted = await constructor.requestPermission() === "granted";
        setPermissionGranted(granted);
        return granted;
      } catch (error) {
        console.warn("Device motion permission was not granted:", error);
        return false;
      }
    }

    const supported = Boolean(constructor);
    setPermissionGranted(supported);
    return supported;
  }, []);

  useEffect(() => () => clearTimeout(resetTimer.current), []);

  useEffect(() => {
    if (!enabled || !motionConstructor || (requiresPermission && !permissionGranted)) {
      return;
    }

    let lastX = 0;
    let lastY = 0;
    let lastZ = 0;
    let lastUpdate = 0;
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
        if (now - lastShakeTime.current > 1000) {
          setIsShaking(true);
          lastShakeTime.current = now;
          
          clearTimeout(resetTimer.current);
          resetTimer.current = setTimeout(() => setIsShaking(false), 2000);
        }
      }

      lastX = x;
      lastY = y;
      lastZ = z;
    };

    window.addEventListener("devicemotion", handleMotion, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener("devicemotion", handleMotion);
    };
  }, [enabled, motionConstructor, permissionGranted, requiresPermission, threshold]);

  return { isShaking, requestPermission, permissionGranted, requiresPermission, tilt };
};
