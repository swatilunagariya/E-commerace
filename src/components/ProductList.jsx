import React, { useState } from 'react';
import productImage1 from '../Accets/c1.jpg';
import productImage2 from '../Accets/c2.jpg';
import productImage3 from '../Accets/c3.jpg';
import productImage4 from '../Accets/c4.jpg';
import productImage5 from '../Accets/c5.jpg';
import productImage6 from '../Accets/c6.jpg';
import productImage7 from '../Accets/c7.jpg';
import productImage8 from '../Accets/c8.jpg';
import productImage9 from '../Accets/c9.jpg';
import productImage10 from '../Accets/c10.jpg';
import productImage11 from '../Accets/c11.jpg';
import productImage12 from '../Accets/c12.jpg';
import productImage14 from '../Accets/c14.jpg';
import productImage15 from '../Accets/c15.jpg';
import productImage16 from '../Accets/c16.jpg';
import productImage17 from '../Accets/c17.jpg';
import productImage18 from '../Accets/c18.jpg';
import productImage19 from '../Accets/c19.jpg';
import productImage20 from '../Accets/c20.jpg';
import productImage21 from '../Accets/c21.jpg';
import productImage22 from '../Accets/c22.jpg';
import productImage23 from '../Accets/c23.jpg';
import productImage24 from '../Accets/c24.jpg';
import productImage25 from '../Accets/c25.jpg';
import './ProductList.css';

import product2 from '../Accets/c222.jpg';
import product3 from '../Accets/c33.jpg';

const products = [
    { id: 1, name: 'Sandals', price: 800, imageUrl: productImage1, ib: product2 },
    { id: 2, name: 'Sandals', price: 1600, imageUrl: productImage2, ib: product3 },
    { id: 3, name: 'Casual Sandals', price: 2400, imageUrl: productImage3 },
    { id: 4, name: 'Leather Shoes', price: 3200, imageUrl: productImage4 },
    { id: 5, name: 'Outdoor Shoes', price: 4400, imageUrl: productImage5 },
    { id: 6, name: 'Shoes', price: 1400, imageUrl: productImage6 },
    { id: 7, name: 'Sports Shoes', price: 2500, imageUrl: productImage7 },
    { id: 8, name: 'Leather Shoes', price: 7700, imageUrl: productImage8 },
    { id: 9, name: 'Sandals', price: 4599, imageUrl: productImage9 },
    { id: 10, name: 'Leather Shoes', price: 1599, imageUrl: productImage10 },
    { id: 11, name: 'Leather Shoes', price: 1400, imageUrl: productImage11 },
    { id: 12, name: 'Sandals', price: 2999, imageUrl: productImage12 },
    { id: 14, name: 'Sandals', price: 4599, imageUrl: productImage14 },
    { id: 15, name: 'Sports Shoes', price: 1299, imageUrl: productImage15 },
    { id: 16, name: 'Shoes', price: 1999, imageUrl: productImage16 },
    { id: 17, name: 'Shoes', price: 9999, imageUrl: productImage17 },
    { id: 18, name: 'Outdoor Shoes', price: 999, imageUrl: productImage18 },
    { id: 19, name: 'Shoes', price: 3999, imageUrl: productImage19 },
    { id: 20, name: 'Outdoor Shoes', price: 6999, imageUrl: productImage20 },
    { id: 21, name: 'Shoes', price: 4999, imageUrl: productImage21 },
    { id: 22, name: 'Sandals', price: 7999, imageUrl: productImage22 },
    { id: 23, name: 'Shoes', price: 5999, imageUrl: productImage23 },
    { id: 24, name: 'Shoes', price: 1999, imageUrl: productImage24 },
    { id: 25, name: 'Outdoor Shoes', price: 1399, imageUrl: productImage25 },
];

const ProductList = ({ addToCart, cart,removeFromCart}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [modalProduct, setModalProduct] = useState(null);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
    <div className="container mx-auto flex flex-col px-4 font-mono">
      <h2 className="text-2xl font-bold my-6 text-center">Products</h2>

      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search for products..."
        className="p-2 border rounded w-[200px] mx-auto pl-10"
      />
      <br />
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => {
          const productInCart = cart.find((item) => item.id === product.id);
          const quantity = productInCart ? productInCart.quantity : 0;

          return (
            <li key={product.id} className="flex flex-col items-center justify-between p-4 border rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-40 h-40 object-cover mb-4 product-image cursor-pointer"
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

export default ProductList;
