// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Items from './Screens/Items';
import Reports from './Screens/Reports';
import Families from './Screens/Families';
import Settings from './Screens/Settings';



const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Items"
          component={Items}
          options={{ title: 'Items' }}
        />
        
        <Tab.Screen
          name="Reports"
          component={Reports}
          options={{ title: 'Reports' }}
        />

        <Tab.Screen
          name="Families"
          component={Families}
          options={{ title: 'Families' }}
        />
        
        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{ title: 'Settings' }}
        />

      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default TabNavigator;
