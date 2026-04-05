---
name: create-component
description: "Interactive prompt to create a reusable UI component for the EduNectar app."
---

# Create a New Component

Use this prompt to scaffold a new reusable component with proper theming, typing, and export structure.

## Inputs

- **Component name** (PascalCase): The name of the component (e.g., `AnnouncementCard`, `StudentRow`)
- **Component type**: `basic` (simple wrapper), `themed` (uses light/dark mode), `interactive` (handles user input), `compound` (composition of multiple sub-components)
- **Props**: List of props the component accepts (e.g., `title: string`, `onPress: () => void`, `status: 'active' | 'inactive'`)
- **Purpose/description**: Brief description of what the component does
- **Location**: `root` (components/ root) or `ui` (components/ui/ for primitives)

## Output

A complete component file (`components/[ComponentName].tsx`) with:

- Proper TypeScript interfaces for props
- `useThemeColor()` hook integration for light/dark support
- Native `StyleSheet` for styling
- Platform-aware (handles `.ios.tsx` if needed)
- Exported as named export
- Example usage in JSDoc comments
- Accessibility considerations

## Example

Creating a "StudentCard" component for displaying student info:

```
Name: StudentCard
Type: themed
Props:
  - id: string
  - name: string
  - grade: string
  - status: 'active' | 'inactive'
  - onPress?: () => void
Purpose: Display student info in a card layout with theme support
Location: root
```

Generates:

```tsx
// components/StudentCard.tsx
import { Pressable, StyleSheet } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

interface StudentCardProps {
  id: string;
  name: string;
  grade: string;
  status: "active" | "inactive";
  onPress?: () => void;
  style?: any;
}

/**
 * StudentCard — Displays student information in a themed card layout.
 *
 * @example
 * <StudentCard
 *   id="123"
 *   name="Alice"
 *   grade="Grade 5"
 *   status="active"
 *   onPress={() => navigate(`/student/${id}`)}
 * />
 */
export function StudentCard({
  id,
  name,
  grade,
  status,
  onPress,
  style,
}: StudentCardProps) {
  const backgroundColor = useThemeColor({}, "background");
  const borderColor = status === "active" ? "#34C759" : "#999";

  return (
    <Pressable
      onPress={onPress}
      style={[styles.container, { backgroundColor, borderColor }, style]}
    >
      <ThemedView style={styles.content}>
        <ThemedText type="subtitle">{name}</ThemedText>
        <ThemedText type="default">{grade}</ThemedText>
        <ThemedText style={[styles.status, { color: borderColor }]}>
          {status === "active" ? "✓ Active" : "○ Inactive"}
        </ThemedText>
      </ThemedView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
    flex: 1,
  },
  content: { gap: 4 },
  status: { fontSize: 12, fontWeight: "500", marginTop: 8 },
});
```

## Best Practices

- **Accept `style` prop**: Allow consumers to override styles
- **Use `useThemeColor()`**: Never hardcode colors; adapt to light/dark mode
- **TypeScript first**: Define interfaces; avoid `any` types
- **Presentational only**: No complex logic; pass handlers as props
- **Naming**: PascalCase for component names, consistent with React conventions
- **Exports**: Named export (not default) for tree-shaking and easier imports
- **Accessibility**: Test touch targets on iOS (min 44x44 pt), use meaningful labels
- **SF Symbols**: Use `IconSymbol` component for consistent icon usage

## Advanced: Platform-Specific Components

For iOS-specific styling, create both files:

```
components/MyComponent.ios.tsx   # iOS-specific implementation
components/MyComponent.tsx       # Default/fallback implementation
```

Expo Router will automatically use the `.ios.tsx` version on iOS.

## Related Workflows

- Use `/create-screen` to use components in screens
- See `.github/instructions/components.instructions.md` for detailed patterns
- For barrel exports, add to `components/index.tsx` for easy importing
