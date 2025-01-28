import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Address = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });
  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const validateFields = () => {
    const newErrors = {};

    if (!formData.address.trim()) newErrors.address = "Address is required.";
    if (!formData.city.trim()) newErrors.city = "City is required.";
    if (!formData.state.trim()) newErrors.state = "State is required.";
    if (!formData.zipCode.trim()) {
      newErrors.zipCode = "Zip Code is required.";
    } else if (!/^\d{6}(-\d{5})?$/.test(formData.zipCode)) {
      newErrors.zipCode = "Enter a valid Zip Code (e.g., 123456 or 12345-6789).";
    }
    if (!formData.country.trim()) newErrors.country = "Country is required.";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fieldErrors = validateFields();

    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
    } else {
      setErrors({});
      setIsModalOpen(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setFormData({ address: "", city: "", state: "", zipCode: "", country: "" });
    navigate("/payment");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-100 to-white px-4 font-mono font-semibold">
      <h2 className="text-xl font-bold mb-4 text-center text-gray-800">Address</h2>
      <form
        className="w-full max-w-xs bg-white p-4 rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        {[
          { label: "Address", name: "address", placeholder: "Enter your address" },
          { label: "City", name: "city", placeholder: "Enter your city" },
          { label: "State", name: "state", placeholder: "Enter your state" },
          { label: "Zip Code", name: "zipCode", placeholder: "Enter your Zip code" },
          { label: "Country", name: "country", placeholder: "Enter your country" },
        ].map((field) => (
          <div className="mb-4" key={field.name}>
            <label htmlFor={field.name} className="block text-gray-700 text-sm">
              {field.label}
            </label>
            <input
              type="text"
              id={field.name}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              className={`mt-1 px-3 py-2 w-full border rounded text-sm ${
                errors[field.name] ? "border-red-500" : "border-gray-300"
              }`}
              placeholder={field.placeholder}
              aria-describedby={`${field.name}-error`}
            />
            {errors[field.name] && (
              <p id={`${field.name}-error`} className="text-red-600 text-xs mt-1">
                {errors[field.name]}
              </p>
            )}
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-red-600 text-white text-sm font-bold py-2 rounded hover:bg-red-700"
        >
          Save Address
        </button>
      </form>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
            <h3 className="text-xl font-bold mb-4 text-center">Address Saved</h3>
            <p className="text-center mb-4">Your address has been saved successfully!</p>
            <button
              onClick={handleModalClose}
              className="bg-red-600 text-white text-sm font-bold py-2 rounded hover:bg-red-700 w-full"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Address;
