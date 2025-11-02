# Snowball Shake Effect - Cross-Platform Compatibility

## Overview
The snowball shake effect detects device motion and creates a visual snow burst animation when the user shakes their mobile device.

## Platform Compatibility

### ✅ Android
- **Chrome**: Full support, auto-enabled
- **Firefox**: Full support, auto-enabled
- **Samsung Internet**: Full support, auto-enabled
- **Edge**: Full support, auto-enabled
- No permission required

### ✅ iOS (Safari)
- **iOS 13+**: Requires user permission (button shown automatically)
- **iOS 12 and below**: Auto-enabled, no permission required
- **Chrome/Firefox on iOS**: Uses Safari WebView, same behavior as Safari

### ✅ Other Mobile Browsers
- **Opera Mobile**: Full support
- **UC Browser**: Full support
- **Brave**: Full support

## Features

### 1. Automatic Permission Handling
- **iOS 13+**: Shows "Enable Shake Effect" button
- **Android/Older iOS**: Auto-enabled on page load
- Permission button appears at bottom center of screen
- Button auto-hides after permission granted

### 2. Smart Shake Detection
- Uses device accelerometer data
- Multiple detection algorithms for reliability:
  - Dual-axis threshold detection
  - Combined acceleration threshold
- Prevents false positives with 100ms debounce
- Prevents rapid re-triggers with 1-second cooldown

### 3. Visual Effect
- 30 snowflakes burst across screen
- Random positions, sizes, and delays
- Chaotic movement with rotation and scaling
- 1.5-second animation duration
- Automatic cleanup after 2 seconds

## Technical Implementation

### Hook: `useDeviceShake`
```typescript
const { isShaking, requestPermission, permissionGranted } = useDeviceShake();
```

**Returns:**
- `isShaking`: boolean - true when shake detected
- `requestPermission`: function - manually request iOS permission
- `permissionGranted`: boolean - permission status

**Features:**
- Checks for DeviceMotionEvent support
- Handles both `accelerationIncludingGravity` and `acceleration`
- Null-safe value handling
- Passive event listeners for better performance
- Proper cleanup on unmount

### Component: `SnowballShakeEffect`
- Renders burst of snowflakes on shake
- High z-index (100) to appear above all content
- Pointer-events disabled (non-interactive)
- Automatic state management

### Component: `ShakePermissionButton`
- Only shown on iOS 13+ when permission needed
- Animated entrance from bottom
- Loading state during permission request
- Auto-hides after permission granted

## Browser API Support

### DeviceMotionEvent
- **Supported**: All modern mobile browsers
- **iOS 13+ Requirement**: User gesture + permission
- **Fallback**: Graceful degradation if not supported

### Acceleration Data
- Primary: `accelerationIncludingGravity` (includes gravity)
- Fallback: `acceleration` (gravity removed)
- Both supported for maximum compatibility

## Testing

### On Android
1. Open site on mobile device
2. Shake device vigorously
3. Snowflakes should burst immediately

### On iOS 13+
1. Open site on mobile device
2. Tap "Enable Shake Effect" button
3. Grant permission in system dialog
4. Shake device vigorously
5. Snowflakes should burst

### On iOS 12 and below
1. Open site on mobile device
2. Shake device vigorously
3. Snowflakes should burst immediately (no permission needed)

## Troubleshooting

### Shake not detected
- Ensure device has accelerometer
- Try shaking more vigorously
- Check browser console for errors
- Verify permission granted (iOS 13+)

### Permission button not showing (iOS)
- Check iOS version (13+ required)
- Verify in Safari browser
- Clear browser cache and reload

### Effect not working
- Check DeviceMotionEvent support: `window.DeviceMotionEvent`
- Verify HTTPS connection (required for some browsers)
- Check browser console for permission errors

## Performance

- **Event throttling**: 100ms between checks
- **Passive listeners**: No scroll blocking
- **Cleanup**: Automatic removal of event listeners
- **Memory**: Snowflakes cleared after animation
- **Battery impact**: Minimal (only active when page open)

## Security & Privacy

- Only activates with user interaction (iOS)
- No data collection or transmission
- No background activity
- Permission can be revoked in browser settings
- Respects browser privacy settings
