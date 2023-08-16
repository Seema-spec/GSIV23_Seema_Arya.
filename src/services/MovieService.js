import axios from "axios";
import _function from "../common/function";
  const apiKey = '585738c6af11e0d39131c2dfdc2b4863';

     const fetchMovies = async () => {
        try {
          const response = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`);
          return response.data.results;
        } catch (error) {
          _function.logError('Error fetching movies:', error);
        }
      };
    
    const  fetchMovieDetails = async (movieId) => {
        try {
          const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`);
          return response.data;
        } catch (error) {
          _function.logError('Error fetching movie details:', error);
        }
      };

    const fetchSearchDetails = async (searchString) =>{
      try{
        const response = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${searchString}&include_adult=false&language=en-US&page=1&api_key=${apiKey}`)
        return response.data;
      } catch (error) {
        _function.logError('Error fetching movie details:', error);
      }
    }
    

export default {
    fetchMovies,
    fetchMovieDetails,
    fetchSearchDetails
}


