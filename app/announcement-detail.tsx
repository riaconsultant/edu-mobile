import { useRoute, useNavigation } from "@react-navigation/native";
import { StyleSheet, ScrollView, TouchableOpacity, View } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { IconSymbol } from "@/components/ui/IconSymbol";
import RenderHtml from "react-native-render-html";

export default function AnnouncementDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute() as any;
  const announcement = route.params?.announcement || {};

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
          Announcement Details
        </ThemedText>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={true}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Announcement Card */}
        <View style={styles.detailCard}>
          {/* Date Badge */}
          <View style={styles.dateBadge}>
            <ThemedText style={styles.dateText}>
              {new Date(announcement.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </ThemedText>
          </View>

          {/* Title */}
          <ThemedText type="title" style={styles.detailTitle}>
            {announcement.title || "Untitled Announcement"}
          </ThemedText>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Content */}
          <View style={styles.contentSection}>
            <ThemedText type="defaultSemiBold" style={styles.contentLabel}>
              Details
            </ThemedText>
            <View style={styles.htmlContent}>
              <RenderHtml
                contentWidth={330}
                source={{
                  html:
                    announcement.announcement || "<p>No content available</p>",
                }}
              />
            </View>
          </View>

          {/* Metadata */}
          {announcement.id && (
            <View style={styles.metadataSection}>
              <ThemedText type="defaultSemiBold" style={styles.metadataLabel}>
                Reference ID
              </ThemedText>
              <ThemedText style={styles.metadataValue}>
                {announcement.id}
              </ThemedText>
            </View>
          )}

          {/* Attachment if available */}
          {announcement.attachment && (
            <TouchableOpacity style={styles.attachmentButton}>
              <IconSymbol size={20} name="paperclip" color="#007AFF" />
              <ThemedText style={styles.attachmentText}>
                View Attachment
              </ThemedText>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>

      {/* Bottom Action Buttons */}
      <View style={styles.bottomActions}>
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
  detailCard: {
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  dateBadge: {
    backgroundColor: "#2196F3",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: "flex-start",
    marginBottom: 12,
  },
  dateText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  detailTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
  },
  divider: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginVertical: 12,
  },
  contentSection: {
    marginBottom: 16,
  },
  contentLabel: {
    fontSize: 14,
    marginBottom: 8,
    opacity: 0.7,
  },
  htmlContent: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  metadataSection: {
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  metadataLabel: {
    fontSize: 12,
    opacity: 0.6,
    marginBottom: 4,
  },
  metadataValue: {
    fontSize: 12,
    opacity: 0.8,
    fontFamily: "monospace",
  },
  attachmentButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: "#E3F2FD",
    borderRadius: 8,
    gap: 8,
  },
  attachmentText: {
    color: "#007AFF",
    fontWeight: "600",
    fontSize: 14,
  },
  bottomActions: {
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
