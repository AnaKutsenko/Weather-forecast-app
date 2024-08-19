import React, { useState } from 'react';
import { View, FlatList, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import SearchBarComponent from '../components/SearchBarComponent';
import WeatherCardComponent from '../components/WeatherCardComponent';

const dummyData = [
  { id: '1', city: 'Mechelen', weather: 'Sunny', temperature: '23.6°', icon: 'sun' },
  { id: '2', city: 'Hasselt', weather: 'Thunderstorm', temperature: '23.6°', icon: 'storm' },
  { id: '3', city: 'Antwerp', weather: 'Rain', temperature: '23.6°', icon: 'rain' },
  { id: '4', city: 'Leuven', weather: 'Sunny', temperature: '23.6°', icon: 'sun' },
  { id: '5', city: 'Ghent', weather: 'Cloudy', temperature: '23.6°', icon: 'cloud' },
];

export default function WeatherScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = dummyData.filter(item => 
    item.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ImageBackground 
      source={require('../assets/images/bg.png')}
      style={styles.background}
      blurRadius={70}
    >
      <View style={styles.container}>
        <SearchBarComponent query={searchQuery} setQuery={setSearchQuery} />
        <FlatList
          data={filteredData}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity 
              onPress={() => navigation.navigate('WeatherDetail', { 
                city: item.city,
                weatherData: {
                  country: 'Belgium',
                  temperature: item.temperature,
                  weather: item.weather,
                  windSpeed: 10.4, 
                  humidity: 69, 
                  sunrise: '06:12 AM', 
                  dailyForecast: [
                    { day: 'Tuesday', temperature: 21.9, icon: 'sun' },
                    { day: 'Wednesday', temperature: 19.4, icon: 'moderaterain' },
                    { day: 'Thursday', temperature: 18.4, icon: 'cloud' },
                    { day: 'Friday', temperature: 20.1, icon: 'sun' },
      { day: 'Saturday', temperature: 22.3, icon: 'sun' },
      { day: 'Sunday', temperature: 21.7, icon: 'cloud' },
      { day: 'Monday', temperature: 19.8, icon: 'moderaterain' },
                  ],
                }
              })}
            >
              <WeatherCardComponent 
                city={item.city} 
                weather={item.weather} 
                temperature={item.temperature} 
                icon={item.icon} 
              />
            </TouchableOpacity>
          )}
        />
      </View>
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
    backgroundColor: 'rgba(0,0,0,0.3)', 
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
});
