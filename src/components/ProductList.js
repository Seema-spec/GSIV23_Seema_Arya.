import React, { useState, useEffect } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import ProductService from '../services/ProductService';
import _function from '../common/function';
import { useDispatch,useSelector } from 'react-redux';
import {addToCart,removeFromCart} from './CartSlice'
import './ProductList.css'


const ProductList = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  useEffect(() => {
    const fetchproduct = async () => {
      try {
        const detail = await ProductService.fetchMovies();
        setProducts(detail);
      } catch (error) {
        console.log('Error fetching product details:', error)
      }
    };
    fetchproduct();
  }, []);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product)); 
  };

  const navigate = useNavigate();

  const handleCartClick = () => {
    navigate('/cart'); 
  };

  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };

  return (
    <div className="container">
      <header>
        <div className="header_nav">
        <h2 >Product List</h2>
            <button className='button2' onClick={handleCartClick}>
            Cart : {cartItems.length}
            </button>
        </div>
      </header>
      <div className='list_container'>
      {products?.map((product) => (
        <div className='card_container'>
          <div className='inner_card_container'>
          <div key={product.id} className='inner_container' >
            <Link to={`/product/${product.id}`} className='inner_card'>
              <img
                className='img_icon'
                src={product?.image}
                alt=''
              />
            </Link>
            <div className='inner_card_text'>
              <div className="card_text">{product.category}</div>
              <div className="card_text">{product.rating.rate}</div>
            </div>
              <div className="card_text">{_function.truncateDescription(product.title,3)}</div>
              <div className="card_text_desc">{_function.truncateDescription(product.description, 6)}</div>
          </div>
          <div className='button_card'>
          {cartItems.some((item) => item.id === product.id) ? (
                  <button
                    className="button3"
                    onClick={() => handleRemoveFromCart(product)}
                  >
                    Remove
                  </button>
                ) : (
                  <button
                    className="button"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                )}
          <button className='button2'>Price : {product?.price}</button>
          </div>
          </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
