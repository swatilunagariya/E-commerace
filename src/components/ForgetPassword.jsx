import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    } else if (name === 'confirmPassword') {
      setConfirmPassword(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === email);

    if (user) {
      user.password = password;
      localStorage.setItem('users', JSON.stringify(users));
      toast.success('Password reset successfully.', {
        onClose: () => navigate('/login')
      });
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } else {
      toast.error('This email is not registered.');
    }
  };

  return (
    <div className="container mx-auto font-mono">
      <h1 className="text-2xl font-bold my-6 text-center">Forgot Password</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 border rounded-lg shadow-lg">
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={email}
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
            value={password}
            onChange={handleChange}
            className="mt-1 px-4 py-2 border rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
            className="mt-1 px-4 py-2 border rounded w-full"
            required
          />
        </div>
        <button type="submit" className="px-4 py-2 bg-red-700 text-white rounded hover:bg-red-900">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ForgetPassword;
