import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupData({
      ...signupData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const { name, email, password, confirmPassword } = signupData;

    if (name.trim().length < 3) {
      toast.error('Name should be at least 3 characters long.');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address.');
      return false;
    }

    if (password.length < 6) {
      toast.error('Password should be at least 6 characters long.');
      return false;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.find((user) => user.email === signupData.email);

    if (userExists) {
      toast.error('User with this email already exists.');
    } else {
      users.push({ name: signupData.name, email: signupData.email, password: signupData.password });
      localStorage.setItem('users', JSON.stringify(users));
      toast.success('Signup successful! Redirecting to login...');

      setSignupData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      });

      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }
  };

  return (
    <div className="container mx-auto font-mono flex flex-col px-4">
      <h1 className="text-2xl font-bold my-6 text-center">Signup</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 border rounded-lg shadow-lg bg-gray-50">
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={signupData.name}
            onChange={handleChange}
            className="mt-1 px-4 py-2 border rounded w-full"
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={signupData.email}
            onChange={handleChange}
            className="mt-1 px-4 py-2 border rounded w-full"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={signupData.password}
            onChange={handleChange}
            className="mt-1 px-4 py-2 border rounded w-full"
            placeholder="Enter a strong password"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={signupData.confirmPassword}
            onChange={handleChange}
            className="mt-1 px-4 py-2 border rounded w-full"
            placeholder="Re-enter your password"
            required
          />
        </div>
        <button type="submit" className="px-4 py-2 bg-red-700 text-white rounded hover:bg-red-900 w-full">
          Signup
        </button>
        <p className="mt-4 text-center">
          Already have an account?{' '}
          <a href="/login" className="text-blue-500 underline">
            Login
          </a>
        </p>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Signup;
