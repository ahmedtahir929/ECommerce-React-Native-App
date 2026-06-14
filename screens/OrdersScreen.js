import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '../context/ThemeContext';

const orders = [
  {
    id: '101',
    status: 'Shipped',
    items: 3,
    total: 145.5,
    date: 'Jun 10, 2026',
    trackingSteps: ['Ordered', 'Packed', 'Shipped', 'Out for delivery'],
  },
  {
    id: '102',
    status: 'Delivered',
    items: 1,
    total: 59.99,
    date: 'Jun 2, 2026',
    trackingSteps: ['Ordered', 'Packed', 'Shipped', 'Delivered'],
  },
];

export default function OrdersScreen() {
  const { colors, spacing } = useTheme();
  const styles = createStyles(colors, spacing);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Text style={styles.title}>My Orders</Text>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <View>
                <Text style={styles.orderLabel}>Order #{item.id}</Text>
                <Text style={styles.orderMeta}>{item.date} • {item.items} items</Text>
              </View>
              <Text style={styles.orderStatus}>{item.status}</Text>
            </View>
            <Text style={styles.orderTotal}>${item.total.toFixed(2)}</Text>
            <View style={styles.trackingRow}>
              {item.trackingSteps.map((step, index) => (
                <View key={step} style={styles.trackingStep}>
                  <View style={styles.stepDot} />
                  <Text style={styles.stepText}>{step}</Text>
                  {index < item.trackingSteps.length - 1 && (
                    <View style={styles.stepLine} />
                  )}
                </View>
              ))}
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="receipt-outline" size={64} color={colors.border} />
            <Text style={styles.emptyText}>No orders yet</Text>
            <Text style={styles.emptySubtitle}>Start shopping to see order updates here.</Text>
          </View>
        }
      />
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
    list: {
      paddingHorizontal: spacing.md,
      paddingBottom: spacing.lg,
    },
    orderCard: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: colors.border,
      padding: spacing.md,
      marginBottom: spacing.md,
    },
    orderHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: spacing.sm,
    },
    orderLabel: {
      fontSize: 16,
      fontWeight: '700',
      color: colors.text,
    },
    orderMeta: {
      fontSize: 13,
      color: colors.textSecondary,
      marginTop: spacing.xs,
    },
    orderStatus: {
      fontSize: 12,
      fontWeight: '700',
      color: colors.primary,
      textTransform: 'uppercase',
    },
    orderTotal: {
      fontSize: 20,
      fontWeight: '700',
      color: colors.text,
      marginBottom: spacing.md,
    },
    trackingRow: {
      gap: spacing.xs,
    },
    trackingStep: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.xs,
    },
    stepDot: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: colors.primary,
    },
    stepText: {
      fontSize: 13,
      color: colors.textSecondary,
    },
    stepLine: {
      flex: 1,
      height: 1,
      backgroundColor: colors.border,
    },
    emptyState: {
      marginTop: spacing.lg,
      alignItems: 'center',
    },
    emptyText: {
      fontSize: 18,
      fontWeight: '700',
      color: colors.text,
      marginTop: spacing.md,
    },
    emptySubtitle: {
      fontSize: 14,
      color: colors.textSecondary,
      marginTop: spacing.xs,
      textAlign: 'center',
    },
  });
}