import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useTheme } from "../context/ThemeContext";

const cards = [
  {
    id: "1",
    brand: "Visa",
    last4: "4242",
    expiry: "08/27",
  },
  {
    id: "2",
    brand: "Mastercard",
    last4: "9821",
    expiry: "01/28",
  },
];

export default function PaymentMethodsScreen() {
  const { colors, spacing } = useTheme();
  const styles = createStyles(colors, spacing);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <Text style={styles.title}>Payment Methods</Text>
      <ScrollView
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      >
        {cards.map((card) => (
          <View key={card.id} style={styles.cardItem}>
            <View>
              <Text style={styles.cardBrand}>{card.brand}</Text>
              <Text style={styles.cardNumber}>•••• {card.last4}</Text>
            </View>
            <View style={styles.cardMeta}>
              <Text style={styles.cardExpiry}>{card.expiry}</Text>
              <Ionicons
                name="checkmark-circle-outline"
                size={22}
                color={colors.primary}
              />
            </View>
          </View>
        ))}
        <View style={styles.addCard}>
          <Ionicons
            name="add-circle-outline"
            size={24}
            color={colors.primary}
          />
          <Text style={styles.addText}>Add new payment method</Text>
        </View>
      </ScrollView>
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
      fontWeight: "700",
      color: colors.text,
      paddingHorizontal: spacing.md,
      paddingTop: spacing.sm,
      marginBottom: spacing.md,
    },
    list: {
      paddingHorizontal: spacing.md,
      paddingBottom: spacing.lg,
    },
    cardItem: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: colors.surface,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: colors.border,
      padding: spacing.md,
      marginBottom: spacing.md,
    },
    cardBrand: {
      fontSize: 16,
      fontWeight: "700",
      color: colors.text,
    },
    cardNumber: {
      fontSize: 14,
      color: colors.textSecondary,
      marginTop: spacing.xs,
    },
    cardMeta: {
      alignItems: "flex-end",
      gap: spacing.xs,
    },
    cardExpiry: {
      fontSize: 13,
      color: colors.textSecondary,
    },
    addCard: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.sm,
      backgroundColor: colors.muted,
      borderRadius: 16,
      padding: spacing.md,
      borderWidth: 1,
      borderColor: colors.border,
    },
    addText: {
      fontSize: 15,
      fontWeight: "700",
      color: colors.primary,
    },
  });
}
