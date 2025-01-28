import React from 'react';
import { useNavigate } from 'react-router-dom';
import empty from '../Accets/empty.jpg';

const Cart = ({ cart, removeFromCart, addToCart, handleCheckout }) => {
    const navigate = useNavigate()
    const totalCost = cart.reduce((total, product) => total + product.price * product.quantity, 0);

    return (
        <div className="container mx-auto p-6 font-mono flex flex-col">
            {cart.length === 0 ? (
                <>
                    <div className='flex justify-center items-center h-screen'>
                        <img src={empty} alt='empty' className='h-64 w-64' />
                    </div>
                    <p className="text-center">Your cart is empty.</p>
                </>
            ) : (
                <ul className="space-y-4">
                    {cart.map((product, index) => (
                        <li
                            key={index}
                            className="flex flex-col sm:flex-row justify-between items-center p-4 border rounded-lg shadow-md"
                        >
                            <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                                <img
                                    src={product.imageUrl}
                                    alt={product.name}
                                    className="w-20 h-20 object-cover"
                                />
                                <div>
                                    <h3 className="text-lg font-bold">{product.name}</h3>
                                    <p>₹{product.price}</p>
                                    <p>Quantity: {product.quantity}</p>
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
                            <button
                        onClick={() => addToCart(product)}
                        className="px-4 py-2 hover:bg-red-700 hover:text-white rounded font-medium border-2"
                        >
                            Add
                        </button>


                                <button
                                    onClick={() => removeFromCart(product)}
                                    className="px-4 py-2 bg-red-700 text-white rounded font-medium border-2"
                                >
                                    Remove
                                </button>

                                <p className="font-medium">Subtotal: ₹{product.price * product.quantity}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            {cart.length > 0 && (
                <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold">Total Cost: ₹{totalCost}</h3>
                    <button
                        onClick={() => handleCheckout(navigate)}
                        className="mt-4 px-6 py-2 bg-red-700 text-white rounded hover:bg-red-800"
                    >
                        Checkout
                    </button>
                </div>
            )}
            
        </div>
    );
};

export default Cart;
