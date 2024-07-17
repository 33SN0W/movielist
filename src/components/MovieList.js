import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import MovieCard from './MovieCard';

const MovieList = ({ movies, columns }) => {
  const renderItem = ({ item }) => <MovieCard movie={item} />;

   const keyExtractor = (item, index) => `${item.id}-${columns}-${index}`;

  return (
    <View style={styles.container}>
      <FlatList
        data={movies}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.list}
        numColumns={columns}
        key={columns} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    paddingHorizontal: 16,
    paddingTop: 10,
  },
});

export default MovieList;
