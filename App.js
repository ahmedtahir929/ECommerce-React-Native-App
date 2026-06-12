import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { CartProvider } from './context/CartContext';
import MainTab from './navigation/MainTab';
import OrdersScreen from './screens/OrdersScreen';
import AddressesScreen from './screens/AddressesScreen';
import PaymentMethodsScreen from './screens/PaymentMethodsScreen';
import SettingsScreen from './screens/SettingsScreen';
import HelpSupportScreen from './screens/HelpSupportScreen';
import EditProfileScreen from './screens/EditProfileScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <CartProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
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
      </CartProvider>
    </SafeAreaProvider>
  );
}
