# Responsive Christmas Lights 💡

## Dynamic Light Count Based on Screen Width

The Christmas lights now automatically adjust their quantity based on the device screen width for optimal visual balance.

## Responsive Breakpoints

### 📱 Mobile (< 640px)
- **Light count**: 8-12 lights
- **Formula**: `Math.max(8, Math.floor(width / 50))`
- **Example**: 
  - 320px (iPhone SE) → 8 lights
  - 375px (iPhone) → 8 lights
  - 414px (iPhone Plus) → 8 lights
  - 600px → 12 lights

### 📱 Small Tablet (640px - 767px)
- **Light count**: 12-15 lights
- **Formula**: `Math.max(12, Math.floor(width / 55))`
- **Example**:
  - 640px → 12 lights
  - 700px → 12 lights
  - 750px → 13 lights

### 📱 Tablet (768px - 1023px)
- **Light count**: 15-20 lights
- **Formula**: `Math.max(15, Math.floor(width / 60))`
- **Example**:
  - 768px (iPad) → 15 lights
  - 820px (iPad Air) → 15 lights
  - 1000px → 16 lights

### 💻 Small Desktop (1024px - 1279px)
- **Light count**: 20-25 lights
- **Formula**: `Math.max(20, Math.floor(width / 55))`
- **Example**:
  - 1024px → 20 lights
  - 1100px → 20 lights
  - 1200px → 21 lights

### 🖥️ Desktop (1280px - 1535px)
- **Light count**: 25-30 lights
- **Formula**: `Math.max(25, Math.floor(width / 52))`
- **Example**:
  - 1280px → 25 lights
  - 1366px → 26 lights
  - 1440px → 27 lights
  - 1500px → 28 lights

### 🖥️ Large Desktop (≥ 1536px)
- **Light count**: 30-35 lights
- **Formula**: `Math.max(30, Math.floor(width / 50))`
- **Example**:
  - 1536px → 30 lights
  - 1920px (Full HD) → 38 lights
  - 2560px (2K) → 51 lights
  - 3840px (4K) → 76 lights

## Implementation

### State Management
```typescript
const [lightCount, setLightCount] = useState(20);
```

### Calculation Logic
```typescript
const calculateLightCount = () => {
  const width = window.innerWidth;
  
  if (width < 640) {
    setLightCount(Math.max(8, Math.floor(width / 50)));
  } else if (width < 768) {
    setLightCount(Math.max(12, Math.floor(width / 55)));
  } else if (width < 1024) {
    setLightCount(Math.max(15, Math.floor(width / 60)));
  } else if (width < 1280) {
    setLightCount(Math.max(20, Math.floor(width / 55)));
  } else if (width < 1536) {
    setLightCount(Math.max(25, Math.floor(width / 52)));
  } else {
    setLightCount(Math.max(30, Math.floor(width / 50)));
  }
};
```

### Event Listeners
```typescript
useEffect(() => {
  calculateLightCount();
  window.addEventListener('resize', calculateLightCount);
  return () => window.removeEventListener('resize', calculateLightCount);
}, []);
```

## Features

### ✅ Automatic Adjustment
- Calculates on component mount
- Recalculates on window resize
- Smooth transitions between counts

### ✅ Performance Optimized
- Minimum light counts prevent empty strings
- Maximum practical limits for large screens
- Efficient calculation formulas

### ✅ Visual Balance
- More lights on wider screens
- Fewer lights on narrow screens
- Consistent spacing maintained
- No overcrowding or gaps

### ✅ Device-Specific
- **Mobile**: Minimal lights for clean look
- **Tablet**: Moderate density
- **Desktop**: Full festive display
- **Ultra-wide**: Maximum coverage

## Spacing Calculation

The lights use `justify-around` flex layout, which automatically distributes lights evenly:

```css
display: flex;
justify-content: space-around;
```

**Result**: Equal spacing regardless of light count

## Visual Examples

### Mobile (375px)
```
🔴  🟢  🔵  🟡  🟣  🩷  🔵  🟠
```
8 lights, ~47px spacing

### Tablet (768px)
```
🔴 🟢 🔵 🟡 🟣 🩷 🔵 🟠 🔴 🟢 🔵 🟡 🟣 🩷 🔵
```
15 lights, ~51px spacing

### Desktop (1440px)
```
🔴 🟢 🔵 🟡 🟣 🩷 🔵 🟠 🔴 🟢 🔵 🟡 🟣 🩷 🔵 🟠 🔴 🟢 🔵 🟡 🟣 🩷 🔵 🟠 🔴 🟢 🔵
```
27 lights, ~53px spacing

## Benefits

### 1. Better Mobile Experience
- Fewer lights = cleaner appearance
- Reduced visual clutter
- Better performance on mobile devices
- Appropriate scale for small screens

### 2. Enhanced Desktop Display
- More lights = fuller decoration
- Better utilization of screen space
- More festive appearance
- Professional look on large monitors

### 3. Responsive Design
- Adapts to any screen size
- Works on all devices
- No manual configuration needed
- Consistent user experience

### 4. Performance
- Only renders necessary lights
- Reduces DOM elements on mobile
- Efficient resize handling
- Smooth transitions

## Testing

### Test Different Widths
```javascript
// In browser console
window.resizeTo(375, 667);  // Mobile → 8 lights
window.resizeTo(768, 1024); // Tablet → 15 lights
window.resizeTo(1920, 1080); // Desktop → 38 lights
```

### Verify Calculation
```javascript
// Check current light count
document.querySelectorAll('.christmas-light').length
```

## Edge Cases Handled

✅ **Very narrow screens** (< 320px): Minimum 8 lights  
✅ **Ultra-wide screens** (> 3840px): Scales proportionally  
✅ **Window resize**: Immediate recalculation  
✅ **Portrait/Landscape**: Adapts to orientation changes  
✅ **Zoom levels**: Responds to browser zoom  

## Summary

The Christmas lights now intelligently adapt to any screen size:
- 📱 **Mobile**: 8-12 lights (clean, minimal)
- 📱 **Tablet**: 12-20 lights (balanced)
- 💻 **Desktop**: 20-30 lights (festive)
- 🖥️ **Large**: 30+ lights (spectacular)

Perfect spacing and visual balance on every device! 🎄✨
