import React, { useState } from 'react';
import tmdb from './api/tmdb';
import SearchBar from './components/SearchBar/SearchBar';
import MovieList from './components/MovieList/MovieList';
import HomeScreen from './components/HomeScreen/HomeScreen';
import "./App.css";

const App = () => {
  const [movies, setMovies] = useState([]);

  const searchMovies = async (query) => {
    try {
      const response = await tmdb.get('/search/movie', {
        params: {
          query: query,
        },
      });
      setMovies(response.data.results);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  return (
    <div className="app">
      <HomeScreen/> 
      {/* <SearchBar onSearch={searchMovies} /> */}
      {/* <MovieList movies={movies} /> */}
    </div>
  );
};

export default App;
