import React, { useEffect, useState } from 'react';
import './ProductDetails.scss';
import { client, urlFor } from '../../client';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  
  const [product, setProduct] = useState({});
  const [count, setCount] = useState(1);
  const currentProductId = useSelector((state) => state.cart.currentProduct);

  
  useEffect(() => {
    const fetchData = async () => {
      const query = `*[ _type == "product" && _id == "${currentProductId}" ]`;
      const result = await client.fetch(query);
      console.log(currentProductId);
      if (result) {
        setProduct(result[0]);
      }
    };
    fetchData();
  }, [currentProductId]);

  const handleImage = (pro) => {
    if (pro.image) {
      return urlFor(pro.image[0]).url();
    } else {
      return '';
    }
  };

  const handleCount = (operation) => {
    if (operation === 'increment') {
      setCount(count + 1);
    } else if (operation === 'decrement' && count > 1) {
      setCount(count - 1);
    }
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    // Handle review submission here
  };

  return (
    <div className='app__product'>
      <div className='app__product-main'>
        <div className='app__product-images'>
          <img src={handleImage(product)} alt={product.name} />
        </div>
        <div className='app__product-details'>
          <h1>{product.name}</h1>
          <p>${product.price}</p>
          <div className='app__product-count' style={{display:'flex', gap:'10px', alignItems:'center'}}>
            <button className='btn-primary' onClick={() => handleCount('decrement')}>-</button>
            <h2 style={{color:'blue'}}>{count}</h2>
            <button className='btn-primary' onClick={() => handleCount('increment')}>+</button>
          </div>
          <button className='btn-primary' style={{marginTop:20, width:'30%'}}>Add to Cart</button>
        </div>

      </div>
      <hr style={{ margin: '2rem 0' }} />
      <div className='app__product-description'>
        <h2>Description</h2>
        <p>{product.description}</p>
      </div>
      <div className='app__product-reviews'>
        <h2>Reviews</h2>
        <div className='app__product-review-stars'>
          {/* Show stars here and allow user to give stars */}
        </div>
        <form onSubmit={handleReviewSubmit}>
          <textarea placeholder='Write your feedback'></textarea>
          <button type='submit' className='btn-primary'>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ProductDetails;
