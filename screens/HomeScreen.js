import { useState } from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import ProductCard from "../components/ProductCard";
import NotificationPopup from "../components/NotificationPopup";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";
import { categories, products } from "../data/products";

export default function HomeScreen() {
  const { addToCart } = useCart();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { colors, spacing } = useTheme();
  const styles = createStyles(colors, spacing);
  const [showNotifications, setShowNotifications] = useState(false);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>ShopMart</Text>
        </View>
        <Pressable
          style={styles.notificationButton}
          onPress={() => setShowNotifications(true)}
        >
          <Ionicons
            name="notifications-outline"
            size={22}
            color={colors.text}
          />
        </Pressable>
      </View>

      <View style={styles.searchBar}>
        <Ionicons
          name="search-outline"
          size={20}
          color={colors.textSecondary}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search products..."
          placeholderTextColor={colors.textSecondary}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <View style={styles.categoryListContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryList}
        >
          <Pressable
            style={[
              styles.categoryPill,
              selectedCategory === "All" && styles.categoryPillActive,
            ]}
            onPress={() => setSelectedCategory("All")}
          >
            <Text
              style={[
                styles.categoryPillText,
                selectedCategory === "All" && styles.categoryPillTextActive,
              ]}
            >
              All
            </Text>
          </Pressable>
          {categories.map((category) => (
            <Pressable
              key={category.id}
              style={[
                styles.categoryPill,
                selectedCategory === category.name && styles.categoryPillActive,
              ]}
              onPress={() => setSelectedCategory(category.name)}
            >
              <Ionicons
                name={category.icon}
                size={14}
                color={
                  selectedCategory === category.name
                    ? colors.surface
                    : colors.textSecondary
                }
              />
              <Text
                style={[
                  styles.categoryPillText,
                  selectedCategory === category.name &&
                    styles.categoryPillTextActive,
                ]}
              >
                {category.name}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <Text style={styles.sectionTitle}>Featured Products</Text>

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.productRow}
        contentContainerStyle={styles.productList}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.productWrapper}>
            <ProductCard product={item} onAddToCart={addToCart} />
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="search-outline" size={48} color={colors.border} />
            <Text style={styles.emptyText}>No products found</Text>
          </View>
        }
      />
      <NotificationPopup
        visible={showNotifications}
        onClose={() => setShowNotifications(false)}
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
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: spacing.md,
      paddingTop: spacing.sm,
    },
    title: {
      fontSize: 24,
      fontWeight: "700",
      color: colors.text,
    },
    notificationButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.surface,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: colors.border,
    },
    searchBar: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.surface,
      marginHorizontal: spacing.md,
      marginTop: spacing.md,
      paddingHorizontal: spacing.md,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      gap: spacing.sm,
    },
    searchInput: {
      flex: 1,
      paddingVertical: spacing.md,
      fontSize: 15,
      color: colors.text,
    },
    categoryListContainer: {
      marginTop: spacing.md,
      marginBottom: spacing.lg,
    },
    categoryList: {
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.xs,
      alignItems: "center",
      gap: spacing.sm,
    },
    categoryPill: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      minHeight: 36,
      borderRadius: 18,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
    },
    categoryPillActive: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    categoryPillText: {
      fontSize: 13,
      fontWeight: "600",
      color: colors.textSecondary,
      lineHeight: 18,
    },
    categoryPillTextActive: {
      color: colors.surface,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: "700",
      color: colors.text,
      paddingHorizontal: spacing.md,
      marginTop: spacing.xs,
      marginBottom: spacing.md,
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
    },
    emptyState: {
      alignItems: "center",
      paddingVertical: spacing.xl,
      gap: spacing.sm,
    },
    emptyText: {
      fontSize: 16,
      color: colors.textSecondary,
    },
  });
}
