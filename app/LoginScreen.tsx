import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const borderColor = useThemeColor({ light: "#ccc", dark: "#444" }, "icon");
  const inputBg = useThemeColor(
    { light: "#fff", dark: "#1c1c1e" },
    "background",
  );
  const textColor = useThemeColor({}, "text");
  const placeholderColor = useThemeColor(
    { light: "#687076", dark: "#9BA1A6" },
    "icon",
  );

  const validate = () => {
    if (!email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!isValidEmail(email)) {
      setError("Enter a valid email address");
      return false;
    }
    if (!password) {
      setError("Password is required");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    setError("");
    return true;
  };

  const handleSignIn = () => {
    if (!validate()) return;
    router.replace("/(tabs)");
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboard}
      >
        <ThemedView style={styles.container}>
          <ThemedText type="title" style={styles.title}>
            EduNectar
          </ThemedText>
          <TextInput
            style={[
              styles.input,
              { borderColor, backgroundColor: inputBg, color: textColor },
            ]}
            placeholder="Email"
            placeholderTextColor={placeholderColor}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={[
              styles.input,
              { borderColor, backgroundColor: inputBg, color: textColor },
            ]}
            placeholder="Password"
            placeholderTextColor={placeholderColor}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          {error ? (
            <ThemedText
              style={styles.error}
              lightColor="#c00"
              darkColor="#ff6b6b"
            >
              {error}
            </ThemedText>
          ) : null}
          <TouchableOpacity
            style={styles.button}
            onPress={handleSignIn}
            activeOpacity={0.85}
          >
            <ThemedText
              style={styles.buttonText}
              lightColor="#fff"
              darkColor="#fff"
            >
              Sign in
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  keyboard: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  title: {
    marginBottom: 32,
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  button: {
    width: "100%",
    height: 48,
    backgroundColor: "#0a7ea4",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: "600",
  },
  error: {
    marginBottom: 8,
    textAlign: "center",
  },
});
