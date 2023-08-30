import React,{useEffect,useState} from 'react';
import { useParams } from 'react-router-dom';
import ProductService from '../services/ProductService';

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productDetail = await ProductService.fetchProductById(productId);
        setProduct(productDetail);
      } catch (error) {
        console.log('Error fetching product details:', error);
      }
    };
    fetchProduct();
  }, [productId]);


  console.log(product);

  return (
    <div>
      <h2 className='title'>Product Details</h2>
      <div className='container'>
          <div className='detail_card'>
            <div className='detail_inner_card'>
              <img
                className='img'
                src={product?.image}
                alt=''
              />
            </div>
            <div className='details_text_card'>
              <h3>{product?.category}</h3>
              <div>{product?.title}({product?.rating?.rate})</div>
              <div className='description'>Description: {product?.description}</div>
              <h5>Price: {product?.price}</h5>
            </div>
          </div>
        <div className='bottom_title'>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
