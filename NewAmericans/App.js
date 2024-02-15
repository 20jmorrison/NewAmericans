// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Settings from './Screens/Settings';
import Families from './Screens/Families';
import Order from './Screens/Order';
import Inventory from './Screens/Inventory';
import Reports from './Screens/Reports';


const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>

        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{ title: 'Settings' }}
        />

        <Tab.Screen
          name="Families"
          component={Families}
          options={{ title: 'Families' }}
        />

        <Tab.Screen
          name="Order"
          component={Order}
          options={{ title: 'Order' }}
        />

        <Tab.Screen
          name="Inventory"
          component={Inventory}
          options={{ title: 'Inventory' }}
        />
        
        <Tab.Screen
          name="Reports"
          component={Reports}
          options={{ title: 'Reports' }}
        />

        

      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default TabNavigator;
