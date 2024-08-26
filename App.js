import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import IntroScreen from './screens/IntroScreen';
import WeatherScreen from './screens/WeatherScreen';
import WeatherDetailScreen from './screens/WeatherDetailScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Intro">
        <Stack.Screen 
          name="Intro" 
          component={IntroScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Weather" 
          component={WeatherScreen} 
        />
        <Stack.Screen 
          name="WeatherDetail" 
          component={WeatherDetailScreen} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
