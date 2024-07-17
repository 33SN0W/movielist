import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, ActivityIndicator, RefreshControl, View, Text, StatusBar } from 'react-native';
import axios from 'axios';
import SearchBar from './src/components/SearchBar';
import MovieList from './src/components/MovieList';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchMovies = async (query) => {
    setLoading(true);  
    try {
      const response = await axios.get(`https://openlibrary.org/search.json?q=${query}`);
      setMovies(response.data.docs);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);  
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchMovies('new query').finally(() => setRefreshing(false));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        <Text style={styles.header}>MovieList</Text>
        <Text style={styles.subHeader}>Welcome to the movie store</Text>
        <SearchBar onSearch={fetchMovies} />
        <ScrollView
          contentContainerStyle={styles.scrollView}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          {loading ? (
            <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />
          ) : (
            movies.length > 0 && <MovieList movies={movies} columns={1} />  
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1A3636',  
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: '#26355D', 
  },
  header: {
    fontSize: 28,  
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#ECCEAE',  
    textAlign: 'left', 
  },
  subHeader: {
    fontSize: 20,  
    marginBottom: 20,
    color: '#ECCEAE',  
    textAlign: 'left',  
  },
  scrollView: {
    paddingTop: 10,
  },
  loader: {
    marginTop: 20,
  },
});

export default App;
