# Copilot Instructions for EduNectar Mobile App

This is an **Expo + React Native** educational mobile application built with **TypeScript** and **Expo Router** file-based routing. The app provides role-based module access (teachers, parents, students) with features like announcements, assignments, attendance tracking, and parent communication.

## Quick Start

### Commands

```bash
npm start         # Start development server
npm run ios       # Run on iOS simulator
npm run android   # Run on Android emulator
npm run web       # Run on web
npm run lint      # Run ESLint
npm run reset-project  # Reset to blank slate
```

**Dev Server**: `http://localhost:3000` (hardcoded in `constants/endpoints.ts` for backend API)

## Project Structure & Architecture

### Core Directories

- **`app/`** — File-based routes (Expo Router). Entry point: `LoginScreen.tsx` → `/(tabs)` for main navigation
- **`app/(tabs)/`** — Bottom-tab navigation screens (dashboard, feed, explore)
- **`components/`** — Reusable UI components (themed wrappers, icons, layouts)
- **`hooks/`** — Custom React hooks (`useThemeColor`, `useColorScheme`)
- **`constants/`** — Theme colors, API endpoints, configuration
- **`docs/`** — Documentation (notably `modules-access.md` for role-based menu design)

### Routing Pattern

**Entry**: `app/_layout.tsx` → `LoginScreen.tsx` (authentication)  
**On Login Success**: `router.replace("/(tabs)")` navigates to main tab navigator  
**Detail Routes**: Stack navigation for screens like `announcement-detail.tsx`, `assignment.tsx`, etc.  
**Platform-Specific Overrides**: Files ending `.ios.tsx` override defaults for iOS

## Code Patterns & Conventions

### File Naming

- **Screens** (in `app/`): kebab-case (`announcement.tsx`, `student-profile.tsx`, `class-diary.tsx`)
- **Components** (in `components/`): PascalCase (`ThemedText.tsx`, `IconSymbol.tsx`)
- **Hooks** (in `hooks/`): camelCase with `use` prefix (`useThemeColor.ts`)

### Component Architecture

**Themed Components** provide light/dark mode support:

```tsx
<ThemedView style={styles.container}>
  <ThemedText type="title">Title</ThemedText>
</ThemedView>
```

- `ThemedView` and `ThemedText` automatically apply colors from `useThemeColor()` hook
- Colors defined in `constants/Colors.ts` (light/dark theme objects)

### Icon Usage

- Use **SF Symbols** via `@expo/vector-icons`
- Platform-specific imports: `IconSymbol.ios.tsx` for iOS, `IconSymbol.tsx` for fallback
- Example: `"house.fill"`, `"bell.fill"`, `"person.fill"`

### Data Fetching & State Management

**Pattern**: Fetch in `useEffect` → `useState` storage → client-side filtering. No Redux/Zustand.

```tsx
const [data, setData] = useState([]);
useEffect(() => {
  fetch(ENDPOINTS.announcements)
    .then((res) => res.json())
    .then(setData)
    .catch(console.error);
}, []);
```

**API Endpoints**: Configured in `constants/endpoints.ts` (e.g., `ENDPOINTS.announcements`)

### Authentication Flow

1. User enters email in `LoginScreen.tsx`
2. Validate and call API (if applicable)
3. On success: `router.replace("/(tabs)")` → main navigation
4. No persistent token storage visible (dev-only behavior)

### Styling

- **Utility**: Native `StyleSheet.create()` only (no CSS framework)
- **Theme Integration**: `useThemeColor(props, 'backgroundColor')` for dynamic colors
- **Responsive**: Use flexbox; no explicit breakpoints (React Native adapts)

## Role-Based Design (from `docs/modules-access.md`)

The app supports multiple user roles with tailored module access:

1. **Class Teacher** — Attendance, Gradebook, Homework, Timetable, Parent Communication, Student Analytics
2. **Subject Teacher** — Gradebook, Homework, Subject Timetable, Resource Sharing, Student Analytics
3. **Parent** — Child Dashboard, Fee Management, Announcements, PTM Booking, Performance Analytics, Bus Tracking
4. **Student** — (Implied via dashboard modules)

Each profile/role displays a filtered menu based on:

- Active user session (`user_sessions.active_profile_id`)
- Role-specific `permissions` table (backend enforcement)
- Role-specific data context (e.g., `{"grade": 5, "section": "B"}`)

**Implementation Note**: Menu filtering is currently client-side via `useState` filtering of API responses. Consider adding server-side role gating in future iterations.

## Tech Stack & Dependencies

| Category           | Technology                                              |
| ------------------ | ------------------------------------------------------- |
| **Framework**      | React 19, React Native 0.79.5                           |
| **Language**       | TypeScript 5.8                                          |
| **Router**         | Expo Router 5.1.4                                       |
| **Navigation**     | @react-navigation (`bottom-tabs`, `native`, `elements`) |
| **Icons**          | @expo/vector-icons, expo-symbols                        |
| **Animation**      | react-native-reanimated 3.17                            |
| **HTML Rendering** | react-native-render-html                                |
| **Linting**        | ESLint (expo config)                                    |

**Styling**: StyleSheet (Native, no CSS)  
**State Management**: Local `useState` only  
**HTTP**: Native `fetch()` API

## Development Workflows

### Adding a New Screen

1. Create `app/[screen-name].tsx` (kebab-case)
2. Use `useThemeColor()` for colors, `ThemedView`/`ThemedText` for components
3. Add route handling in parent `_layout.tsx` if needed
4. Test routing: `npx expo start` → navigate in emulator

### Adding a New Component

1. Create `components/ComponentName.tsx` (PascalCase)
2. Accept theme props: `props.onPress`, `style` override
3. Apply theming via `useThemeColor()` hook
4. Export for reuse across screens

### Debugging

- **Console**: `npx expo start` shows device logs
- **Errors**: Check `@react-navigation`, Expo Router error boundaries
- **TypeScript**: `npm run lint` for type/style errors

## Important Notes

### ⚠️ Known Limitations

- **No Data Persistence**: Client-side state only; data resets on app reload
- **Minimal Error Handling**: Consider adding try-catch and user-facing error messages
- **Hardcoded Endpoints**: `localhost:3000` (dev only; replace for production)
- **Authentication**: No token storage visible; assumes stateless session management

### 🎯 Best Practices for Contributing

1. **Component Reusability**: Extract common UI patterns into `components/`
2. **Theme Consistency**: Always use `useThemeColor()` for dynamic colors
3. **Naming**: Follow kebab-case for screens, PascalCase for components
4. **TypeScript**: Avoid `any` types; use proper interfaces
5. **Error Boundaries**: Consider wrapping screens with error boundaries (esp. for API calls)
6. **Accessibility**: Use SF Symbol names that are platform-appropriate

### 📚 Useful Links

- [Expo Documentation](https://docs.expo.dev)
- [Expo Router Guide](https://docs.expo.dev/router/introduction)
- [React Navigation](https://reactnavigation.org)
- [Role-Based Menu Design](./docs/modules-access.md) — Reference for app's role/permission structure

## When to Adjust These Instructions

- **New patterns introduced**: Add to "Code Patterns" section
- **New tech dependencies**: Update "Tech Stack" table
- **Architecture refactors**: Update "Project Structure" and "Routing Pattern"
- **New documentation**: Link in "Useful Links" section

---

**Last Updated**: 2026-04-06  
**For**: GitHub Copilot and AI agents working on this project
