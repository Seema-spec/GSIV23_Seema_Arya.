import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MovieService from '../services/MovieService';
import _function from '../common/function';
import search from '../assets/search.png';
import Home from '../assets/home.png';
import Pagination from './Pagination';
import './MovieList.css'

const moviesPerPage = 10;

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [searchString, setSearchString] = useState('');
  const [searchData, setSearchData] = useState(null); 
  const [currentPage, setCurrentPage] = useState(1);

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

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const displayedMovies = searchData
    ? searchData.results
    : movies.slice((currentPage - 1) * moviesPerPage, currentPage * moviesPerPage);


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

     
      {displayedMovies.map((movie) => (
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
          </div>
        ))}
      </div>
      <div className="pagination">
        {searchData ? null : (
          <Pagination
            currentPage={currentPage}
            moviesPerPage={moviesPerPage}
            totalMovies={movies.length}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};

export default MovieList;
