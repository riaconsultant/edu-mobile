---
name: create-screen
description: "Interactive prompt to create a new screen for the EduNectar app."
---

# Create a New Screen

Use this prompt to quickly scaffold a new Expo Router screen with proper structure, typing, and theming.

## Inputs

- **Screen name** (kebab-case): The name of the new screen (e.g., `student-grades`, `parent-dashboard`)
- **Screen type**: `list` (shows items), `detail` (single item detail), `form` (user input), `dashboard` (summary/overview)
- **User roles**: Which roles can access this screen (e.g., `teacher`, `parent`, `student`)
- **API endpoint** (optional): The endpoint to fetch data from (e.g., `ENDPOINTS.announcements`)
- **Key data fields**: Main fields to display (e.g., `title`, `date`, `description`)

## Output

A complete screen file (`app/[screen-name].tsx`) with:

- Proper imports and component structure
- Type-safe data fetching with error handling
- `ThemedView` and `ThemedText` for consistency
- Loading/error states
- Role-based access control pattern
- Navigation links to detail screens (if list type)
- Proper styling with StyleSheet

## Example

Creating a screen for "Class Announcements" (teacher role):

```
Screen name: class-announcements
Type: list
Roles: teacher
Endpoint: ENDPOINTS.announcements
Fields: id, title, date, description, targetClass
```

Generates:

```tsx
// app/class-announcements.tsx
import { StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { ENDPOINTS } from "@/constants/endpoints";

interface Announcement {
  id: string;
  title: string;
  date: string;
  description: string;
  targetClass: string;
}

export default function ClassAnnouncements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadAnnouncements();
  }, []);

  const loadAnnouncements = async () => {
    try {
      setError(null);
      const res = await fetch(ENDPOINTS.announcements);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      setAnnouncements(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <ThemedText>Loading...</ThemedText>;
  if (error) return <ThemedText type="subtitle">Error: {error}</ThemedText>;

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Class Announcements</ThemedText>
      {announcements.map((announcement) => (
        <ThemedView key={announcement.id} style={styles.item}>
          <ThemedText type="subtitle">{announcement.title}</ThemedText>
          <ThemedText>{announcement.date}</ThemedText>
          <ThemedText>{announcement.description}</ThemedText>
        </ThemedView>
      ))}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  item: {
    marginVertical: 8,
    padding: 12,
    borderRadius: 8,
    borderColor: "#ccc",
    borderWidth: 1,
  },
});
```

## Best Practices

- **Always fetch in `useEffect`**: Avoid fetching during render
- **Use `useState` for data**: No Redux/Zustand; keep it simple
- **Error handling**: Include try-catch; display error message to user
- **Loading state**: Show loading indicator while fetching
- **Theme consistency**: Use `ThemedView`, `ThemedText` for all UI
- **TypeScript**: Define interfaces for all data types
- **Role checking**: Add role-based access guard if restricted to specific roles

## Related Workflows

- Use `/create-component` to build reusable UI components
- Use `/integrate-api` to configure new API endpoints
- See `.github/instructions/app.instructions.md` for detailed patterns
