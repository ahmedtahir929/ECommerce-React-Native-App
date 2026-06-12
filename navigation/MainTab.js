import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Ionicons } from "@expo/vector-icons";

import { useCart } from "../context/CartContext";

import HomeScreen from "../screens/HomeScreen";
import DealsScreen from "../screens/DealsScreen";
import WishlistScreen from "../screens/WishlistScreen";
import CartScreen from "../screens/CartScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

function TabIcon({ route, focused, color, size }) {
  let iconName;

  switch (route.name) {
    case "Home":
      iconName = focused ? "home" : "home-outline";
      break;

    case "Deals":
      iconName = focused ? "sparkles" : "sparkles-outline";
      break;

    case "Wishlist":
      iconName = focused ? "heart" : "heart-outline";
      break;

    case "Cart":
      iconName = focused ? "cart" : "cart-outline";
      break;

    case "Profile":
      iconName = focused ? "person" : "person-outline";
      break;

    default:
      iconName = "ellipse-outline";
  }

  return <Ionicons name={iconName} size={size} color={color} />;
}

export default function MainTab() {
  const { totalItems } = useCart();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => (
          <TabIcon route={route} focused={focused} color={color} size={size} />
        ),

        tabBarActiveTintColor: "#2563EB",

        tabBarInactiveTintColor: "#64748B",

        tabBarStyle: {
          backgroundColor: "#fff",

          borderTopWidth: 1,

          borderTopColor: "#E2E8F0",

          paddingTop: 4,

          height: 60,
        },

        tabBarLabelStyle: {
          fontSize: 11,

          fontWeight: "500",
        },

        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Home" }}
      />

      <Tab.Screen
        name="Deals"
        component={DealsScreen}
        options={{ title: "Deals" }}
      />

      <Tab.Screen
        name="Wishlist"
        component={WishlistScreen}
        options={{ title: "Wishlist" }}
      />

      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarBadge: totalItems > 0 ? totalItems : undefined,
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: "Profile" }}
      />
    </Tab.Navigator>
  );
}
