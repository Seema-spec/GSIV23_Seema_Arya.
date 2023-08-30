import axios from "axios";
import _function from "../common/function";

     const fetchMovies = async () => {
        try {
          const response = await axios.get(`https://fakestoreapi.com/products`);
          return response.data;
        } catch (error) {
          _function.logError('Error fetching movies:', error);
        }
      };
    
    const  fetchProductById = async (productId) => {
        try {
          const response = await axios.get(`https://fakestoreapi.com/products/${productId}`);
          return response.data;
        } catch (error) {
          _function.logError('Error fetching movie details:', error);
        }
      };


export default {
    fetchMovies,
    fetchProductById
}


