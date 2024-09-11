import React, { useEffect, useState } from 'react';
import './Row.css';
import axios from '../../axios';

function Row({ title, fetchUrl, isLargeRow = false }) {
  const [movies, setMovies] = useState([]);
  const base_url = 'https://image.tmdb.org/t/p/original/';

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row_posters">
        {movies.map(
          (movie) =>
            //prevent dead Link by following two conditions
            ((isLargeRow && movie.poster_path) ||
              (!isLargeRow && movie.backdrop_path)) && (
              <div
                className={`row_posterP ${isLargeRow && 'row_posterLarge'}`}
                style={{
                  backgroundImage: `url(${base_url}${
                    isLargeRow ? movie.poster_path : movie.backdrop_path
                  })`,
                  backgroundSize: '100% 100%',
                  backgroundPosition: 'center',
                  height: isLargeRow ? '400px' : '150px',
                  borderRadius: '10px'
                }}
              >
                {isLargeRow && (
                  <div className="movie_buttons">
                    <button className="watchlist_button">+</button>
                    <button className="more_info_button">More info</button>
                  </div>
                )}
              </div>
            )
        )}
      </div>
    </div>
  );
}

export default Row;
