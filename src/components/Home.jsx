import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import s1 from '../Accets/s1.jpg';
import s2 from '../Accets/s2.jpg';
import s4 from '../Accets/s4.jpg';
import s5 from '../Accets/s5.jpg';
import c1 from '../Accets/c3.jpg';
import c2 from '../Accets/c4.jpg';
import c4 from '../Accets/c15.jpg';
import c5 from '../Accets/c18.jpg';

const footwearItems = [
  { id: 1, name: 'Running Shoes', imageUrl: s1 },
  { id: 2, name: 'Running Shoes', imageUrl: s2 },
  { id: 44, name: 'Flip Flops', imageUrl: s4 },
  { id: 5, name: 'Flip Flops', imageUrl: s5 },
];

const recommendedProducts = [
  { id: 3, name: 'Casual Sandals', imageUrl: c1, price: 2400 },
  { id: 4, name: 'Leather Shoes', imageUrl: c2, price: 3200 },
  { id: 15, name: 'Sports Sandals', imageUrl: c4, price: 1299 },
  { id: 18, name: 'Outdoor Shoes', imageUrl: c5, price: 999 },
];

const Home = ({ addToCart, cart,removeFromCart}) => {
const [modalProduct, setModalProduct] = useState(null); 

 
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
        },
      },
    ],
  };

  const openModal = (product) => {
    setModalProduct(product); 
  };

  const closeModal = () => {
    setModalProduct(null); 
  };

    const handleAddToCart = (product) => {
    addToCart(product); 
};

const handleRemoveFromCart = (product) => {
  removeFromCart(product);
};

  return (
    <div className="flex flex-col mx-auto font-mono px-4">
      <Slider {...settings}>
        {footwearItems.map((item) => (
          <div key={item.id} className="p-4">
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-64 h-64 object-cover rounded cursor-pointer"
          
            />
          </div>
        ))}
      </Slider>

      <div className="my-8">
        <h2 className="text-2xl font-bold mb-4">Recommended Products</h2>
        <div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ml-16">
            {recommendedProducts.map((product) => {
              const productInCart = cart.find((item) => item.id === product.id);
              const quantity = productInCart ? productInCart.quantity : 0;
              return (
                <li
                  key={product.id}
                  className="flex flex-col items-center justify-between p-4 border rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-44 h-44 object-cover mb-4 product-image cursor-pointer"
                    onClick={() => openModal(product)} 
                  />
                  <div className="text-center">
                    <h3 className="text-lg font-bold">{product.name}</h3>
                    <p>₹{product.price}</p>
                  </div>
                  <button
                    onClick={() => addToCart(product)}
                    className="mt-4 px-4 py-2 hover:bg-red-700 hover:text-white rounded border font-medium font-mono bg-gray-100"
                  >
                    Add to Cart {quantity > 0 ? `(${quantity})` : 0}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {modalProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-white p-4 rounded shadow-lg">
            <button
              onClick={closeModal}
              className="static top-2 right-0 hover:bg-red-700 hover:text-white px-2 py-1 rounded text-2xl"
            >
              &times;
            </button>
        
            <img src={modalProduct.imageUrl} alt={modalProduct.name} className="w-96 h-96 object-cover" />
            <p className="text-lg font-bold">{modalProduct.name}</p>
            <p className='font-semibold'>Price ₹{modalProduct.price}</p>
            <p className='font-semibold'>In Cart: {cart.find(item => item.id === modalProduct.id)?.quantity || 0}</p>
            <div className="flex justify-center gap-2 mt-4">
              <button
                onClick={() => handleAddToCart(modalProduct)}
                className="px-4 py-2 hover:bg-red-700 hover:text-white rounded border font-medium font-mono bg-gray-100"
              >
                Add ({cart.find(item => item.id === modalProduct.id)?.quantity || 0})
              </button>
              {cart.find(item => item.id === modalProduct.id)?.quantity > 0 && (
                <button
                  onClick={() => handleRemoveFromCart(modalProduct)}
                  className="px-4 py-2 bg-red-700 text-white rounded border font-medium font-mono bg-gray-100"
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
