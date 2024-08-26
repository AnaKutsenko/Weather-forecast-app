import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ImageBackground, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import WeatherDetailHeaderComponent from '../components/WeatherDetailHeaderComponent';
import WeatherInfoComponent from '../components/WeatherInfoComponent';
import DailyForecastComponent from '../components/DailyForecastComponent';
import { fetchWeatherForecast } from '../api/weather'; 
import { weatherImages } from '../constants'; 

export default function WeatherDetailScreen({ route }) {
  const { city, weatherData: initialWeatherData } = route.params;

  const [weatherData, setWeatherData] = useState(initialWeatherData || null);
  const [loading, setLoading] = useState(!initialWeatherData);

  useEffect(() => {
    console.log("WeatherDetailScreen opened for city:", city);
    if (initialWeatherData) {
      console.log("Using initial weather data:", initialWeatherData);
    }

    if (!initialWeatherData) {
      const fetchData = async () => {
        try {
          const data = await fetchWeatherForecast({ cityName: city, days: 7 });
          const formattedData = {
            country: data.location.country,
            temperature: `${data.current.temp_c}°C`,
            weather: data.current.condition.text,
            windSpeed: data.current.wind_kph,
            humidity: data.current.humidity,
            sunrise: data.forecast.forecastday[0].astro.sunrise,
            dailyForecast: data.forecast.forecastday.map(day => ({
              day: day.date,
              temperature: `${day.day.avgtemp_c}°C`,
              icon: weatherImages[day.day.condition.text] ? weatherImages[day.day.condition.text] : weatherImages['other'],
            })),
          };
          console.log("Daily forecast data:", formattedData.dailyForecast); 
          setWeatherData(formattedData);
        } catch (error) {
          console.error("Error fetching weather data:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    } else {
      setLoading(false);
    }
  }, [city]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'white' }}>Loading...</Text>
      </View>
    );
  }

  if (!weatherData) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'white' }}>Unable to fetch weather data</Text>
      </View>
    );
  }

  console.log("Daily Forecast Data (final):", weatherData.dailyForecast); 

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
        {/* Передаем данные прогноза на несколько дней */}
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
