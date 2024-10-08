import React, { useState } from 'react';
import {
  ChakraProvider,
  Box,
  Button,
  Input,
  VStack,
  Text,
  HStack,
  SimpleGrid,
  Heading,
} from '@chakra-ui/react';

const MovieCard = ({ movie }) => (
  <Box  borderWidth={2} borderRadius="md" p={2}>
    <Heading size="md">{movie.title}</Heading>
    <Text>{movie.description}</Text>
    <Text mt={2}>Rating: {movie.rating}</Text>
    <img src={movie.posterURL} alt={movie.title} width="100%" borderRadius="20"  />
  </Box>
);

const MovieList = ({ movies }) => (
  <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={4}>
    {movies.map((movie, index) => (
      <MovieCard key={index} movie={movie} />
    ))}
  </SimpleGrid>
);

const Filter = ({ setTitle, setRating }) => (
  <HStack spacing={4}>
    <Input placeholder="Filter by title" onChange={(e) => setTitle(e.target.value)} />
    <Input placeholder="Filter by rating" onChange={(e) => setRating(e.target.value)} />
  </HStack>
);

const App = () => {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState('');
  const [rating, setRating] = useState('');
  const [newMovie, setNewMovie] = useState({ title: '', description: '', posterURL: '', rating: '' });

  const addMovie = () => {
    setMovies([...movies, newMovie]);
    setNewMovie({ title: '', description: '', posterURL: '', rating: '' });
  };

  const filteredMovies = movies.filter(movie => {
    return (
      movie.title.toLowerCase().includes(title.toLowerCase()) &&
      (rating ? movie.rating === rating : true)
    );
  });

  return (
    <ChakraProvider>
      <Box p={5}>
      <Heading mb={5} textAlign="center">Ajouter un film </Heading>
        <VStack spacing={4}>
          <Input placeholder="Title" value={newMovie.title} onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })} />
          <Input placeholder="Description" value={newMovie.description} onChange={(e) => setNewMovie({ ...newMovie, description: e.target.value })} />
          <Input placeholder="Poster URL" value={newMovie.posterURL} onChange={(e) => setNewMovie({ ...newMovie, posterURL: e.target.value })} />
          <Input placeholder="Rating" value={newMovie.rating} onChange={(e) => setNewMovie({ ...newMovie, rating: e.target.value })} />
          <Button onClick={addMovie}>Add Movie</Button>
          <Filter setTitle={setTitle} setRating={setRating} />
          <MovieList movies={filteredMovies} />
        </VStack>
      </Box>
    </ChakraProvider>
  );
};

export default App;
