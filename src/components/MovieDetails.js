import React,{useEffect,useState} from 'react';
import { Link, useParams } from 'react-router-dom';
import MovieService from '../services/MovieService';
import Home from '../assets/home.png'
import './MovieDetails.css'

const MovieDetails = () => {
    const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);

  
  useEffect(() => {
    const fetchMovieDetails = async() =>{
        try{
        const details = await MovieService.fetchMovieDetails(movieId);
        setMovieDetails(details)
        }catch(error){
            console.error('Error fetching movie details:', error)
        }
    };
    fetchMovieDetails();
  }, [movieId]);

  const releaseYear = movieDetails?.release_date ? movieDetails?.release_date.substring(0, 4) : 'N/A';


    return (
        <div className='container'>
            <header>
                <div className="header_nav">
                    <div type="text" className='title'>Movie Details</div>
                    <Link to='/'>
                    <div className='icon'>
                    <img
                      src={Home} 
                      alt=''
                      className='home_icon'
                    />
                    </div>
                    </Link>
                    
                </div>
            </header>
            <div>
            <div className='detail_card'>
            <div className='detail_inner_card'>
              <img
                className='img'
                src={`https://image.tmdb.org/t/p/w500/${movieDetails?.poster_path}`}
               alt={movieDetails?.title}
              />
            </div>
            <div className='details_text_card'>
                <div>{movieDetails?.title}({movieDetails?.vote_average})</div>
                <div>{releaseYear} | {movieDetails?.runtime} min | Director</div>
                <div>Cast: Actor1, Actor2</div> {/* No data from the api using static data*/}
                <div className='description'>Description: {movieDetails?.overview}</div>
            </div>
          </div>
            </div>
        </div>
    );
};

export default MovieDetails;
