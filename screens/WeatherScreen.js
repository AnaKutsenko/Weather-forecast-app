import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, ImageBackground, TouchableOpacity, ActivityIndicator } from 'react-native';
import SearchBarComponent from '../components/SearchBarComponent';
import WeatherCardComponent from '../components/WeatherCardComponent';
import { fetchWeatherForecast } from '../api/weather'; // Импорт функции для API-запросов
import { weatherImages } from '../constants'; // Импорт изображений погоды

const cities = ['Mechelen', 'Hasselt', 'Antwerp', 'Leuven', 'Ghent'];

export default function WeatherScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const dataPromises = cities.map(city => 
          fetchWeatherForecast({ cityName: city, days: 1 })
        );
        const data = await Promise.all(dataPromises);
        setWeatherData(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredData = weatherData.filter(item => 
    item.location?.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <ImageBackground 
      source={require('../assets/images/bg.png')}
      style={styles.background}
      blurRadius={70}
    >
      <View style={styles.container}>
        <SearchBarComponent query={searchQuery} setQuery={setSearchQuery} navigation={navigation} />
        <FlatList
          data={filteredData}
          keyExtractor={item => item.location.name}
          renderItem={({ item }) => (
            <TouchableOpacity 
              onPress={async () => {
                try {
                  const fullWeatherData = await fetchWeatherForecast({ cityName: item.location.name, days: 7 });
                  if (fullWeatherData && fullWeatherData.location) {
                    navigation.navigate('WeatherDetail', {
                      city: fullWeatherData.location.name,
                      weatherData: {
                        country: fullWeatherData.location.country,
                        temperature: `${fullWeatherData.current.temp_c}°C`,
                        weather: fullWeatherData.current.condition.text,
                        windSpeed: fullWeatherData.current.wind_kph,
                        humidity: fullWeatherData.current.humidity,
                        sunrise: fullWeatherData.forecast.forecastday[0].astro.sunrise,
                        dailyForecast: fullWeatherData.forecast.forecastday.map(day => ({
                          day: day.date,
                          temperature: `${day.day.avgtemp_c}°C`,
                          icon: fullWeatherData.current.condition.text, // Иконка для каждого дня
                        })),
                      },
                    });
                  } else {
                    console.error('Incomplete data for navigation');
                  }
                } catch (error) {
                  console.error('Error fetching full weather data:', error);
                }
              }}
            >
              <WeatherCardComponent 
                city={item.location.name} 
                weather={item.current.condition.text} 
                temperature={`${item.current.temp_c}°C`} 
                icon={weatherImages[item.current.condition.text] ? weatherImages[item.current.condition.text] : weatherImages['other']}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
