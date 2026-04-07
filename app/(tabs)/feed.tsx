import { StyleSheet, Pressable } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { ENDPOINTS } from "@/constants/endpoints";
import RenderHtml from "react-native-render-html";

export default function TabFeedScreen() {
  const [feeds, setFeeds] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadFeeds = async () => {
      try {
        setLoading(true);
        setError(null);
        const endpoint = `${ENDPOINTS["announcements"] || ENDPOINTS.ANNOUNCEMENTS || "http://localhost:3000/api/announcements"}/1`;
        const res = await fetch(endpoint, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setFeeds(Array.isArray(data) ? data : []);
      } catch (err) {
        const errorMsg =
          err instanceof Error ? err.message : "Failed to load feeds";
        console.error("Failed to fetch feeds:", errorMsg);
        setError(errorMsg);
        setFeeds([]);
      } finally {
        setLoading(false);
      }
    };
    loadFeeds();
  }, []);

  if (loading) {
    return (
      <ParallaxScrollView
        headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
        headerImage={
          <IconSymbol
            size={310}
            color="#808080"
            name="chevron.left.forwardslash.chevron.right"
            style={styles.headerImage}
          />
        }
      >
        <ThemedText>Loading feeds...</ThemedText>
      </ParallaxScrollView>
    );
  }

  if (error) {
    return (
      <ParallaxScrollView
        headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
        headerImage={
          <IconSymbol
            size={310}
            color="#808080"
            name="chevron.left.forwardslash.chevron.right"
            style={styles.headerImage}
          />
        }
      >
        <ThemedText type="subtitle" style={{ color: "#FF3B30" }}>
          Error: {error}
        </ThemedText>
      </ParallaxScrollView>
    );
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Feeds</ThemedText>
      </ThemedView>
      <ThemedText>Browse the latest feeds below.</ThemedText>
      {feeds.length === 0 ? (
        <ThemedText style={{ marginTop: 16, color: "#999" }}>
          No feeds available
        </ThemedText>
      ) : (
        <ThemedView style={{ marginTop: 16 }}>
          {feeds.map((feed) => (
            <ThemedView
              key={feed.id}
              style={{
                padding: 12,
                marginBottom: 12,
                borderRadius: 8,
                backgroundColor: "#f2f2f2",
              }}
            >
              <ThemedText>S.No: {feed.id}</ThemedText>
              <ThemedText>Title: {feed.title}</ThemedText>
              <ThemedView>
                <ThemedText>Description:</ThemedText>
                <RenderHtml
                  contentWidth={350}
                  source={{ html: feed.announcement || "" }}
                />
              </ThemedView>
              <ThemedText>Date: {feed.date}</ThemedText>
              {feed.attachment && (
                <Pressable
                  onPress={() => {
                    try {
                      router.push(feed.attachment);
                    } catch (err) {
                      console.error("Navigation error:", err);
                    }
                  }}
                >
                  <ThemedText style={{ color: "#007AFF", marginTop: 4 }}>
                    View Details
                  </ThemedText>
                </Pressable>
              )}
            </ThemedView>
          ))}
        </ThemedView>
      )}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
