import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function WeatherCardComponent({ city, weather, temperature, icon }) {
  return (
    <View style={styles.card}>
      <View style={styles.textContainer}>
        <Text style={styles.city}>{city}</Text>
        <Text style={styles.weather}>{weather}</Text>
        <Text style={styles.temperature}>{temperature}</Text>
      </View>
      <View style={styles.iconContainer}>
        <Image source={icon} style={styles.icon} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 15,
    backgroundColor: 'rgba(87, 128, 137, 0.7)',
    borderRadius: 25,
    marginBottom: 10,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  textContainer: {
    flex: 3,
    flexDirection: 'column',
  },
  city: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  weather: {
    fontSize: 16,
    color: 'white',
    paddingTop: 5,
  },
  temperature: {
    fontSize: 16,
    color: 'white',
    paddingTop: 5,
  },
  icon: {
    width: 80,
    height: 80,
  },
});
