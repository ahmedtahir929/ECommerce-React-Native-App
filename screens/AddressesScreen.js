import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors, spacing } from '../constants/theme';

const addresses = [
  {
    id: '1',
    title: 'Home',
    line1: '123 Market St',
    line2: 'San Francisco, CA 94103',
    phone: '+1 415-555-0198',
  },
  {
    id: '2',
    title: 'Work',
    line1: '450 Mission Ave',
    line2: 'Los Angeles, CA 90017',
    phone: '+1 213-555-0147',
  },
];

export default function AddressesScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Text style={styles.title}>Saved Addresses</Text>
      <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
        {addresses.map((address) => (
          <View key={address.id} style={styles.addressCard}>
            <View style={styles.addressHeader}>
              <Text style={styles.addressTitle}>{address.title}</Text>
              <Ionicons name="location-outline" size={20} color={colors.primary} />
            </View>
            <Text style={styles.addressLine}>{address.line1}</Text>
            <Text style={styles.addressLine}>{address.line2}</Text>
            <Text style={styles.addressPhone}>{address.phone}</Text>
          </View>
        ))}
        <View style={styles.addCard}>
          <Ionicons name="add-circle-outline" size={24} color={colors.primary} />
          <Text style={styles.addText}>Add new address</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
  list: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.lg,
  },
  addressCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  addressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  addressTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  addressLine: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  addressPhone: {
    fontSize: 14,
    color: colors.text,
    marginTop: spacing.sm,
  },
  addCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: '#EFF6FF',
    borderRadius: 16,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  addText: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.primary,
  },
});