import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search for movies"
        placeholderTextColor="#ccc"
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleSearch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF6E9',
    borderRadius: 20, 
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  input: {
    color: '#0C1844',
    fontSize: 16,
  },
});

export default SearchBar;
