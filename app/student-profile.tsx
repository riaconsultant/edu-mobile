import { useState } from "react";
import { StyleSheet, ScrollView, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

export default function StudentProfileScreen() {
  const navigation = useNavigation();
  const [profileData] = useState({
    name: "John Doe",
    studentId: "STU-2024-001",
    class: "10th Grade",
    section: "A",
    rollNumber: "15",
    schoolName: "St. Mary's Academy",
    email: "john.doe@school.com",
    phone: "+1 (555) 123-4567",
    fatherName: "Mr. Robert Doe",
    motherName: "Mrs. Jane Doe",
    dateOfBirth: "2008-05-15",
    admissionDate: "2020-06-01",
    gender: "Male",
    bloodGroup: "O+",
  });

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
          Student Profile
        </ThemedText>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={true}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Profile Header Card */}
        <View style={styles.profileCard}>
          {/* Avatar */}
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <ThemedText style={styles.avatarText}>JD</ThemedText>
            </View>
          </View>

          {/* Basic Info */}
          <ThemedText type="title" style={styles.profileName}>
            {profileData.name}
          </ThemedText>
          <ThemedText style={styles.profileSubtitle}>
            {profileData.class} - Section {profileData.section}
          </ThemedText>
          <ThemedText style={styles.profileSubtitle}>
            {profileData.schoolName}
          </ThemedText>
        </View>

        {/* Personal Information */}
        <View style={styles.section}>
          <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
            Personal Information
          </ThemedText>
          <View style={styles.infoGrid}>
            <InfoCard label="Student ID" value={profileData.studentId} />
            <InfoCard label="Roll Number" value={profileData.rollNumber} />
            <InfoCard label="Gender" value={profileData.gender} />
            <InfoCard label="Blood Group" value={profileData.bloodGroup} />
            <InfoCard
              label="Date of Birth"
              value={new Date(profileData.dateOfBirth).toLocaleDateString()}
            />
            <InfoCard
              label="Admission Date"
              value={new Date(profileData.admissionDate).toLocaleDateString()}
            />
          </View>
        </View>

        {/* Contact Information */}
        <View style={styles.section}>
          <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
            Contact Information
          </ThemedText>
          <View style={styles.infoGrid}>
            <InfoCard label="Email" value={profileData.email} />
            <InfoCard label="Phone" value={profileData.phone} />
          </View>
        </View>

        {/* Parent Information */}
        <View style={styles.section}>
          <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
            Parent Information
          </ThemedText>
          <View style={styles.infoGrid}>
            <InfoCard label="Father's Name" value={profileData.fatherName} />
            <InfoCard label="Mother's Name" value={profileData.motherName} />
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action */}
      <View style={styles.bottomAction}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.goBack()}
        >
          <ThemedText style={styles.actionButtonText}>Go Back</ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoCard}>
      <ThemedText style={styles.infoLabel}>{label}</ThemedText>
      <ThemedText style={styles.infoValue}>{value}</ThemedText>
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
  profileCard: {
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    marginBottom: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#007AFF",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
    textAlign: "center",
  },
  profileSubtitle: {
    fontSize: 14,
    opacity: 0.6,
    textAlign: "center",
    marginBottom: 2,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    marginBottom: 12,
    opacity: 0.7,
    textTransform: "uppercase",
  },
  infoGrid: {
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    overflow: "hidden",
  },
  infoCard: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  infoLabel: {
    fontSize: 12,
    opacity: 0.6,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "600",
  },
  bottomAction: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  actionButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  actionButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
