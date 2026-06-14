import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { CartProvider } from './context/CartContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import MainTab from './navigation/MainTab';
import OrdersScreen from './screens/OrdersScreen';
import AddressesScreen from './screens/AddressesScreen';
import PaymentMethodsScreen from './screens/PaymentMethodsScreen';
import SettingsScreen from './screens/SettingsScreen';
import HelpSupportScreen from './screens/HelpSupportScreen';
import EditProfileScreen from './screens/EditProfileScreen';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  const { colors, isDarkMode } = useTheme();

  const navigationTheme = {
    ...(isDarkMode ? DarkTheme : DefaultTheme),
    colors: {
      ...(isDarkMode ? DarkTheme.colors : DefaultTheme.colors),
      background: colors.background,
      card: colors.surface,
      text: colors.text,
      border: colors.border,
      primary: colors.primary,
      notification: colors.primary,
    },
  };

  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: colors.surface },
          headerTintColor: colors.text,
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen
          name="Main"
          component={MainTab}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Orders" component={OrdersScreen} options={{ title: 'My Orders' }} />
        <Stack.Screen
          name="Addresses"
          component={AddressesScreen}
          options={{ title: 'Saved Addresses' }}
        />
        <Stack.Screen
          name="PaymentMethods"
          component={PaymentMethodsScreen}
          options={{ title: 'Payment Methods' }}
        />
        <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }} />
        <Stack.Screen
          name="HelpSupport"
          component={HelpSupportScreen}
          options={{ title: 'Help & Support' }}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfileScreen}
          options={{ title: 'Edit Profile' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <CartProvider>
          <AppNavigator />
        </CartProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
