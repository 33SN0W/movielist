import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import axios from 'axios';

const MovieCard = ({ movie }) => {
  const [dogImage, setDogImage] = useState(null);

  useEffect(() => {
    const fetchDogImage = async () => {
      try {
        const response = await axios.get('https://dog.ceo/api/breeds/image/random');
        setDogImage(response.data.message);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDogImage();
  }, []);

  return (
    <View style={styles.card}>
      {dogImage ? (
        <Image source={{ uri: dogImage }} style={styles.image} />
      ) : (
        <View style={styles.imagePlaceholder} />
      )}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{movie.title}</Text>
        {movie.author_name && <Text style={styles.author}>By {movie.author_name[0]}</Text>}
        {movie.first_publish_year && <Text style={styles.year}>Released: {movie.first_publish_year}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#ECCEAE', 
    borderRadius: 12,
    marginBottom: 16,
    height: 120,
    padding: 10,
  },
  image: {
    width: 80, 
    height: '100%',
    borderRadius: 8,
    marginRight: 10,
  },
  imagePlaceholder: {
    width: 80,
    height: '100%',
    borderRadius: 8,
    marginRight: 10,
    backgroundColor: '#ccc', 
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#131842', 
  },
  author: {
    color: '#131842',
    marginTop: 4,
  },
  year: {
    color: '#131842', 
    marginTop: 4,
  },
});

export default MovieCard;
