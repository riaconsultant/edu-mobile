---
applyTo: "components/**"
name: components-instructions
description: "Instructions for building reusable UI components in the EduNectar app. Use when: creating new components, modifying ThemedView/ThemedText wrappers, adding icons, or building layout compounds."
---

# Components Directory Instructions

## Purpose
`components/` contains reusable UI components that support the app's theme system (light/dark mode) and cross-screen consistency.

## Key Patterns

### Themed Components
All visual components should leverage the theme system:

```tsx
import { useThemeColor } from '@/hooks/useThemeColor';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  title: string;
  style?: any;
}

export function MyComponent({ title, style }: Props) {
  const backgroundColor = useThemeColor({}, 'backgroundColor');
  const textColor = useThemeColor({}, 'text');
  
  return (
    <View style={[styles.container, { backgroundColor }, style]}>
      <Text style={[styles.title, { color: textColor }]}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, borderRadius: 8 },
  title: { fontSize: 16, fontWeight: '600' },
});
```

### Component Guidelines
- **Export from `index.tsx`**: Create barrel exports for easy importing
- **Accept style prop**: Allow consumers to override styles: `style?: any`
- **Use `useThemeColor()` hook**: Never hardcode colors; fetch from theme
- **SF Symbols for icons**: Use `IconSymbol` component for consistency
- **Prop typing**: Define interfaces for all props
- **Avoid logic**: Components should be presentational; move logic to screens

### Icon Components (`IconSymbol.tsx` & `IconSymbol.ios.tsx`)
- iOS version uses platform-specific SF Symbols
- Fallback version for Android/Web
- Usage: `<IconSymbol name="house.fill" size={24} color="gray" />`

### Layout Components
- `ThemedView`: Themed container wrapper
- `ThemedText`: Themed text with optional `type` prop (title, default, subtitle)
- `ParallaxScrollView`: Scrollable container with header
- Extend these for common patterns (card, header, footer)

## Naming & Organization
- **File naming**: PascalCase (`CardRow.tsx`, `RoleSelector.tsx`)
- **Subdirectories**: Use `ui/` for generic UI primitives, root for domain-specific components
- **Exports**: Always export as named export, not default

## Best Practices
1. **Props over logic**: Accept data, emit events, let parent handle state
2. **Composition over inheritance**: Nest components rather than inheritance
3. **Accessibility**: Test touch targets (min 44x44 pt on iOS), use meaningful labels
4. **Testing**: Consider snapshot tests for presentation-heavy components
5. **Responsive**: Use flexbox; test on multiple screen sizes

## Common Tasks

### Adding a New Themed Button
```tsx
import { Pressable, StyleSheet } from 'react-native';
import { ThemedText } from './ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
}

export function Button({ label, onPress, variant = 'primary' }: ButtonProps) {
  const bgColor = useThemeColor(
    { light: variant === 'primary' ? '#007AFF' : '#E9E9E9', dark: '#444' },
    'background'
  );
  
  return (
    <Pressable style={[styles.button, { backgroundColor: bgColor }]} onPress={onPress}>
      <ThemedText style={styles.label}>{label}</ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { paddingVertical: 12, paddingHorizontal: 16, borderRadius: 8, alignItems: 'center' },
  label: { fontWeight: '600' },
});
```

### Adding Icons
- Check available SF Symbols: [SF Symbols Reference](https://developer.apple.com/sf-symbols/)
- Keep `IconSymbol.ios.tsx` and `IconSymbol.tsx` in sync
- Usage in components: `<IconSymbol name="speech.bubble" size={20} />`

## Related Files
- `constants/Colors.ts` — Theme color definitions
- `hooks/useThemeColor.ts` — Theme hook implementation
- `hooks/useColorScheme.ts` — Light/dark scheme detection
