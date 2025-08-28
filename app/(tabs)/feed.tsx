import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ENDPOINTS } from '@/constants/endpoints';
import RenderHtml from 'react-native-render-html';

export default function TabFeedScreen() {
  const [feeds, setFeeds] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    // Replace with your actual API endpoint
    fetch(ENDPOINTS.ANNOUNCEMENTS+'/1')
      .then(res => res.json())
      .then(data => setFeeds(data))
      .catch(() => setFeeds([]));
  }, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Feeds</ThemedText>
      </ThemedView>
      <ThemedText>Browse the latest feeds below.</ThemedText>
      <ThemedView style={{ marginTop: 16 }}>
        {feeds.map(feed => (
          <ThemedView
            key={feed.id}
            style={{
              padding: 12,
              marginBottom: 12,
              borderRadius: 8,
              backgroundColor: '#f2f2f2',
            }}>
            <ThemedText>S.No: {feed.id}</ThemedText>
            <ThemedText>Title: {feed.title}</ThemedText>
            <ThemedView>
              <ThemedText>Description:</ThemedText>
              <RenderHtml
                contentWidth={350}
                source={{ html: feed.announcement || '' }}
              />
            </ThemedView>
            <ThemedText>Date: {feed.date}</ThemedText>
            <ThemedText
              style={{ color: '#007AFF', marginTop: 4 }}
              onPress={() => navigation.navigate(feed.attachment)}>
              View Details
            </ThemedText>
          </ThemedView>
        ))}
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
