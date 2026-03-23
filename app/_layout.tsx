import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack initialRouteName="LoginScreen">
          {/* Login Screen - First Screen */}
          <Stack.Screen name="LoginScreen" options={{ headerShown: false }} />

          {/* Main Tab Navigation - After Login */}
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

          {/* Detail Screens */}
          <Stack.Screen
            name="announcement-detail"
            options={{
              headerShown: false,
              presentation: "card",
            }}
          />
          <Stack.Screen
            name="student-profile"
            options={{
              headerShown: false,
              presentation: "card",
            }}
          />
          <Stack.Screen
            name="notifications"
            options={{
              headerShown: false,
              presentation: "card",
            }}
          />
          <Stack.Screen
            name="change-password"
            options={{
              headerShown: false,
              presentation: "card",
            }}
          />

          {/* Error Screen */}
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
