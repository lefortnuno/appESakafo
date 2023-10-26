import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
} from 'react-native';
import { hideNavigationBar } from 'react-native-navigation-bar-color';
import BottomTabs from './src/navigation/BottomTabs';
import AddRecipe from './src/views/AddRecipe';
import EditRecipe from './src/views/EditRecipe';
import Landing from './src/views/Landing';
import OneRecipe from './src/views/OneRecipe';

const Stack = createNativeStackNavigator();


function App() {

  useEffect(() => {
    // hideNavigationBar();
  }, [])

  return (
    <>
      <StatusBar 
      // backgroundColor='transparent'
       translucent />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerShown: false
        }}>
          <Stack.Screen name="Landing" component={Landing} />
          <Stack.Screen name="BottomTabs" component={BottomTabs} />
          <Stack.Screen name="OneRecipe" component={OneRecipe} />
          <Stack.Screen name="EditRecipe" component={EditRecipe} />
          <Stack.Screen name="AddRecipe" component={AddRecipe} />

        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
});

export default App;
