import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';

export default function IntroScreen({ navigation }) {
  return (
    <ImageBackground 
      source={require('../assets/images/intro-bg.png')}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Weather app</Text>
        <Text style={styles.subtitle}>Discover the weather in your city and around the world!</Text>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('Weather')} 
        >
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFC107',
    marginBottom: 400,
  },
  subtitle: {
    fontSize: 20,
    textAlign: 'center',
    color: '#FFF',


  },
  button: {
    backgroundColor: '#FFC107',
    paddingVertical: 12,
    paddingHorizontal: 90,
    borderRadius: 25,
    position: 'absolute',
    bottom: 70, 
  },
  buttonText: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
  },
});
