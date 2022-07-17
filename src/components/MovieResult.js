import React, { useEffect, useState } from 'react'
import '../css/styles.css'

function MovieResult({selectedMovie}) {
    const [movie,setMovie] = useState([])
    let {Title,Year,imdbID,Poster} = selectedMovie
    

    useEffect(() => {
        fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=67cbec6e`)
        .then(res => res.json())
        .then(data => setMovie(data))
    },[selectedMovie])

    let {Actors,Genre,Plot,imdbRating} = movie

  return (
    <>
    <div>
        <p  className='searchResultText'>Enjoy Your Movie !!!</p>
    </div>
    <div className='movieInfoCard'>
        <div>
            <img src = {Poster} alt={Title} className='movieImage'/>
        </div>
        <div className='movieInfo'>
            <p className='movieTitle'>Title: {Title}</p>
            <div style={{display:'flex'}}>
              <p className='movieYear'><b>Released in:</b> {Year}</p>
              <p className='movieYear'><b>IMDb Rating:</b> {imdbRating}</p>
            </div>
            <div className='actor-genre'>
                <p className='actorClass'><b>Actors:</b> {Actors}</p>
                <p className='genreClass'><b>Genre:</b> {Genre}</p>
            </div>
            
            <p className='movieDesc'><b>Plot:</b> {Plot}</p>
        </div>
    </div>
    </>
  )
}

export default MovieResult