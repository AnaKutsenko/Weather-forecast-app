import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { weatherImages } from '../constants'; 

export default function WeatherDetailHeaderComponent({ city, country, temperature, weather }) {
  return (
    <View style={styles.container}>
      <Text style={styles.city}>{city},<Text style={styles.country}>{country}</Text></Text>
      {/* Используем изображение в зависимости от текущих погодных условий */}
      <Image source={weatherImages[weather] || weatherImages['other']} style={styles.weatherIcon} />
      <Text style={styles.temperature}>{temperature}</Text>
      <Text style={styles.weather}>{weather}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 60,
  },
  city: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },
  country: {
    fontSize: 24,
    color: 'white',
  },
  temperature: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 30,
  },
  weather: {
    fontSize: 24,
    color: 'white',
  },
  weatherIcon: {
    width: 100,
    height: 100,
    marginBottom: 10,
    marginTop: 40,
  },
});
