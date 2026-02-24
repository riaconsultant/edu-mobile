---
name: integrate-api
description: "Interactive prompt to integrate a new API endpoint into the EduNectar app."
---

# Integrate a New API Endpoint

Use this prompt to configure and integrate new API endpoints into the app's data fetching layer.

## Inputs

- **Endpoint name**: What this endpoint provides (e.g., `announcements`, `class-diary`, `fee-invoices`)
- **HTTP method**: `GET`, `POST`, `PUT`, `DELETE`, `PATCH`
- **Backend path**: The actual API path (e.g., `/api/v1/announcements`, `/api/teachers/attendance`)
- **Request body** (if POST/PUT): JSON structure expected (e.g., `{ title: string, description: string }`)
- **Response structure**: JSON shape returned (e.g., `{ id: string, title: string, date: string }`)
- **Authentication**: Required headers (e.g., `Authorization: Bearer token`)
- **Query params** (if applicable): Filtering/pagination (e.g., `?role=teacher&grade=5`)
- **Error scenarios**: What can go wrong (e.g., 404 if not found, 403 if unauthorized)

## Output

1. **Updated `constants/endpoints.ts`**: New endpoint configuration
2. **Hook/utility** (if complex): Reusable fetch hook for this endpoint
3. **Screen integration example**: How to use the endpoint in a screen
4. **Error handling example**: How to handle common error cases

## Example

Integrating a "Get Class Announcements" endpoint:

```
Endpoint name: classAnnouncements
Method: GET
Path: /api/v1/announcements
Query params: role=teacher, grade=5, section=B
Response: [{ id, title, description, date, targetClass }]
Auth: Authorization header (Bearer token)
Errors: 401 (unauthorized), 500 (server error)
```

### Step 1: Update `constants/endpoints.ts`

```typescript
// constants/endpoints.ts
const BASE_URL = 'http://localhost:3000';

export const ENDPOINTS = {
  // ... existing endpoints
  
  classAnnouncements: (grade: number, section: string) => 
    `${BASE_URL}/api/v1/announcements?role=teacher&grade=${grade}&section=${section}`,
  
  announcementById: (id: string) => 
    `${BASE_URL}/api/v1/announcements/${id}`,
  
  createAnnouncement: `${BASE_URL}/api/v1/announcements`, // POST
};
```

### Step 2: Create a reusable fetch hook (if complex)

```typescript
// hooks/useClassAnnouncements.ts
import { useState, useEffect } from 'react';
import { ENDPOINTS } from '@/constants/endpoints';

export interface Announcement {
  id: string;
  title: string;
  description: string;
  date: string;
  targetClass: string;
}

interface UseClassAnnouncementsResult {
  announcements: Announcement[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useClassAnnouncements(grade: number, section: string): UseClassAnnouncementsResult {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnnouncements = async () => {
    try {
      setError(null);
      setLoading(true);
      
      const url = ENDPOINTS.classAnnouncements(grade, section);
      const res = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${await getToken()}`, // Implement getToken()
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        if (res.status === 401) throw new Error('Unauthorized');
        if (res.status === 404) throw new Error('Announcements not found');
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();
      setAnnouncements(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load announcements');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, [grade, section]);

  return { announcements, loading, error, refetch: fetchAnnouncements };
}
```

### Step 3: Use in a screen

```tsx
// app/class-announcements.tsx
import { useClassAnnouncements } from '@/hooks/useClassAnnouncements';
import { ThemedView, ThemedText } from '@/components';

export default function ClassAnnouncements() {
  const { announcements, loading, error } = useClassAnnouncements(5, 'B');

  if (loading) return <ThemedText>Loading...</ThemedText>;
  if (error) return <ThemedText type="subtitle">Error: {error}</ThemedText>;

  return (
    <ThemedView>
      {announcements.map(a => (
        <ThemedView key={a.id} style={{ padding: 12 }}>
          <ThemedText type="subtitle">{a.title}</ThemedText>
          <ThemedText>{a.date}</ThemedText>
        </ThemedView>
      ))}
    </ThemedView>
  );
}
```

## Best Practices

### Endpoint Configuration
- **Centralize URLs**: Store all endpoints in `constants/endpoints.ts`
- **Use functions** for dynamic paths: `getUser: (id: string) => ${BASE_URL}/users/${id}`
- **Document parameters**: Add JSDoc comments explaining required params
- **Consistent naming**: Use descriptive, camelCase names (e.g., `classAnnouncements`, not `ca` or `announcements_list`)

### Fetch Patterns
- **Always include error handling**: try-catch + user-facing error messages
- **Loading states**: Set loading while fetching; clear on complete
- **Abort on unmount** (optional): Use AbortController for cancellation if fetch takes long
- **Headers**: Include `Content-Type`, `Authorization` as needed
- **Timeout handling**: Consider wrapping fetch with timeout logic

### Authentication
```typescript
async function getAuthHeaders() {
  const token = await secureStorage.getToken(); // Implement based on your auth
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
}

// Usage in fetch
const headers = await getAuthHeaders();
const res = await fetch(url, { headers });
```

### Error Handling
```typescript
try {
  const res = await fetch(url, options);
  if (!res.ok) {
    switch (res.status) {
      case 401: throw new Error('Unauthorized. Please log in again.');
      case 403: throw new Error('You do not have permission to view this.');
      case 404: throw new Error('Item not found.');
      case 500: throw new Error('Server error. Please try again later.');
      default: throw new Error(`HTTP Error: ${res.status}`);
    }
  }
  return await res.json();
} catch (err) {
  console.error('API Error:', err);
  throw err;
}
```

## Migration Guide (For Existing Dev -> Production)

When moving from localhost dev to production:

1. **Update BASE_URL** in `constants/endpoints.ts`:
   ```typescript
   const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';
   ```

2. **Add environment config** in `app.json`:
   ```json
   {
     "extra": {
       "apiUrl": "https://api.production.com"
     }
   }
   ```

3. **Use in endpoints**:
   ```typescript
   import Constants from 'expo-constants';
   const BASE_URL = Constants.expoConfig?.extra?.apiUrl || 'http://localhost:3000';
   ```

## Related Workflows

- Use `/create-screen` after integrating to display the data
- Use the custom `@feature-development` agent for end-to-end feature building
- See `.github/instructions/app.instructions.md` for fetching patterns
