# Snowball Shake Effect - Platform Behavior

## Overview

Snowfall remains visual-only on iPhone and iPad. Device motion is used only on
supported non-iOS devices while Christmas snow mode is active.

## Platform behavior

### Android

- Chrome, Firefox, Samsung Internet, and Edge can use `DeviceMotionEvent` when
  the browser and device expose it.
- No application-level permission prompt is shown.
- The passive motion listener is attached only while snow mode is active.
- Shaking triggers the snowball burst; tilting steers falling snow.
- Browsers that suppress or do not expose motion data degrade gracefully to
  ordinary snowfall.

### iPhone and iPad

- Shake detection and tilt steering are intentionally disabled.
- The site never calls `DeviceMotionEvent.requestPermission()`.
- No motion-permission button or native permission dialog is shown.
- Ordinary snowfall, the Santa hat, lights, and footer accumulation continue
  to work normally.

### Desktop and unsupported devices

- No motion listener is attached when `DeviceMotionEvent` is unavailable.
- All non-motion seasonal effects continue to work.

## Detection

`useDeviceShake` excludes both classic iOS user agents and iPadOS devices that
identify as macOS:

```typescript
const isIOSDevice = () =>
  /iPad|iPhone|iPod/.test(navigator.userAgent) ||
  (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
```

The hook is enabled by the current snow-mode state:

```typescript
const { isShaking, tilt } = useDeviceShake(isSnowActive);
```

## Motion processing on supported devices

- Reads `accelerationIncludingGravity`, falling back to `acceleration`.
- Samples at most once every 100ms.
- Uses dual-axis and combined-acceleration thresholds.
- Applies a one-second cooldown between shake detections.
- Normalizes tilt to the `-1...1` range.
- Removes the listener when snow mode is disabled or the component unmounts.
- Respects the operating system's reduced-motion preference for rendered
  animations.

## Testing

### Android

1. Open the HTTPS site during Christmas season in dark mode.
2. Confirm snowfall appears without a permission prompt.
3. Tilt the device and verify the snow drift changes.
4. Shake the device and verify the snowball burst appears.

### iOS/iPadOS

1. Open the site during Christmas season in dark mode.
2. Confirm snowfall appears.
3. Confirm no motion-permission button or native permission prompt appears.
4. Confirm shaking and tilting do not activate motion effects.
