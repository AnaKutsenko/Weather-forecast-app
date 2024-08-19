import React from 'react';
import { View, ScrollView, StyleSheet, ImageBackground, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import WeatherDetailHeaderComponent from '../components/WeatherDetailHeaderComponent';
import WeatherInfoComponent from '../components/WeatherInfoComponent';
import DailyForecastComponent from '../components/DailyForecastComponent';

export default function WeatherDetailScreen({ route }) {
  const { city, weatherData } = route.params;

  
  if (!weatherData) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'white' }}>Loading...</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={require('../assets/images/bg.png')}
      style={styles.background}
      blurRadius={70}
    >
      <SafeAreaView style={styles.container}>
        <WeatherDetailHeaderComponent 
          city={city} 
          country={weatherData.country} 
          temperature={weatherData.temperature}
          weather={weatherData.weather}
        />
        <WeatherInfoComponent 
          windSpeed={weatherData.windSpeed} 
          humidity={weatherData.humidity} 
          sunrise={weatherData.sunrise} 
        />
        <DailyForecastComponent forecast={weatherData.dailyForecast} />
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 10,
  },
});
