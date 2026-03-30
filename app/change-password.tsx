import { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function ChangePasswordScreen() {
  const navigation = useNavigation();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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

  const validateForm = () => {
    if (!currentPassword.trim()) {
      setError("Current password is required");
      return false;
    }
    if (!newPassword.trim()) {
      setError("New password is required");
      return false;
    }
    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters");
      return false;
    }
    if (newPassword === currentPassword) {
      setError("New password must be different from current password");
      return false;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    setError("");
    return true;
  };

  const handleChangePassword = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Simulate API call
      setTimeout(() => {
        setLoading(false);
        Alert.alert("Success", "Password changed successfully!", [
          {
            text: "OK",
            onPress: () => navigation.goBack(),
          },
        ]);
      }, 1500);
    } catch {
      setError("Failed to change password. Please try again.");
      setLoading(false);
    }
  };

  const handleClearError = () => {
    setError("");
  };

  return (
    <ThemedView style={styles.root}>
      {/* Header with Back Button */}
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <IconSymbol size={24} name="chevron.left" color="#007AFF" />
        </TouchableOpacity>
        <ThemedText type="title" style={styles.headerTitle}>
          Change Password
        </ThemedText>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Instructions Card */}
        <View style={styles.infoCard}>
          <IconSymbol size={20} name="info.circle.fill" color="#2196F3" />
          <ThemedText style={styles.infoText}>
            Enter your current password and create a new secure password
          </ThemedText>
        </View>

        {/* Error Message */}
        {error ? (
          <View style={styles.errorCard}>
            <IconSymbol
              size={20}
              name="exclamationmark.circle.fill"
              color="#FF6B6B"
            />
            <ThemedText style={styles.errorText}>{error}</ThemedText>
            <TouchableOpacity onPress={handleClearError}>
              <IconSymbol size={16} name="xmark" color="#FF6B6B" />
            </TouchableOpacity>
          </View>
        ) : null}

        {/* Current Password */}
        <View style={styles.formGroup}>
          <ThemedText type="defaultSemiBold" style={styles.label}>
            Current Password
          </ThemedText>
          <View style={styles.passwordInputContainer}>
            <TextInput
              style={[
                styles.input,
                {
                  borderColor,
                  backgroundColor: inputBg,
                  color: textColor,
                  flex: 1,
                },
              ]}
              placeholder="Enter current password"
              placeholderTextColor={placeholderColor}
              secureTextEntry={!showCurrentPassword}
              value={currentPassword}
              onChangeText={setCurrentPassword}
              editable={!loading}
            />
            <TouchableOpacity
              onPress={() => setShowCurrentPassword(!showCurrentPassword)}
              style={styles.eyeIcon}
            >
              <IconSymbol
                size={20}
                name={showCurrentPassword ? "eye.fill" : "eye.slash.fill"}
                color="#666"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* New Password */}
        <View style={styles.formGroup}>
          <ThemedText type="defaultSemiBold" style={styles.label}>
            New Password
          </ThemedText>
          <View style={styles.passwordInputContainer}>
            <TextInput
              style={[
                styles.input,
                {
                  borderColor,
                  backgroundColor: inputBg,
                  color: textColor,
                  flex: 1,
                },
              ]}
              placeholder="Enter new password (min 8 characters)"
              placeholderTextColor={placeholderColor}
              secureTextEntry={!showNewPassword}
              value={newPassword}
              onChangeText={setNewPassword}
              editable={!loading}
            />
            <TouchableOpacity
              onPress={() => setShowNewPassword(!showNewPassword)}
              style={styles.eyeIcon}
            >
              <IconSymbol
                size={20}
                name={showNewPassword ? "eye.fill" : "eye.slash.fill"}
                color="#666"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Confirm Password */}
        <View style={styles.formGroup}>
          <ThemedText type="defaultSemiBold" style={styles.label}>
            Confirm New Password
          </ThemedText>
          <View style={styles.passwordInputContainer}>
            <TextInput
              style={[
                styles.input,
                {
                  borderColor,
                  backgroundColor: inputBg,
                  color: textColor,
                  flex: 1,
                },
              ]}
              placeholder="Re-enter new password"
              placeholderTextColor={placeholderColor}
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              editable={!loading}
            />
            <TouchableOpacity
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              style={styles.eyeIcon}
            >
              <IconSymbol
                size={20}
                name={showConfirmPassword ? "eye.fill" : "eye.slash.fill"}
                color="#666"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Password Requirements */}
        <View style={styles.requirementsCard}>
          <ThemedText type="defaultSemiBold" style={styles.requirementsTitle}>
            Password Requirements
          </ThemedText>
          <RequirementItem text="At least 8 characters long" />
          <RequirementItem text="Different from current password" />
          <RequirementItem text="Passwords must match" />
        </View>
      </ScrollView>

      {/* Bottom Actions */}
      <View style={styles.bottomActions}>
        <TouchableOpacity
          style={[styles.cancelButton, { borderColor }]}
          onPress={() => navigation.goBack()}
          disabled={loading}
        >
          <ThemedText style={styles.cancelButtonText}>Cancel</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.submitButton, loading && styles.submitButtonDisabled]}
          onPress={handleChangePassword}
          disabled={loading}
        >
          <ThemedText style={styles.submitButtonText}>
            {loading ? "Updating..." : "Update Password"}
          </ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

function RequirementItem({ text }: { text: string }) {
  return (
    <View style={styles.requirementRow}>
      <IconSymbol size={14} name="checkmark.circle.fill" color="#4CAF50" />
      <ThemedText style={styles.requirementText}>{text}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    flex: 1,
    textAlign: "center",
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  infoCard: {
    flexDirection: "row",
    backgroundColor: "#E3F2FD",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: "center",
    gap: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 12,
    color: "#1976D2",
  },
  errorCard: {
    flexDirection: "row",
    backgroundColor: "#FFEBEE",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: "center",
    gap: 12,
  },
  errorText: {
    flex: 1,
    fontSize: 12,
    color: "#C62828",
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
    opacity: 0.8,
  },
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
    overflow: "hidden",
  },
  input: {
    height: 48,
    paddingHorizontal: 12,
    fontSize: 14,
  },
  eyeIcon: {
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  divider: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginVertical: 12,
  },
  requirementsCard: {
    backgroundColor: "#f5f5f5",
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 20,
  },
  requirementsTitle: {
    fontSize: 12,
    marginBottom: 8,
    opacity: 0.7,
  },
  requirementRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 6,
  },
  requirementText: {
    fontSize: 12,
    opacity: 0.7,
  },
  bottomActions: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButtonText: {
    fontWeight: "600",
    fontSize: 14,
  },
  submitButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: "#007AFF",
    alignItems: "center",
    justifyContent: "center",
  },
  submitButtonDisabled: {
    backgroundColor: "#BDBDBD",
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
});
