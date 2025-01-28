import React, { useState } from "react";
import contact from '../Accets/contact.jpg'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false); 
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6 font-mono">
      <h1 className="text-3xl font-bold text-center mb-6">Contact Us</h1>
      <div className="flex flex-col md:flex-row gap-8 mb-12">
        
        <div className="flex-1">
          <img
            src={contact}
            alt="Contact Us"
            className="h-72 w-full object-cover rounded-lg"
          />
        </div>

        <div className="flex-1 flex flex-col justify-center items-start">
          <p className="mb-2">
            <strong>Phone:</strong> +91 123 456 7890
          </p>
          <p className="mb-2">
            <strong>Email:</strong> support@kiva.com
          </p>
          <p>
            <strong>Address:</strong> Kiva India Limited, Gurgaon, Haryana, India
          </p>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4 text-center text-red-600">
          You can also write us directly here.
        </h2>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md space-y-4"
        >
          <div>
            <label htmlFor="name" className="block font-medium">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block font-medium">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block font-medium">
              Message
            </label>
            <textarea
              name="message"
              id="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              rows="5"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-red-700 text-white py-2 rounded-lg hover:bg-black transition duration-300"
          >
            Submit
          </button>
        </form>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center space-y-4">
              <h2 className="text-xl font-bold">YOUR MESSAGE HAS BEEN SENT</h2>
              <p>
                We will get back to you as soon as possible, if your message requires
                an answer.
              </p>
              <button
                onClick={closeModal}
                className="bg-red-700 text-white py-2 px-6 rounded-lg hover:bg-black transition duration-300"
              >
                OK
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Contact;
