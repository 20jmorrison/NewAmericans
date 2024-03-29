import React, { useCallback, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Superuser from './Screens/Admins';
import Families from './Screens/Families';
import Order from './Screens/Order';
import Admins from './Screens/Admins'
import Inventory from './Screens/Inventory';
import FilteredReports from './Screens/FilteredReports';
import Reports from './Screens/Reports';
import StudentOrders from './Screens/StudentOrders';
import ProductsOrder from './Screens/ProductsOrder';
import StudentOrdersItems from './Screens/StudentOrdersItems';
import PasswordProtectedScreen from './Screens/PasswordProtectedScreen'; // Import the screen
import { Image } from 'react-native';
import OrderIcon from './assets/order.png';
import InventoryIcon from './assets/inventory.png';
import FamilyIcon from './assets/family.png';
import AdminIcon from './assets/admin.png';
import ReportsIcon from './assets/reports.png';
import Logo from './assets/snhucfna.png';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();




const OrderStack = createNativeStackNavigator();
function OrderStackScreen() {
  return (
    <OrderStack.Navigator>
      <OrderStack.Screen
        name="OrderList"
        component={Order}
        options={{ headerShown: false }}
      />
      <OrderStack.Screen
        name="ProductsOrder"
        component={ProductsOrder}
        options={{ headerTitle: 'Products' }}
      />
    </OrderStack.Navigator>
  );
}
const ReportsStack = createNativeStackNavigator();
function ReportsStackScreen() {
  return (
    <ReportsStack.Navigator>
      <ReportsStack.Screen
        name="Reports"
        component={Reports}
        options={{ headerShown: false }}
      />
      <ReportsStack.Screen
        name="FilteredReports"
        component={FilteredReports}
        options={{ headerTitle: 'Filtered Reports' }}
      />
    </ReportsStack.Navigator>
)}

const AdminStack = createNativeStackNavigator();
function AdminStackScreen() {
  return (
    <AdminStack.Navigator>
      <AdminStack.Screen
        name="AdminsScreen"
        component={Admins}
        options={{ headerShown: false }}
      />
      <AdminStack.Screen
        name="PasswordProtectedScreen"
        component={PasswordProtectedScreen}
        options={{ headerShown: false }}
      />
    </AdminStack.Navigator>
  );
}

const Stack = createNativeStackNavigator();
function FamiliesStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="FamilyList"
        component={Families}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="StudentOrders"
        component={StudentOrders}
        options={{ headerTitle: 'Student Orders' }}
      />
      <Stack.Screen
        name="StudentOrdersItems"
        component={StudentOrdersItems}
        options={{ headerTitle: 'Order Items' }}
      />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

const TabNavigator = () => {

  const [fontsLoaded] = useFonts({
    'Nunito-Regular': require('./assets/Fonts/Nunito/static/Nunito-Regular.ttf'),
    'Nunito-SemiBold': require('./assets/Fonts/Nunito/static/Nunito-SemiBold.ttf'),
    'Nunito-Bold': require('./assets/Fonts/Nunito/static/Nunito-Bold.ttf'),
    'Nunito-Black': require('./assets/Fonts/Nunito/static/Nunito-Black.ttf'),

  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    if (fontsLoaded) {
      onLayoutRootView();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <NavigationContainer>
      <Tab.Navigator
        onLayout={onLayoutRootView}
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: '#F3D014',
          tabBarStyle: {
            height: 90,
            paddingHorizontal: 5,
            paddingTop: 0,
            backgroundColor: 'rgba(8,34,65,1)',
            position: 'absolute',
            borderTopWidth: 0,
          },
          tabBarLabelStyle: {
            fontFamily: 'Nunito-Bold',
            fontSize: 12,
          },
          headerTitleStyle: {
            fontFamily: 'Nunito-Bold',
            fontSize: 18,
          }
        })}
      >
        <Tab.Screen
          name="Admins"
          component={AdminStackScreen}
          options={{
            title: 'Admins',
            tabBarIcon: ({ color, size }) => (
              <Image source={AdminIcon} style={{ tintColor: color, width: size, height: size }} />
            ),
            headerStyle: {
              backgroundColor: 'rgba(8,34,65,1)',
            },
            headerTintColor: '#ffff',
            headerLeft: () => (
              <Image source={Logo} style={{ width: '60%', height: 30, marginLeft: 10, marginBottom: 15 }} />
            ),
          }}
        />

        <Tab.Screen
          name="Families"
          component={FamiliesStackScreen}
          options={{
            title: 'Family',
            tabBarIcon: ({ color, size }) => (
              <Image source={FamilyIcon} style={{ tintColor: color, width: size, height: size }} />
            ),
            headerStyle: {
              backgroundColor: 'rgba(8,34,65,1)',
            },
            headerTintColor: '#ffff',
            headerLeft: () => (
              <Image source={Logo} style={{ width: '60%', height: 30, marginLeft: 10, marginBottom: 15 }} />
            ),
          }}
        />
        <Tab.Screen
          name="Order"
          component={OrderStackScreen}
          options={{
            title: 'Order',
            tabBarIcon: ({ color, size }) => (
              <Image source={OrderIcon} style={{ tintColor: color, width: size, height: size }} />
            ),
            headerStyle: {
              backgroundColor: 'rgba(8,34,65,1)',
            },
            headerTintColor: '#ffff',
            headerLeft: () => (
              <Image source={Logo} style={{ width: '60%', height: 30, marginLeft: 10, marginBottom: 15 }} />
            ),
          }}
        />
        <Tab.Screen
          name="Inventory"
          component={Inventory}
          options={{
            title: 'Inventory',
            tabBarIcon: ({ color, size }) => (
              <Image source={InventoryIcon} style={{ tintColor: color, width: size, height: size }} />
            ),
            headerStyle: {
              backgroundColor: 'rgba(8,34,65,1)',
            },
            headerTintColor: '#ffff',
            headerLeft: () => (
              <Image source={Logo} style={{ width: '60%', height: 30, marginLeft: 10, marginBottom: 15 }} />
            ),
          }}
        />
        <Tab.Screen
          name="Reports"
          component={ReportsStackScreen}
          options={{
            title: 'Reports',
            tabBarIcon: ({ color, size }) => (
              <Image source={ReportsIcon} style={{ tintColor: color, width: size, height: size }} />
            ),
            headerStyle: {
              backgroundColor: 'rgba(8,34,65,1)',
            },
            headerTintColor: '#ffff',
            headerLeft: () => (
              <Image source={Logo} style={{ width: '60%', height: 30, marginLeft: 10, marginBottom: 15 }} />
            ),
          }}
        />

        {/* Add the PasswordProtectedScreen */}
        <Tab.Screen
          name="PasswordProtectedScreen"
          component={PasswordProtectedScreen}
          options={{
            tabBarButton: () => null, // Hide the tab button for this screen
            tabBarVisible: false, // Hide the tab bar when navigating to this screen
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default TabNavigator;