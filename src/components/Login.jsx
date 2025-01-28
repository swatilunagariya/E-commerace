import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = ({ setIsLoggedIn }) => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === loginData.email && user.password === loginData.password);

    if (user) {
      toast.success('Login successful! You will be redirected shortly.', {
        onClose: () => {
          setIsLoggedIn(true); 
          navigate('/'); 
        }
      });

      setLoginData({ email: '', password: '' });
    } else {
      toast.error('Invalid email or password.');
    }
  };

  return (
    <div className="container mx-auto font-mono">
      <h1 className="text-2xl font-bold my-6 text-center">Login</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 border rounded-lg shadow-lg">
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={loginData.email}
            onChange={handleChange}
            className="mt-1 px-4 py-2 border rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
            className="mt-1 px-4 py-2 border rounded w-full"
            required
          />
        </div>
        <button type="submit" className="px-4 py-2 bg-red-700 text-white rounded hover:bg-red-900">
          Login
        </button>

        <p className="mt-4">
        Don't have an account?  
        <a href="/signup" className="text-blue-500 underline">
          Sign up
        </a>
      </p>
      <p className="mt-4">
        Forget Password? 
        <a href="/password" className="text-blue-500 underline">
          Forget Password
        </a>
      </p>
      </form> 
      

    </div>
  );
};

export default Login;
