import React from 'react';
import "./Banner.css";



function Banner() {
    function truncate(str, n) {
        if (str.length <= n)
            return str;
        return str.slice(0, n-1)+'...'
    }

  return (
    <header className='banner' style={{
        backgroundSize: "cover",
        backgroundImage: `url(https://upload.wikimedia.org/wikipedia/commons/c/cd/Black_flag.svg)`,
        backgroundPosition: "center",
    }} >
        <div className='banner-contents'>
            <h1 className='banner-title'>
                Movie Name
            </h1>
            <button className='banner-button'>Play</button>
            <button className='banner-button'>Msy List</button>
        <h1 className='banner-decription'> {truncate(`This is a test description.`, 100)}</h1>
        </div>
        <div className='banner-fadeBottom'/>

    </header>
  )
}

export default Banner;