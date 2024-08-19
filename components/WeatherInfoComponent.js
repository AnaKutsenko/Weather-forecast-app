import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

export default function WeatherInfoComponent({ windSpeed, humidity, sunrise }) {
  return (
    <View style={styles.container}>
      <View style={styles.infoBlock}>
        <FontAwesome5 name="wind" size={24} color="white" />
        <Text style={styles.infoText}>{windSpeed} km/h</Text>
      </View>
      <View style={styles.infoBlock}>
        <FontAwesome5 name="tint" size={24} color="white" />
        <Text style={styles.infoText}>{humidity}%</Text>
      </View>
      <View style={styles.infoBlock}>
        <FontAwesome5 name="sun" size={24} color="white" />
        <Text style={styles.infoText}>{sunrise}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  infoBlock: {
    alignItems: 'center',
  },
  infoText: {
    fontSize: 18,
    color: 'white',
    marginTop: 5,
  },
});
