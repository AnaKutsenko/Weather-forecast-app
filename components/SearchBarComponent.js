import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function SearchBarComponent({ query, setQuery }) {
  return (
    <View style={styles.container}>
      <Icon name="search" size={20} color="#888" style={styles.searchIcon} />
      <TextInput
        style={styles.input}
        placeholder="Search city"
        placeholderTextColor="#888"
        value={query}
        onChangeText={text => setQuery(text)}
      />
      <TouchableOpacity onPress={() => setQuery('')} style={styles.clearButton}>
        <Text style={styles.clearText}>X</Text>
      </TouchableOpacity>
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

});
