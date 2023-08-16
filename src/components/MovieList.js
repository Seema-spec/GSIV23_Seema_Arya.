import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MovieService from '../services/MovieService';
import _function from '../common/function';
import search from '../assets/search.png';
import Home from '../assets/home.png';
import './MovieList.css'

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [searchString, setSearchString] = useState('');
  const [searchData, setSearchData] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const detail = await MovieService.fetchMovies();
        setMovies(detail)
      } catch (error) {
        console.error('Error fetching movie details:', error)
      }
    };
    fetchMovie();
  }, []);

 
  useEffect(() => {
    const handleSearch = async () => {
      if (searchString.trim() === '') {
        setSearchData(null);
      } else {
        try {
          const response = await MovieService.fetchSearchDetails(searchString);
          setSearchData(response);
        } catch (error) {
          console.error('Error fetching search details:', error);
        }
      }
    };

    handleSearch();
  }, [searchString]);


  return (
    <div className="container">
      <header>
        <div className="header_nav">
          <div className='child_nav'>
            <input
              type='text'
              className='text'
              value={searchString}
              onChange={(e) => setSearchString(e.target.value)}
              placeholder='Search' />
            <img
              className='search'
              src={search} 
              alt=''
            />
            </div>
            <Link to="/">
              <img  className="icon" src={Home} alt="" />
            </Link>
        </div>
      </header>
      <div className='list_container' id='movie-card'>

      {(searchData && searchData.results.length > 0) ? (
          searchData?.results?.map((result) =>
            <div key={result.id} className='card_container'>
              <Link to={`/movie/${result.id}`} className='inner_card'>
                <img
                  className='img_icon'
                  src={`https://image.tmdb.org/t/p/w500/${result.poster_path}`}
                  alt={result.title}
                />
              </Link>
              <div className='inner_card_text'>
                <div className="card_text">{_function.truncateDescription(result.title, 2)}</div>
                <div className="card_text">{result.vote_average}</div>
              </div>
              <div className="card_text_desc">{_function.truncateDescription(result.overview, 6)}</div>
            </div>)

        ) : (

          movies?.map((movie) =>
            <div key={movie.id} className='card_container'>
              <Link to={`/movie/${movie.id}`} className='inner_card'>
                <img
                  className='img_icon'
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                />
              </Link>
              <div className='inner_card_text'>
                <div className="card_text">{_function.truncateDescription(movie.title, 2)}</div>
                <div className="card_text">{movie.vote_average}</div>
              </div>
              <div className="card_text_desc">{_function.truncateDescription(movie.overview, 6)}</div>
            </div>)
        )}
      </div>
    </div>
  );
};

export default MovieList;
