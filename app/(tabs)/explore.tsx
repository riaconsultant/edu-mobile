import {
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

const screenWidth = Dimensions.get("window").width;
const passportImageSize = Math.min(screenWidth * 0.35, 150); // Responsive passport size

export default function ProfileScreen() {
  const router = useRouter();

  const studentData = {
    name: "John Doe",
    studentId: "STU-2024-001",
    class: "10th Grade - Section A",
    school: "St. Mary's Academy",
    initials: "JD",
  };

  const profileMenuItems = [
    {
      name: "Profile",
      icon: "person.fill" as const,
      color: "#4CAF50",
      onPress: () => router.push("/student-profile"),
      description: "View your profile details",
    },
    {
      name: "Notifications",
      icon: "bell.fill" as const,
      color: "#2196F3",
      onPress: () => router.push("/notifications"),
      description: "Check your notifications",
    },
    {
      name: "Change Password",
      icon: "lock.fill" as const,
      color: "#FF9800",
      onPress: () => router.push("/change-password"),
      description: "Update your password",
    },
    {
      name: "Logout",
      icon: "arrowshape.turn.up.left.fill" as const,
      color: "#F44336",
      onPress: handleLogout,
      description: "Sign out from your account",
    },
  ];

  function handleLogout() {
    // Clear any stored user data here if needed
    router.replace("/LoginScreen");
  }

  return (
    <ThemedView style={styles.root}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Student Profile Card */}
        <View style={styles.profileCard}>
          {/* Image and Details Container */}
          <View style={styles.profileImageSection}>
            {/* Passport Size Avatar */}
            <View style={styles.passportImageContainer}>
              <View style={styles.avatarPlaceholder}>
                <ThemedText style={styles.avatarInitials}>
                  {studentData.initials}
                </ThemedText>
              </View>
            </View>

            {/* Student Details */}
            <View style={styles.studentDetailsContainer}>
              <ThemedText type="title" style={styles.studentName}>
                {studentData.name}
              </ThemedText>
              <ThemedText style={styles.studentInfo}>
                {studentData.studentId}
              </ThemedText>
              <ThemedText style={styles.studentInfo}>
                {studentData.class}
              </ThemedText>
              <ThemedText style={styles.studentInfo}>
                {studentData.school}
              </ThemedText>
            </View>
          </View>
        </View>

        {/* Menu Grid */}
        <View style={styles.menuGrid}>
          {profileMenuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.menuCard, { borderTopColor: item.color }]}
              onPress={item.onPress}
              activeOpacity={0.7}
            >
              <IconSymbol
                size={44}
                name={item.icon}
                color={item.color}
                weight="regular"
              />
              <ThemedText type="defaultSemiBold" style={styles.menuTitle}>
                {item.name}
              </ThemedText>
              <ThemedText style={styles.menuDescription}>
                {item.description}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>

        {/* Information Section */}
        <View style={styles.infoSection}>
          <ThemedText type="defaultSemiBold" style={styles.infoTitle}>
            Account Information
          </ThemedText>
          <View style={styles.infoCard}>
            <ThemedText style={styles.infoLabel}>App Version</ThemedText>
            <ThemedText style={styles.infoValue}>1.0.0</ThemedText>
          </View>
          <View style={styles.infoCard}>
            <ThemedText style={styles.infoLabel}>Last Login</ThemedText>
            <ThemedText style={styles.infoValue}>
              {new Date().toLocaleDateString("en-US")}
            </ThemedText>
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  profileCard: {
    backgroundColor: "#f5f5f5",
    borderRadius: 14,
    padding: 16,
    marginBottom: 24,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  profileImageSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  passportImageContainer: {
    width: passportImageSize,
    height: passportImageSize * 1.25, // Passport aspect ratio (1:1.25)
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#e0e0e0",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  avatarPlaceholder: {
    width: "100%",
    height: "100%",
    backgroundColor: "#007AFF",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarInitials: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
  },
  passportImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  studentDetailsContainer: {
    flex: 1,
    justifyContent: "center",
  },
  studentName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
  },
  studentInfo: {
    fontSize: 12,
    opacity: 0.7,
    marginBottom: 4,
    lineHeight: 16,
  },
  menuGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 24,
  },
  menuCard: {
    width: "48%",
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    borderTopWidth: 4,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    minHeight: 140,
  },
  menuTitle: {
    marginTop: 12,
    fontSize: 14,
    textAlign: "center",
    fontWeight: "600",
  },
  menuDescription: {
    marginTop: 4,
    fontSize: 11,
    textAlign: "center",
    opacity: 0.6,
  },
  infoSection: {
    marginTop: 20,
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 14,
    marginBottom: 12,
    opacity: 0.7,
  },
  infoCard: {
    backgroundColor: "#f9f9f9",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoLabel: {
    fontSize: 12,
    opacity: 0.6,
  },
  infoValue: {
    fontSize: 12,
    fontWeight: "600",
  },
});
