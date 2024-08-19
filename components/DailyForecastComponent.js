import React from 'react';
import { View, FlatList, Text, StyleSheet, Image } from 'react-native';

const weatherImages = {
  sun: require('../assets/images/sun.png'),
  moderaterain: require('../assets/images/moderaterain.png'),
  cloud: require('../assets/images/cloud.png'),
};

export default function DailyForecastComponent({ forecast }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Daily forecast</Text>
      <FlatList
        data={forecast}
        horizontal
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.forecastItem}>
            <Image source={weatherImages[item.icon]} style={styles.icon} />
            <Text style={styles.day}>{item.day}</Text>
            <Text style={styles.temperature}>{item.temperature}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  forecastItem: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    width: 120,  
    height: 100,
    borderRadius: 10,
    marginRight: 10,
    marginBottom: 20,  
    marginTop: 10,  
    padding: 5,
  },
  day: {
    fontSize: 16,
    color: 'white',
    marginBottom: 5,
  },
  temperature: {
    fontSize: 16,
    color: 'white',
    marginTop: 5,
  },
  icon: {
    width: 30,
    height: 30,
  },
});
