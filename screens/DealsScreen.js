import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { colors, spacing } from '../constants/theme';
import { products } from '../data/products';

const deals = products
  .sort((a, b) => b.rating - a.rating)
  .slice(0, 6)
  .map((product) => ({
    ...product,
    label: `Save ${(product.price * 0.15).toFixed(0)}%`,
  }));

export default function DealsScreen() {
  const { addToCart } = useCart();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Deals & Offers</Text>
        </View>
        <Ionicons name="pricetag-outline" size={28} color={colors.text} />
      </View>

      <View style={styles.banner}>
        <Text style={styles.bannerTitle}>Hot savings today</Text>
        <Text style={styles.bannerSubtitle}>Grab the best offers before they disappear.</Text>
      </View>

      <Text style={styles.sectionTitle}>Top Picks</Text>
      <FlatList
        data={deals}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.productRow}
        contentContainerStyle={styles.productList}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.productWrapper}>
            <ProductCard product={item} onAddToCart={addToCart} flatBottom />
            <View style={styles.dealLabel}>
              <Ionicons name="sparkles" size={12} color="#fff" />
              <Text style={styles.dealLabelText}>{item.label}</Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
  },
  subtle: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginTop: 4,
  },
  banner: {
    margin: spacing.md,
    padding: spacing.sm,
    borderRadius: 10,
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: colors.border,
  },
  bannerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primary,
  },
  bannerSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    paddingHorizontal: spacing.md,
    marginTop: spacing.sm,
    marginBottom: spacing.sm,
  },
  productList: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.lg,
  },
  productRow: {
    gap: spacing.md,
  },
  productWrapper: {
    flex: 1,
    marginBottom: spacing.md,
  },
  dealLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: -spacing.md,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    justifyContent: 'center',
  },
  dealLabelText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
  },
});