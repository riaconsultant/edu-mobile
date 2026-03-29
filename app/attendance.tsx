import { StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

export default function AttendanceScreen() {
  return (
    <ThemedView style={styles.root}>
      <ThemedText type="title" style={styles.title}>
        Hello from Attendance!
      </ThemedText>
      <ThemedText type="default" style={styles.subtitle}>
        Track your attendance here
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    opacity: 0.6,
  },
});
