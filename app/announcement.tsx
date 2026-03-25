import { useEffect, useState } from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { ENDPOINTS } from "@/constants/endpoints";
import RenderHtml from "react-native-render-html";

export default function AnnouncementScreen() {
  const navigation = useNavigation();
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [searchText, setSearchText] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  // Fetch announcements on mount
  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const response = await fetch(ENDPOINTS.ANNOUNCEMENTS + "/1");
      const data = await response.json();
      setAnnouncements(data || []);
      setFilteredData(data || []);
    } catch (error) {
      console.error("Error fetching announcements:", error);
      setAnnouncements([]);
      setFilteredData([]);
    }
  };

  // Filter announcements based on search and date
  const handleFilter = (search: string, date: string) => {
    let filtered = announcements;

    // Filter by search text
    if (search.trim()) {
      filtered = filtered.filter(
        (item) =>
          item.title?.toLowerCase().includes(search.toLowerCase()) ||
          item.announcement?.toLowerCase().includes(search.toLowerCase()),
      );
    }

    // Filter by date
    if (date.trim()) {
      filtered = filtered.filter((item) => {
        const itemDate = new Date(item.date).toISOString().split("T")[0];
        return itemDate === date;
      });
    }

    setFilteredData(filtered);
  };

  // Handle search text change
  const handleSearchChange = (text: string) => {
    setSearchText(text);
    handleFilter(text, selectedDate);
  };

  // Handle date change
  const handleDateChange = (text: string) => {
    setSelectedDate(text);
    handleFilter(searchText, text);
  };

  // Handle clear filters
  const handleClearFilters = () => {
    setSearchText("");
    setSelectedDate("");
    setFilteredData(announcements);
  };

  // Navigate to announcement detail
  const handleOpenDetail = (announcement: any) => {
    (navigation as any).navigate("announcement-detail", {
      announcement: announcement,
    });
  };

  // Render announcement item
  const renderAnnouncementItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      onPress={() => handleOpenDetail(item)}
      activeOpacity={0.7}
    >
      <ThemedView style={styles.announcementCard}>
        <View style={styles.cardHeader}>
          <ThemedText type="defaultSemiBold" style={styles.cardTitle}>
            {item.title || "Untitled"}
          </ThemedText>
          <ThemedText style={styles.cardDate}>
            {new Date(item.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </ThemedText>
        </View>

        <ThemedView style={styles.cardContent}>
          <RenderHtml
            contentWidth={350}
            source={{ html: item.announcement || "" }}
          />
        </ThemedView>

        <TouchableOpacity
          onPress={() => handleOpenDetail(item)}
          style={styles.readMoreButton}
        >
          <ThemedText style={styles.readMoreText}>Read More →</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </TouchableOpacity>
  );

  return (
    <ThemedView style={styles.root}>
      {/* Header */}
      <View style={styles.header}>
        <ThemedText type="title" style={styles.headerTitle}>
          Announcements
        </ThemedText>
      </View>

      {/* Filter Section */}
      <View style={styles.filterContainer}>
        {/* Search Input */}
        <TextInput
          style={styles.searchInput}
          placeholder="Search announcements..."
          placeholderTextColor="#999"
          value={searchText}
          onChangeText={handleSearchChange}
        />

        {/* Date Input */}
        <TextInput
          style={styles.dateInput}
          placeholder="YYYY-MM-DD"
          placeholderTextColor="#999"
          value={selectedDate}
          onChangeText={handleDateChange}
        />

        {/* Clear Button */}
        {(searchText || selectedDate) && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={handleClearFilters}
          >
            <ThemedText style={styles.clearButtonText}>Clear</ThemedText>
          </TouchableOpacity>
        )}
      </View>

      {/* Results Count */}
      <View style={styles.resultsInfo}>
        <ThemedText style={styles.resultsText}>
          {filteredData.length} announcement(s) found
        </ThemedText>
      </View>

      {/* Announcements List */}
      {filteredData.length > 0 ? (
        <FlatList
          data={filteredData}
          renderItem={renderAnnouncementItem}
          keyExtractor={(item) =>
            item.id?.toString() || Math.random().toString()
          }
          contentContainerStyle={styles.listContent}
          scrollEnabled={false}
        />
      ) : (
        <View style={styles.emptyState}>
          <IconSymbol size={48} name="bell.slash" color="#ccc" />
          <ThemedText style={styles.emptyText}>
            No announcements found
          </ThemedText>
        </View>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 0,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "bold",
  },
  filterContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  searchInput: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
    fontSize: 14,
  },
  dateInput: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
    fontSize: 14,
  },
  clearButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#FF6B6B",
    borderRadius: 6,
    alignSelf: "flex-start",
  },
  clearButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 12,
  },
  resultsInfo: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  resultsText: {
    fontSize: 12,
    opacity: 0.6,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  announcementCard: {
    marginBottom: 12,
    borderRadius: 10,
    padding: 14,
    backgroundColor: "#f9f9f9",
    borderLeftWidth: 4,
    borderLeftColor: "#2196F3",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  cardTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    marginRight: 8,
  },
  cardDate: {
    fontSize: 12,
    opacity: 0.6,
    minWidth: 70,
    textAlign: "right",
  },
  cardContent: {
    marginVertical: 8,
    maxHeight: 100,
    overflow: "hidden",
  },
  readMoreButton: {
    marginTop: 8,
  },
  readMoreText: {
    color: "#2196F3",
    fontWeight: "600",
    fontSize: 12,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    marginTop: 12,
    fontSize: 16,
    opacity: 0.5,
  },
});
