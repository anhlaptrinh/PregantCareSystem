import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const Header = ({ onSearch, onFilter }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity 
        style={styles.searchButton}
        onPress={onSearch}
      >
        <FontAwesome name="search" size={20} color="#615EFC" />
        <Text style={styles.searchText}>Search communities...</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.filterButton}
        onPress={onFilter}
      >
        <FontAwesome name="filter" size={20} color="#615EFC" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  searchButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 8,
    marginRight: 10,
  },
  searchText: {
    marginLeft: 10,
    color: '#666',
    fontSize: 14,
  },
  filterButton: {
    padding: 10,
  }
});

export default Header;