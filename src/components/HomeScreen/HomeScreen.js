import React from 'react';
import './HomeScreen.css'
import Nav from '../Nav/Nav';
import Banner from '../Banner/Banner';
import requests from '../../Request';
import Row from '../Row/Row';

function HomeScreen() {
  return (
    <div className='HomeScreen'>
        <Nav/>
        <Banner/>
        <Row
         title = "HONEY ORIGINAL"
         fetchUrl={requests.fetchNetflixOriginals}
         isLargeRow
         />

        <Row
         title = "Fetching Now" fetchUrl={requests.fetchTrending}/>
          
        <Row
         title = "Top Rated"
         fetchUrl={requests.fetchTopRated}/>
        <Row
         title = "Action Movies"
         fetchUrl={requests.fetchActionMovies}/>
        <Row
         title = "Comedy Movies"
         fetchUrl={requests.fetchComedyMovies}/>
        <Row
         title = "Horror Movies"
         fetchUrl={requests.fetchHorrorMovies}/>
        <Row
         title = "Romance Movies"
         fetchUrl={requests.fetchRomanceMovies}/>
        <Row
         title = "Documentaries"
         fetchUrl={requests.fetchDocumentaries}/>
    </div>
  )
}

export default HomeScreen;