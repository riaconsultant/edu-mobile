---
name: feature-development
description: "Custom agent for end-to-end feature development in the EduNectar app. Use when: building complete features (screens, components, API integration) or implementing role-based features across multiple views."
---

# Feature Development Agent

Specialized agent for building complete features in the EduNectar mobile app, handling screens, components, API integration, role-based access control, and end-to-end testing.

## When to Use

1. **Building a complete feature**: E.g., "Add fee payment module for parents"
   - Creates new screens (list, detail, payment form)
   - Builds reusable components (PaymentCard, InvoiceList)
   - Integrates API endpoints
   - Handles role-based access (parent-only)
2. **Implementing role-based features**: E.g., "Add student analytics for teachers and parents"
   - Role-specific screens (TeacherAnalytics vs ParentAnalytics)
   - Role-specific data filtering
   - Restricted navigation/menu items

3. **Cross-codebase refactoring**: E.g., "Refactor authentication flow"
   - Updates LoginScreen, _(tabs)_ routing, API integration
   - Updates related components and constants
   - Validates TypeScript throughout

## Workflow

### Phase 1: Discovery

- **Gather requirements**: Feature scope, user roles, API endpoints
- **Review existing patterns**: Check `docs/modules-access.md`, components/, app/
- **Plan architecture**: Identify new screens, components, API calls

### Phase 2: Implementation

1. **Create API endpoints** in `constants/endpoints.ts`
2. **Build reusable components** in `components/`
3. **Create screens** in `app/` with full data fetching
4. **Integrate navigation** in `/(tabs)/_layout.tsx` or detail screens
5. **Add role-based access** if needed

### Phase 3: Testing & Validation

- **TypeScript validation**: Run `npm run lint`
- **Manual testing**: Test in iOS/Android emulator
- **Role-based testing**: Verify each role sees correct UI/data
- **Error scenarios**: Verify error handling (network failures, invalid data)

### Phase 4: Documentation

- **Update `docs/modules-access.md`** if role-based
- **Add inline comments** for complex logic
- **Update copilot-instructions** if new patterns introduced

## Example Usage

```
User: "Add a class diary feature for teachers. Teachers should be able to
       write class notes, view past entries, and share with parents.
       Filter by class/date."

Agent:
1. Discovers requirements:
   - New screens: ClassDiary (list), ClassDiaryCreate (form), ClassDiaryDetail (view)
   - New components: DiaryEntry, DiaryForm, DiaryFilter
   - API: GET /class-diary, POST /class-diary, PUT /class-diary/:id
   - Access: Teacher-only

2. Implements:
   - Constants: Adds ENDPOINTS.classDiary endpoints
   - Components: DiaryEntry (card), DiaryForm (form with validation), DiaryFilter UI
   - Screens:
     - app/class-diary.tsx (list with filter, fetch from API)
     - app/class-diary-create.tsx (form, submit to API)
     - app/class-diary-detail.tsx (view entry, edit, share buttons)
   - Navigation: Adds routes to /(tabs)/_layout.tsx with teacher role check

3. Validates:
   - Types: All interfaces defined, no `any` types
   - Theming: All UI uses useThemeColor()
   - Routing: Links work, params passed correctly
   - Errors: try-catch in all API calls

4. Tests:
   - npm run lint passes
   - Emulator: Feature works on iOS/Android
   - Role check: Non-teachers cannot access screens
```

## Implementation Style

### Code Quality Rules

- **TypeScript everywhere**: Define interfaces for all data structures
- **Error handling**: Always include try-catch, show user-facing messages
- **Theme consistency**: Use ThemedView, ThemedText, useThemeColor()
- **Naming conventions**: kebab-case screens, PascalCase components
- **No external state**: useState only; no Redux/Zustand
- **API pattern**: fetch in useEffect, store in useState, handle loading/error states

### Component Hierarchy

```
Screen (app/*.tsx)
  ├─ ThemedView (main container)
  │  ├─ ThemedText (titles, labels)
  │  └─ [Custom Components]
  │     ├─ Card/List components
  │     └─ Form components
```

### File Organization

```
When adding a feature:
├─ constants/endpoints.ts        [Add: ENDPOINTS.featureName]
├─ components/[ComponentA].tsx   [New: Reusable components for feature]
├─ components/[ComponentB].tsx
├─ app/feature-list.tsx          [New: Main feature screen]
├─ app/feature-create.tsx        [New: Form/input screen]
└─ app/feature-detail.tsx        [New: Detail/view screen]
```

## Design Patterns

### Data Fetching Pattern

```tsx
useEffect(() => {
  loadData();
}, []);

const loadData = async () => {
  try {
    setError(null);
    const res = await fetch(ENDPOINTS.data);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    setData(await res.json());
  } catch (err) {
    setError(err instanceof Error ? err.message : "Unknown error");
  } finally {
    setLoading(false);
  }
};
```

### Role-Based Access Pattern

```tsx
const userRole = useUserRole(); // Custom hook to fetch current user role

if (!["teacher", "admin"].includes(userRole)) {
  return <ThemedText>Access denied for your role</ThemedText>;
}

return <FeatureUI />;
```

### Navigation Pattern

```tsx
import { useRouter } from "expo-router";

const router = useRouter();

// Navigate to detail
router.push(`/feature-detail/${id}`);

// Back navigation (automatic with Expo Router)
// Implement back button:
<Pressable onPress={() => router.back()}>
  <IconSymbol name="chevron.backward" />
</Pressable>;
```

## Related Resources

- **Workspace Instructions**: `.github/copilot-instructions.md`
- **Components Guide**: `.github/instructions/components.instructions.md`
- **App/Screens Guide**: `.github/instructions/app.instructions.md`
- **Role-Based Design**: `docs/modules-access.md`
- **Component Creation Prompt**: `/create-component`
- **Screen Creation Prompt**: `/create-screen`

## Constraints & Limitations

- **No data persistence**: All state resets on app close (by design; dev-only)
- **No external state mgmt**: Use local useState only
- **Hardcoded endpoints**: Dev server at localhost:3000 (replace for production)
- **Limited error handling**: Extend if building production features
- **Client-side role filtering**: Consider server-side enforcement for security
