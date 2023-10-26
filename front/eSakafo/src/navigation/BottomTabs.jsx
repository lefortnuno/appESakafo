import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../views/Home';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../styles/colors';
import Search from '../views/Search';
import MyRecipes from '../views/MyRecipes';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        // tabBarStyle: {
        //   height: 60,
        //   paddingVertical: 10,
        // },
        headerShown: false,
        tabBarIcon: ({focused, color}) => {
            let iconName;
          if (route.name === 'Home'){
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Recipe'){
            iconName = focused ? 'restaurant' : 'restaurant-outline';
          } else if (route.name === 'MyRecipes'){
            iconName = focused ? 'heart' : 'heart-outline';
          }
           else if (route.name === 'Search'){
            iconName = focused ? 'search' : 'search-outline';
          }
           else if (route.name === 'Settings'){
            iconName = focused ? 'settings' : 'settings-outline';
          }
          return <Ionicons name={iconName} color={color} size={24} />;
        },

        tabBarActiveTintColor: colors.orange,
        tabBarInactiveTintColor: '#828282',
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="MyRecipes" component={MyRecipes} />
      <Tab.Screen name="Settings" component={Home} />
    </Tab.Navigator>
  );
};

export default BottomTabs;

const styles = StyleSheet.create({});
