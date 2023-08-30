import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from './CartSlice'; 
import './ProductDetails.css'


const Cart = () => {
  const cartItems = useSelector((state) => state.cart);// Assuming your cart slice is named 'cart'
  const dispatch = useDispatch();

  const handleRemoveItem = (itemToRemove) => {
    dispatch(removeFromCart(itemToRemove));
  };

  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  console.log(cartItems);
  return (
    <div>
      <h2 className="title">Cart</h2>
      <div className="container">
        {cartItems?.map((item) => (
          <div key={item.id} className="detail_card">
             <div className='detail_inner_card'>
              <img className='img' src={item.image} alt='' />
            </div>
            <div className='details_text_card'>
              <h3>{item.category}</h3>
              <div>
                {item.title} ({item.rating?.rate})
              </div>
              <div className='description'>Description: {item.description}</div>
              <h5>Price: {item.price}</h5>
              <button
                className='button3'
                onClick={() => handleRemoveItem(item)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
        <div className="bottom_title">
          <h2>Total: ${total}</h2>
        </div>
      </div>
    </div>
  );
};

export default Cart;
