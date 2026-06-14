import { Alert, FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

export default function CartScreen() {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();
  const { colors, spacing } = useTheme();
  const styles = createStyles(colors, spacing);

  const handleCheckout = () => {
    Alert.alert('Checkout', 'Order placed successfully!');
  };

  if (items.length === 0) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <Text style={styles.title}>My Cart</Text>
        <View style={styles.emptyState}>
          <Ionicons name="cart-outline" size={64} color={colors.border} />
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptySubtitle}>Add products from the Home or Categories tab</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Text style={styles.title}>My Cart</Text>
      <Text style={styles.itemCount}>{items.length} item(s)</Text>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName} numberOfLines={2}>
                {item.name}
              </Text>
              <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
              <View style={styles.quantityRow}>
                <Pressable
                  style={styles.quantityButton}
                  onPress={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  <Ionicons name="remove" size={16} color={colors.text} />
                </Pressable>
                <Text style={styles.quantity}>{item.quantity}</Text>
                <Pressable
                  style={styles.quantityButton}
                  onPress={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  <Ionicons name="add" size={16} color={colors.text} />
                </Pressable>
              </View>
            </View>
            <Pressable onPress={() => removeFromCart(item.id)} style={styles.removeButton}>
              <Ionicons name="trash-outline" size={20} color={colors.danger} />
            </Pressable>
          </View>
        )}
      />

      <View style={styles.footer}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalPrice}>${totalPrice.toFixed(2)}</Text>
        </View>
        <Pressable style={styles.checkoutButton} onPress={handleCheckout}>
          <Text style={styles.checkoutText}>Checkout</Text>
          <Ionicons name="arrow-forward" size={20} color="#fff" />
        </Pressable>
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
    },
    itemCount: {
      fontSize: 14,
      color: colors.textSecondary,
      paddingHorizontal: spacing.md,
      marginBottom: spacing.md,
    },
    list: {
      paddingHorizontal: spacing.md,
      paddingBottom: spacing.md,
    },
    cartItem: {
      flexDirection: 'row',
      backgroundColor: colors.surface,
      borderRadius: 12,
      padding: spacing.md,
      marginBottom: spacing.md,
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: 'center',
    },
    itemImage: {
      width: 72,
      height: 72,
      borderRadius: 8,
      backgroundColor: colors.border,
    },
    itemDetails: {
      flex: 1,
      marginLeft: spacing.md,
    },
    itemName: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.text,
    },
    itemPrice: {
      fontSize: 16,
      fontWeight: '700',
      color: colors.primary,
      marginTop: 4,
    },
    quantityRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: spacing.sm,
      gap: spacing.sm,
    },
    quantityButton: {
      width: 28,
      height: 28,
      borderRadius: 14,
      backgroundColor: colors.background,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: colors.border,
    },
    quantity: {
      fontSize: 15,
      fontWeight: '600',
      color: colors.text,
      minWidth: 20,
      textAlign: 'center',
    },
    removeButton: {
      padding: spacing.sm,
    },
    footer: {
      backgroundColor: colors.surface,
      padding: spacing.md,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    totalRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: spacing.md,
    },
    totalLabel: {
      fontSize: 16,
      color: colors.textSecondary,
    },
    totalPrice: {
      fontSize: 22,
      fontWeight: '700',
      color: colors.text,
    },
    checkoutButton: {
      flexDirection: 'row',
      backgroundColor: colors.primary,
      borderRadius: 12,
      paddingVertical: spacing.md,
      alignItems: 'center',
      justifyContent: 'center',
      gap: spacing.sm,
    },
    checkoutText: {
      fontSize: 16,
      fontWeight: '700',
      color: colors.onPrimary,
    },
    emptyState: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: spacing.xl,
      gap: spacing.sm,
    },
    emptyTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text,
      marginTop: spacing.md,
    },
    emptySubtitle: {
      fontSize: 14,
      color: colors.textSecondary,
      textAlign: 'center',
    },
  });
}
