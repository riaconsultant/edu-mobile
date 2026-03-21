import { StyleSheet, ScrollView, TouchableOpacity, View } from "react-native";
import { Link } from "expo-router";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

/** Dashboard screen with 6 main features. */
export default function DashboardScreen() {
  const colorScheme = useColorScheme() ?? "light";

  const dashboardItems = [
    {
      name: "Attendance",
      icon: "checkmark.circle.fill" as const,
      href: "/attendance",
      color: "#4CAF50",
    },
    {
      name: "Announcement",
      icon: "bell.fill" as const,
      href: "/announcement",
      color: "#2196F3",
    },
    {
      name: "Assignment",
      icon: "doc.text.fill" as const,
      href: "/assignment",
      color: "#FF9800",
    },
    {
      name: "Newsletter",
      icon: "envelope.fill" as const,
      href: "/newsletter",
      color: "#9C27B0",
    },
    {
      name: "Question Bank",
      icon: "questionmark.circle.fill" as const,
      href: "/question-bank",
      color: "#F44336",
    },
    {
      name: "Class Diary",
      icon: "book.fill" as const,
      href: "/class-diary",
      color: "#00BCD4",
    },
  ];

  return (
    <ThemedView style={styles.root}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <ThemedText type="title" style={styles.headerText}>
            Dashboard
          </ThemedText>
        </View>

        <View style={styles.gridContainer}>
          {dashboardItems.map((item, index) => (
            <Link href={item.href as any} asChild key={index}>
              <TouchableOpacity
                style={[styles.card, { borderTopColor: item.color }]}
                activeOpacity={0.7}
              >
                <IconSymbol
                  size={48}
                  name={item.icon}
                  color={item.color}
                  weight="regular"
                />
                <ThemedText type="defaultSemiBold" style={styles.cardTitle}>
                  {item.name}
                </ThemedText>
              </TouchableOpacity>
            </Link>
          ))}
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
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  header: {
    marginBottom: 24,
    paddingTop: 20,
  },
  headerText: {
    fontSize: 32,
    fontWeight: "bold",
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 16,
  },
  card: {
    width: "48%",
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    borderTopWidth: 4,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  cardTitle: {
    marginTop: 12,
    fontSize: 14,
    textAlign: "center",
  },
});
