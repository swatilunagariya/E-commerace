import React, { useState } from 'react';
import { Link, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Kiva from './Accets/kiva.png';
import Logout from './Accets/logout.jpg.png';
import Address from './components/Adress';
import Cart from './components/Cart';
import Contect from './components/Contect';
import Footer from './components/Footer';
import Home from './components/Home';
import Login from './components/Login';
import Payment from './components/Payment';
import ProductList from './components/ProductList';
import Signup from './components/Signup';
import ForgetPassword from './components/ForgetPassword';
import ProductDetails from './components/ProductDetails';

const App = () => {
  const [cart, setCart] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(50);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct.quantity > 1) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
        );
      } else {
        return prevCart.filter((item) => item.id !== product.id);
      }
    });
  };

  const handleCheckout = (navigate) => {
    if (!isLoggedIn) {
      toast.error('You must log in first to proceed to checkout.');
      navigate('/login');
    } else if (cart.length === 0) {
      toast.error('Your cart is empty. Add items to proceed to checkout.');
    } else {
      navigate('/address');
      setCart([]); 
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Router>
      <ToastContainer />
      <div className="container-fluid flex flex-col min-h-screen">
        <nav className="p-4 bg-white flex justify-between items-center border-b shadow relative">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <img src={Kiva} alt="Logo" className="w-10" />
            </Link>
            <div className="hidden md:flex space-x-4">
              <Link to="/" className="hover:text-red-700 text-xl font-semibold p-2">
                Home
              </Link>
              <Link to="/products" className="hover:text-red-700 text-xl font-semibold p-2">
                Products
              </Link>
              <Link
                to={`/productdetailpage?page=${page}&limit=${limit}`}
                className="hover:text-red-700 text-xl font-semibold p-2"
              >
                ProductDetails
              </Link>
              <Link to="/cart" className="hover:text-red-700 text-xl font-semibold p-2">
                Cart ({totalQuantity})
              </Link>
              <Link to="/contect" className="hover:text-red-700 text-xl font-semibold p-2">
                Contact
              </Link>
            </div>
          </div>
          <button
  onClick={() => setIsMenuOpen(!isMenuOpen)}
  className="sm:hidden text-2xl"
>
  ☰
</button>

{isMenuOpen && (
  <div className="absolute top-16 left-0 w-full bg-white shadow-md md:hidden z-50 ">
    <Link
      to="/"
      className="block text-xl font-semibold p-2 m-10"
      onClick={() => setIsMenuOpen(false)}
    >
      Home
    </Link>
    <Link
      to="/"
      className="block text-xl font-semibold p-2 "
      onClick={() => setIsMenuOpen(false)}
    >
      Home
    </Link>
    <Link
      to="/products "
      className="block text-xl font-semibold p-2"
      onClick={() => setIsMenuOpen(false)}
    >
      Products
    </Link>
    <Link
      to={`/productdetailpage?page=${page}&limit=${limit}`}
      className="block text-xl font-semibold p-2"
      onClick={() => setIsMenuOpen(false)}
    >
      ProductDetails
    </Link>
    <Link
      to="/cart"
      className="block text-xl font-semibold p-2"
      onClick={() => setIsMenuOpen(false)}
    >
      Cart ({totalQuantity})
    </Link>
    <Link
      to="/contact"
      className="block text-xl font-semibold p-2"
      onClick={() => setIsMenuOpen(false)}
    >
      Contact
    </Link>
  </div>
)}


          <div className="flex space-x-4">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="hover:bg-gray-200 text-xl font-semibold text-white bg-gray-100 rounded p-2"
              >
                <img src={Logout} className="h-8 w-8" alt="Logout" />
              </button>
            ) : (
              <>
                <Link to="/login" className="hover:bg-red-900 text-xl font-semibold text-white bg-red-700 rounded p-2">
                  Login
                </Link>
                <Link to="/signup" className="hover:text-red-700 text-xl font-semibold p-2">
                  Signup
                </Link>
              </>
            )}
          </div>
        </nav>

        <div className="flex-grow p-4">
          <Routes>
            <Route path="/" element={<Home addToCart={addToCart} cart={cart} removeFromCart={removeFromCart} />} />
            <Route
              path="/products"
              element={
                <ProductList
                  addToCart={addToCart}
                  cart={cart}
                  page={page}
                  limit={limit}
                  removeFromCart={removeFromCart}
                />
              }
            />
            <Route
              path="/cart"
              element={
                <Cart
                  cart={cart}
                  removeFromCart={removeFromCart}
                  addToCart={addToCart}
                  handleCheckout={(navigate) => handleCheckout(navigate)}
                />
              }
            />
            <Route path="/productdetailpage" element={<ProductDetails page={page} limit={limit} />} />
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/contect" element={<Contect />} />
            <Route path="/address" element={<Address />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/password" element={<ForgetPassword />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
