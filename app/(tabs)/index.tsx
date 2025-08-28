import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useNavigation } from 'expo-router';
import AppIcon from '@/components/ui/AppIcon';

export default function HomeScreen() {
  const navigation = useNavigation();
  const icons = [
    { name: 'Profile', screen: 'ProfileScreen', icon: 'account-circle-outline' },
    { name: 'Notifications', screen: 'NotificationsScreen', icon: 'bell-outline' },
    { name: 'Announcement', screen: 'AnnouncementScreen', icon: 'bell-ring-outline' },
    { name: 'Attendance', screen: 'AttendanceScreen', icon: 'calendar-check' },
    { name: 'Assignments', screen: 'AssignmentsScreen', icon: 'file-document-outline' },
    { name: 'Fees', screen: 'FeesScreen', icon: 'credit-card-outline' },
    // { name: 'Gallery', screen: 'GalleryScreen', icon: require('./../../../assets/images/card.png') },
    { name: 'Diary', screen: 'DiaryScreen', icon: 'notebook' },
    { name: 'Exams', screen: 'ExamsScreen', icon: 'briefcase-variant' },
    { name: 'Subjects', screen: 'SubjectsScreen', icon: 'book-open-variant' },
    { name: 'Leave', screen: 'LeaveScreen', icon: 'airplane' },
    { name: 'Events', screen: 'EventsScreen', icon: 'calendar-star' },
    { name: 'Library', screen: 'LibraryScreen', icon: 'bookshelf' },
    // { name: 'Transport', screen: 'TransportScreen', icon: require('./../../../assets/images/favicon.png') },
    { name: 'Concerns', screen: 'ConcernsScreen', icon: 'message-alert-outline' },
    // setting, reports
    // { name: 'Support', screen: 'SupportScreen', icon: 'question-outline' },
    { name: 'Reports', screen: 'ReportsScreen', icon: 'chart-line' },
    { name: 'Setting', screen: 'SettingScreen', icon: 'cog-outline' },
  ];

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }} headerImage={undefined}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.gridContainer}>
        {Array.from({ length: Math.ceil(icons.length / 3) }).map((_, rowIdx) => (
          <ThemedView key={rowIdx} style={styles.row}>
            {icons.slice(rowIdx * 3, rowIdx * 3 + 3).map((item, colIdx) => (
              <ThemedView key={item.name} style={styles.iconWrapper}>
                {/* <Image
                  source={item.icon}
                  style={styles.icon}
                /> */}
                <AppIcon name={item.icon} size={50} />
                <ThemedText
                  type="defaultSemiBold"
                  style={styles.iconLabel}
                  onPress={() => navigation.navigate(item.screen)}
                >
                  {item.name}
                </ThemedText>
              </ThemedView>
            ))}
          </ThemedView>
        ))}
      </ThemedView>
      
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  gridContainer: {
    marginVertical: 16,
    paddingHorizontal: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  iconWrapper: {
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
  },
  icon: {
    width: 64,
    height: 64,
    marginBottom: 8,
    borderRadius: 16,
    backgroundColor: '#eee',
  },
  iconLabel: {
    textAlign: 'center',
    fontSize: 12,
    marginTop: 4,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 258,
    width: 430,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
