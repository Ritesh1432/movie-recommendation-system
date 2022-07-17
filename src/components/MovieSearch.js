import React, { useEffect } from 'react'
import { useState } from 'react'
import '../css/styles.css'
import MovieResult from './MovieResult'


function MovieSearch() {
    const [searchQuery,setSearchQuery] = useState('')
    const [data,setData] = useState([])
    const [searchedMovie,setSearchedMovie] = useState([])
    const [selectedMovie,setSelectedMovie] = useState('')
    let res =[]
    
    const getMovies = ((searchQuery) => {
        fetch( `http://www.omdbapi.com/?s=${searchQuery}&apikey=67cbec6e`)
        .then(res => res.json())
        .then(response => setData(response.Search))
    })
 
    
    useEffect(() => {
        getMovies(searchQuery);

    },[searchQuery])

    useEffect(() => {
        searchQuery.toString()
        // searchQuery.toLowerCase()
        {
           res =  data && data.filter((movie) => (
                movie.Title.startsWith(searchQuery)
           ))
           setSearchedMovie(res)
        }
    },[searchQuery])

   
  return (

    <div className='main'>
    <div>
        <p className='headerText'>Can't decide what to watch? Enter text below</p>
    </div>
     <div className='searchBox'>
        <div>
            <p className='searchLabel'>Search Movie</p>
            <input type='text' className='inputMovieClass' onChange={(e) => setSearchQuery(e.target.value)} />

            {
                searchedMovie && searchedMovie.map((movie,index) => (
                    <div className = 'suggestion' key={index} onClick={() => setSelectedMovie(movie)}>{movie.Title}</div>
                ))
            }
            
            <div className='suggestionBox'>
                <p className='suggestionText'>Suggestions:</p>
                <p className='suggestionCount'>{searchedMovie ? searchedMovie.length : 0}</p>
            </div>
        </div>

     </div>
     <div>
        {
            selectedMovie ? <MovieResult selectedMovie = {selectedMovie} /> : <></>
        }
     </div>
    </div>
  )
}

export default MovieSearch