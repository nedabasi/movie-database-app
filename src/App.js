import React, { useEffect, useState } from 'react';
import tmdb from './api/tmdb';
import SearchBar from './components/SearchBar/SearchBar';
import MovieList from './components/MovieList/MovieList';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import { auth } from './firebase';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './redux/userSlice';
import ProfileScreen from './screens/ProfileScreen/ProfileScreen';

const App = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const [movies, setMovies] = useState([]);
  const searchMovies = async (query) => {
    try {
      const response = await tmdb.get('/search/movie', {
        params: {
          query: query
        }
      });
      setMovies(response.data.results);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        dispatch(login({ uid: userAuth.uid, email: userAuth.email }));
      } else {
        dispatch(logout());
      }
    });
    return unsubscribe;
  }, [dispatch]);

  return (
    <div className="app">
      {!user ? (
        <LoginScreen />
      ) : (
        <Router>
          <Routes>
            <Route path="/profile" element={<ProfileScreen />} />
          </Routes>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
          </Routes>
        </Router>
      )}
    </div>
  );
};

export default App;
