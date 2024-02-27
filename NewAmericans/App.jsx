import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Settings from './Screens/Settings';
import Families from './Screens/Families';
import Order from './Screens/Order';
import Inventory from './Screens/Inventory';
import Reports from './Screens/Reports';
import { Image } from 'react-native'; // Import Image component from react-native
import OrderIcon from './assets/order.png';
import InventoryIcon from './assets/inventory.png';
import FamilyIcon from './assets/family.png';
import SettingsIcon from './assets/settings.png';
import ReportsIcon from './assets/reports.png';



const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
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
          
        })}
      >


        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{
            title: 'Settings', tabBarIcon: ({ color, size }) => (
              <Image source={SettingsIcon} style={{ tintColor: color, width: size, height: size }} />
            ),
            headerStyle: {
              backgroundColor: 'rgba(8,34,65,1)',
            },
            headerTintColor: '#ffff',

          }}
        />

        <Tab.Screen
          name="Families"
          component={Families}
          options={{
            title: 'Family', tabBarIcon: ({ color, size }) => (
              <Image source={FamilyIcon} style={{ tintColor: color, width: size, height: size }} />
            ),
            headerStyle: {
              backgroundColor: 'rgba(8,34,65,1)', // Change the header background color here
            },
            headerTintColor: '#ffff',
          }}
        />

        <Tab.Screen
          name="Order"
          component={Order}
          options={{
            title: 'Order', tabBarIcon: ({ color, size }) => (
              <Image source={OrderIcon} style={{ tintColor: color, width: size, height: size }} />
            ),
            headerStyle: {
              backgroundColor: 'rgba(8,34,65,1)', // Change the header background color here
            },
            headerTintColor: '#ffff',
          }}
        />

        <Tab.Screen
          name="Inventory"
          component={Inventory}
          options={{
            title: 'Inventory', title: 'Inventory', tabBarIcon: ({ color, size }) => (
              <Image source={InventoryIcon} style={{ tintColor: color, width: size, height: size }} />
            ),
            headerStyle: {
              backgroundColor: 'rgba(8,34,65,1)', // Change the header background color here
            },
            headerTintColor: '#ffff',
          }}
        />

        <Tab.Screen
          name="Reports"
          component={Reports}
          options={{
            title: 'Reports', title: 'Reports', tabBarIcon: ({ color, size }) => (
              <Image source={ReportsIcon} style={{ tintColor: color, width: size, height: size }} />
            ),
            headerStyle: {
              backgroundColor: 'rgba(8,34,65,1)', // Change the header background color here
            },
            headerTintColor: '#ffff',
          }}
        />

      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default TabNavigator;
