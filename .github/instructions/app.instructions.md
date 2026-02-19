---
applyTo: "app/**"
name: app-instructions
description: "Instructions for building screens in the EduNectar app. Use when: creating new screens, modifying routing, adding detail views, or handling navigation."
---

# App Directory Instructions (Screens & Routing)

## Purpose
`app/` contains all screens (file-based routes) via Expo Router, organized by navigation structure:
- `LoginScreen.tsx` — Authentication entry point
- `/(tabs)/_layout.tsx` + screens → Bottom-tab navigation
- Detail screens with Stack navigation → `announcement-detail.tsx`, `assignment.tsx`, etc.

## Routing Architecture

### Entry Point
```tsx
// app/_layout.tsx
export default function RootLayout() {
  return <Stack screenOptions={...} />;
}
```

### Tab Navigation  
```tsx
// app/(tabs)/_layout.tsx
export default function TabLayout() {
  return (
    <BottomTabNavigator
      screenOptions={{
        tabBarIcon: ({ color, size }) => <IconSymbol name="house.fill" size={size} color={color} />
      }}
    >
      <BottomTab.Screen name="index" component={DashboardScreen} />
      <BottomTab.Screen name="feed" component={FeedScreen} />
    </BottomTabNavigator>
  );
}
```

### File-Based Routes
- **Kebab-case filenames** → `announcement.tsx`, `student-profile.tsx`
- **Folder routing** → `/announcement-detail.tsx` matches route `/announcement-detail`
- **Platform-specific overrides** → `IconSymbol.ios.tsx` overrides `IconSymbol.tsx` on iOS
- **Dynamic routes** → `[id].tsx` for parameterized routes (e.g., `/announcement/[id]`, `/student-profile/[studentId]`)

## Screen Template

### Basic Screen Structure
```tsx
// app/my-screen.tsx
import { StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { ENDPOINTS } from '@/constants/endpoints';

interface DataType {
  id: string;
  title: string;
  // ... other fields
}

export default function MyScreen() {
  const [data, setData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await fetch(ENDPOINTS.myData);
      if (!res.ok) throw new Error('Failed to fetch');
      
      const json = await res.json();
      setData(json);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <ThemedText>Loading...</ThemedText>;
  if (error) return <ThemedText type="subtitle">Error: {error}</ThemedText>;

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">My Screen</ThemedText>
      {data.map(item => (
        <ThemedView key={item.id} style={styles.item}>
          <ThemedText>{item.title}</ThemedText>
        </ThemedView>
      ))}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  item: { marginVertical: 8, padding: 12, borderRadius: 8 },
});
```

## Navigation Patterns

### Navigate to Detail Screen
```tsx
import { useRouter } from 'expo-router';

export default function ListView() {
  const router = useRouter();

  return (
    <Pressable onPress={() => router.push(`/announcement-detail/${id}`)}>
      <ThemedText>View Announcement</ThemedText>
    </Pressable>
  );
}
```

### Accessing Route Params
```tsx
// app/announcement-detail.tsx
import { useLocalSearchParams } from 'expo-router';

export default function AnnouncementDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  // Use `id` to fetch data
}
```

### Authentication Flow
```tsx
// app/LoginScreen.tsx
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const router = useRouter();

  const handleLogin = async (email: string) => {
    // Validate email / call API
    router.replace('/(tabs)');
  };

  return (
    // Form UI
  );
}
```

## Best Practices

### Screen Organization
1. **Imports** → React/Expo, UI components, hooks, utilities
2. **Type definitions** → Interface declarations for data
3. **Functional component** → Default export named `default`
4. **State** → `useState` for local data, `useEffect` for API calls
5. **Render** → JSX with `ThemedView`/`ThemedText` components
6. **Styles** → Bottom of file via `StyleSheet.create()`

### Error Handling
Always include try-catch and error state:
```tsx
const loadData = async () => {
  try {
    setError(null);
    const res = await fetch(ENDPOINTS.data);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    setData(await res.json());
  } catch (err) {
    setError(err instanceof Error ? err.message : 'Unknown error');
  }
};
```

### Role-Based Views
Check role context and filter UI/data accordingly:
```tsx
const userRole = useUserRole(); // Custom hook (not yet in codebase)

if (userRole === 'teacher') {
  return <TeacherView />;
} else if (userRole === 'parent') {
  return <ParentView />;
}
```

## Role-Based Screens (from `docs/modules-access.md`)

### Teacher-Only Screens
- `attendance.tsx` — Mark/view attendance, send alerts
- `class-diary.tsx` — Class diary/notes

### Parent-Only Screens
- `fees.tsx` — Fee management, payments
- `bus-tracking.tsx` — Real-time bus GPS tracking

### Shared Screens
- `announcement.tsx` — View school announcements
- `feed.tsx` — Activity feed
- `notifications.tsx` — Notification center

## Common Tasks

### Adding a New List Screen
1. Create `app/my-list.tsx`
2. Use `useEffect` to fetch data
3. Render list items with `.map()`, each linking to detail view
4. Add to `/(tabs)/_layout.tsx` if it's a tab

### Adding a Detail Screen
1. Create `app/my-item-detail.tsx`
2. Extract route params via `useLocalSearchParams()`
3. Fetch item data using param (e.g., `id`)
4. Display detail, include back button via `useRouter()`

### Adding to Role-Based Menu
1. Create screen in `app/`
2. Update `docs/modules-access.md` to document role access
3. Add conditional rendering in parent screens based on user role
4. Test in emulator for the specific role

## Related Files
- `constants/endpoints.ts` — API endpoint configuration
- `hooks/useThemeColor.ts` — Theme hook for styling
- `docs/modules-access.md` — Role-based menu structure reference
