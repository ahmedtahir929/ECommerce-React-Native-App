import { useState } from 'react';
import { SafeAreaView, StyleSheet, Switch, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '../context/ThemeContext';

export default function SettingsScreen() {
  const { colors, spacing, isDarkMode, setDarkMode } = useTheme();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  
  // ✅ Call the factory function here
  const styles = createStyles(colors, spacing); 

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Text style={styles.title}>Settings</Text>
      <View style={styles.optionCard}>
        <View style={styles.optionRow}>
          <View style={styles.optionIcon}> 
            <Ionicons name="moon-outline" size={20} color={colors.primary} />
          </View>
          <View style={styles.optionText}>
            <Text style={styles.optionTitle}>Dark Mode</Text>
            <Text style={styles.optionSubtitle}>Switch the app theme</Text>
          </View>
          <Switch
            value={isDarkMode}
            onValueChange={setDarkMode}
            trackColor={{ false: colors.border, true: colors.primary }}
            thumbColor={colors.surface}
          />
        </View>
      </View>
      <View style={styles.optionCard}>
        <View style={styles.optionRow}>
          <View style={styles.optionIcon}>
            <Ionicons name="notifications-outline" size={20} color={colors.primary} />
          </View>
          <View style={styles.optionText}>
            <Text style={styles.optionTitle}>Notifications</Text>
            <Text style={styles.optionSubtitle}>Enable or disable alerts</Text>
          </View>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: colors.border, true: colors.primary }}
            thumbColor={colors.surface}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

function createStyles(colors, spacing) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    title: {
      fontSize: 24,
      fontWeight: '700',
      color: colors.text,
      paddingHorizontal: spacing.md,
      paddingTop: spacing.sm,
      marginBottom: spacing.md,
    },
    optionCard: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: colors.border,
      marginHorizontal: spacing.md,
      marginBottom: spacing.md,
      padding: spacing.md,
    },
    optionRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: spacing.md,
    },
    optionIcon: {
      width: 44,
      height: 44,
      borderRadius: 12,
      backgroundColor: colors.muted,
      alignItems: 'center',
      justifyContent: 'center',
    },
    optionText: {
      flex: 1,
      marginLeft: spacing.sm,
    },
    optionTitle: {
      fontSize: 16,
      fontWeight: '700',
      color: colors.text,
    },
    optionSubtitle: {
      fontSize: 13,
      color: colors.textSecondary,
      marginTop: spacing.xs,
    },
  });
}