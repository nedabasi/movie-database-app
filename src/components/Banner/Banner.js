import React, { useEffect, useState } from 'react';
import "./Banner.css";
import axios from "../../axios";
import requests from '../../Request';

function Banner() {
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const request = await axios.get(requests.fetchNetflixOriginals);
                const movies = request.data.results;
                setMovie(
                    movies[Math.floor(Math.random() * movies.length-1)]
                );
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        }

        fetchData();
    }, []);

    console.log(movie);

    function truncate(str, n) {
        return str?.length > n ? str.slice(0, n - 1) + '...' : str;
    }

    return (
        <header className='banner' style={{
            backgroundSize: "cover",
            backgroundImage: movie ? `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")` : `url("https://upload.wikimedia.org/wikipedia/commons/c/cd/Black_flag.svg")`,
            backgroundPosition: "center",
        }}>
            <div className='banner-contents'>
                <h1 className='banner-title'>
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>
                <button className='banner-button'>Play</button>
                <button className='banner-button'>My List</button>
                <h1 className='banner-decription'>{truncate(movie?.overview, 150)}</h1>
            </div>
            <div className='banner-fadeBottom' />
        </header>
    );
}

export default Banner;
