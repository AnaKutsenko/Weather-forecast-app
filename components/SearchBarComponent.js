import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, FlatList, TouchableWithoutFeedback, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { fetchLocations, fetchWeatherForecast } from '../api/weather'; 

export default function SearchBarComponent({ navigation }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleSearch = async (text) => {
    setQuery(text);
    if (text.trim() === '') {
      setSuggestions([]);
      return;
    }

    try {
    
      const data = await fetchLocations({ cityName: text });
      setSuggestions(data); 
    } catch (error) {
      console.error("Error fetching city suggestions:", error);
    }
  };

  const handleSelectCity = async (city) => {
    setQuery(city.name);
    setSuggestions([]);

    try {
      
      const data = await fetchWeatherForecast({ cityName: city.name, days: 7 });

      if (data && data.location) {
        navigation.navigate('WeatherDetail', {
          city: data.location.name,
          weatherData: {
            country: data.location.country,
            temperature: `${data.current.temp_c}°C`,
            weather: data.current.condition.text,
            windSpeed: data.current.wind_kph,
            humidity: data.current.humidity,
            sunrise: data.forecast.forecastday[0].astro.sunrise,
            dailyForecast: data.forecast.forecastday.map(day => ({
              day: day.date,
              temperature: `${day.day.avgtemp_c}°C`,
              icon: data.current.condition.text, 
            })),
          },
        });
      } else {
        Alert.alert('City not found');
      }
    } catch (error) {
      Alert.alert('Error fetching weather data');
      console.error(error);
    }
  };

  return (
    <View>
      <View style={styles.container}>
        <Icon name="search" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder="Search city"
          placeholderTextColor="#888"
          value={query}
          onChangeText={handleSearch}
        />
        <TouchableOpacity onPress={() => setQuery('')} style={styles.clearButton}>
          <Text style={styles.clearText}>X</Text>
        </TouchableOpacity>
      </View>

      {/* Выпадающий список предложений */}
      {suggestions.length > 0 && (
        <FlatList
          data={suggestions}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableWithoutFeedback onPress={() => handleSelectCity(item)}>
              <View style={styles.suggestionItem}>
                <Text style={styles.suggestionText}>{item.name}</Text>
              </View>
            </TouchableWithoutFeedback>
          )}
          style={styles.suggestionsList}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchIcon: {
    position: 'absolute',
    left: 10,
    zIndex: 1,
    color: 'rgba(172, 172, 172, 0.7)',
  },
  input: {
    flex: 1,
    padding: 15,
    paddingLeft: 40,
    borderRadius: 25,
    backgroundColor: 'rgba(87, 128, 137, 0.7)',
    color: 'white',
  },
  clearButton: {
    marginLeft: 10,
    padding: 10,
    backgroundColor: 'rgba(87, 128, 137, 0.7)',
    borderRadius: 55,
  },
  clearText: {
    color: 'white',
  },
  suggestionsList: {
    backgroundColor: 'rgba(87, 128, 137, 0.7)',
    borderRadius: 15,
    paddingHorizontal: 10,
  },
  suggestionItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  suggestionText: {
    color: 'white',
    fontSize: 16,
  },
});
