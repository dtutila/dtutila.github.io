# Christmas Season Behavior

## Auto-Activation Logic ✅

The Christmas effects are **ONLY active in DARK MODE during November and December**.

### Dual Requirements
```typescript
// Must satisfy BOTH conditions:
1. isChristmasSeason() → month === 10 || month === 11
2. isDarkMode() → document.documentElement.classList.contains('dark')
```

### Theme Behavior

#### 🌙 Dark Mode (During Nov/Dec)
**Auto-activated on page load:**
- ✅ Falling snow effect
- ✅ Santa hat on circle image
- ✅ Christmas lights (twinkling)
- ✅ Snow accumulation on footer
- ✅ Shake effect enabled
- ✅ Tilt-responsive snow
- ✅ Santa hat toggle button visible

**Dynamic behavior:**
- Switching to light mode → Christmas effects immediately disabled
- Switching back to dark mode → Christmas effects re-enabled
- User can manually toggle off via Santa hat button

#### ☀️ Light Mode (Any Time)
**Never activated:**
- ❌ No Christmas effects
- ❌ No Santa hat button
- ❌ All Christmas features hidden
- ❌ Even during November/December

**Why:**
- Christmas theme designed for dark mode only
- Better visual contrast and atmosphere
- Automatic theme detection and response

#### 🚫 January - October (Non-Christmas Season)
**Not activated:**
- ❌ No snow effect
- ❌ No Santa hat button visible
- ❌ No Christmas lights
- ❌ No Christmas features at all

**Why:**
- `isChristmasSeason()` returns `false`
- ChristmasHat component returns `null` (not rendered)
- EasterEggContext does not auto-activate snow

## Implementation Details

### 1. EasterEggContext (`/src/contexts/EasterEggContext.tsx`)
```typescript
useEffect(() => {
  const checkAndActivate = () => {
    if (isChristmasSeason() && isDarkMode()) {
      setIsSnowActive(true);  // Auto-activate during Nov/Dec in dark mode
    } else {
      setIsSnowActive(false); // Disable in light mode or outside season
    }
  };

  checkAndActivate();

  // Watch for theme changes
  const observer = new MutationObserver(checkAndActivate);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  });

  return () => observer.disconnect();
}, []);
```
- Runs on mount and watches for theme changes
- Only activates if BOTH Christmas season AND dark mode
- Automatically disables when switching to light mode
- Re-enables when switching back to dark mode

### 2. ChristmasHat Component (`/src/components/ChristmasHat.tsx`)
```typescript
useEffect(() => {
  const currentMonth = new Date().getMonth();
  const isChristmas = currentMonth === 10 || currentMonth === 11;
  setIsChristmasSeason(isChristmas);
}, []);

if (!isDarkMode || !isChristmasSeason) {
  return null;  // Don't render outside Nov/Dec or in light mode
}
```
- Checks month on mount
- Only renders if:
  - Dark mode is active
  - Current month is November or December

### 3. All Christmas Components
All Christmas-related components check `isSnowActive` from context:
- `SnowEffect` - Falling snow
- `ChristmasLights` - Twinkling lights
- `SantaHatOverlay` - Hat on circle
- `SnowAccumulation` - Footer snow
- `SnowballShakeEffect` - Shake animation

## Testing

### Test November/December Behavior
```javascript
// In browser console, temporarily change date
const originalDate = Date;
global.Date = class extends Date {
  getMonth() {
    return 10; // November
  }
};
// Reload page - Christmas effects should auto-activate
```

### Test Other Months
```javascript
// In browser console
global.Date = class extends Date {
  getMonth() {
    return 5; // June
  }
};
// Reload page - No Christmas effects, button not visible
```

## User Experience

### During Christmas Season (Nov/Dec)
1. User visits site in dark mode
2. Snow automatically starts falling
3. Santa hat appears on circle
4. Christmas lights twinkle in header
5. Snow accumulates on footer
6. User can shake device for burst effect
7. User can toggle off via Santa hat button

### Outside Christmas Season (Jan-Oct)
1. User visits site
2. No Christmas effects visible
3. No Santa hat button in header
4. Normal site experience
5. No performance impact from Christmas code

## Performance Notes

- **Date check**: Runs once on mount, minimal overhead
- **Conditional rendering**: Christmas components not rendered outside season
- **No memory leaks**: All effects properly cleaned up
- **Lazy loading**: Effects only active when needed

## Summary

✅ **Christmas effects ONLY active during November and December**  
✅ **Auto-activated on page load during season**  
✅ **Requires dark mode**  
✅ **User can toggle off**  
✅ **Completely hidden outside season**  
✅ **No performance impact when inactive**
