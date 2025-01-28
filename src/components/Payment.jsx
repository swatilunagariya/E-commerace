import React, { useState } from 'react';
import { FaCreditCard, FaUniversity, FaGooglePay, FaWallet } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [paymentDetails, setPaymentDetails] = useState({});
  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const navigate=useNavigate();

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails({ ...paymentDetails, [name]: value });
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'cardNumber':
        if (!/^\d{16}$/.test(value)) {
          error = 'Card number must be 16 digits.';
        }
        break;
      case 'expiry':
        if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(value)) {
          error = 'Expiry date must be in MM/YY format.';
        }
        break;
      case 'cvv':
        if (!/^\d{3}$/.test(value)) {
          error = 'CVV must be 3 digits.';
        }
        break;
      case 'upiId':
        if (!/^[a-zA-Z0-9.\-_]{2,}@[a-zA-Z]{2,}$/.test(value)) {
          error = 'Enter a valid UPI ID (e.g., name@bank).';
        }
        break;
      case 'bankName':
        if (!value) {
          error = 'Please select your bank.';
        }
        break;
      case 'tenure':
        if (!value) {
          error = 'Please select EMI tenure.';
        }
        break;
      default:
        break;
    }
    setErrors({ ...errors, [name]: error });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
  
    const newErrors = {};
  
    if (paymentMethod === 'card') {
      if (!paymentDetails.cardNumber || paymentDetails.cardNumber.trim() === '') {
        newErrors.cardNumber = 'Card number is required.';
      } else if (!/^\d{16}$/.test(paymentDetails.cardNumber)) {
        newErrors.cardNumber = 'Card number must be 16 digits.';
      }
  
      if (!paymentDetails.expiry || paymentDetails.expiry.trim() === '') {
        newErrors.expiry = 'Expiry date is required.';
      } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(paymentDetails.expiry)) {
        newErrors.expiry = 'Expiry date must be in MM/YY format.';
      }
  
      if (!paymentDetails.cvv || paymentDetails.cvv.trim() === '') {
        newErrors.cvv = 'CVV is required.';
      } else if (!/^\d{3}$/.test(paymentDetails.cvv)) {
        newErrors.cvv = 'CVV must be 3 digits.';
      }
    }
  
    if (paymentMethod === 'netbanking') {
      if (!paymentDetails.bankName || paymentDetails.bankName.trim() === '') {
        newErrors.bankName = 'Please select your bank.';
      }
    }
  
    if (paymentMethod === 'upi') {
      if (!paymentDetails.upiId || paymentDetails.upiId.trim() === '') {
        newErrors.upiId = 'UPI ID is required.';
      } else if (!/^[a-zA-Z0-9.\-_]{2,}@[a-zA-Z]{2,}$/.test(paymentDetails.upiId)) {
        newErrors.upiId = 'Enter a valid UPI ID (e.g., name@bank).';
      }
    }
  
    if (paymentMethod === 'emi') {
      if (!paymentDetails.cardNumber || paymentDetails.cardNumber.trim() === '') {
        newErrors.cardNumber = 'Card number is required.';
      } else if (!/^\d{16}$/.test(paymentDetails.cardNumber)) {
        newErrors.cardNumber = 'Card number must be 16 digits.';
      }
  
      if (!paymentDetails.tenure || paymentDetails.tenure.trim() === '') {
        newErrors.tenure = 'Please select EMI tenure.';
      }
    }
  
    setErrors(newErrors);
    toast.error(newErrors);
  
    if (Object.keys(newErrors).length > 0) {
      return;
    }
  
    setIsModalOpen(true);
  };
  


  const handleModalClose = () => {
    setIsModalOpen(false);
    setPaymentDetails({});
    setPaymentMethod('card');
    navigate("/");
  };

  return (
    <div>
      <div className="relative p-8 max-w-lg mx-auto bg-gradient-to-b from-blue-50 to-white rounded shadow-xl font-mono">
        <h2 className="text-xl font-bold mb-6">Make a Payment</h2>

        <div className="flex justify-around mb-6 text-sm w-14 h-14">
          {[
            { name: 'card', icon: <FaCreditCard />, label: 'Card' },
            { name: 'netbanking', icon: <FaUniversity />, label: 'Net Banking' },
            { name: 'upi', icon: <FaGooglePay />, label: 'UPI' },
            { name: 'emi', icon: <FaWallet />, label: 'EMI' },
          ].map(({ name, icon, label }) => (
            <button
              key={name}
              className={`flex flex-col items-center p-4 rounded-lg border ${
                paymentMethod === name ? 'bg-red-700 text-white border-transparent' : 'bg-white text-black border-gray-200'
              } transition duration-200 shadow-sm hover:shadow-md`}
              onClick={() => {
                setPaymentMethod(name);
                setErrors({});
              }}
            >
              <div className="text-xl mb-2">{icon}</div>
              <span className="text-sm font-bold">{label}</span>
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {paymentMethod === 'card' && (
            <div>
              <h3 className="text-lg font-medium mb-2">Card Details</h3>
              <input
                type="text"
                name="cardNumber"
                placeholder="Card Number"
                value={paymentDetails.cardNumber || ''}
                onChange={handlePaymentChange}
                className="w-full border rounded-lg px-4 py-2 mb-2"
              />
              {errors.cardNumber && <p className="text-red-500 text-sm">{errors.cardNumber}</p>}

              <div className="flex space-x-4">
                <input
                  type="text"
                  name="expiry"
                  placeholder="MM/YY"
                  value={paymentDetails.expiry || ''}
                  onChange={handlePaymentChange}
                  className="flex-1 border rounded-lg px-4 py-2"
                />
                <input
                  type="text"
                  name="cvv"
                  placeholder="CVV"
                  value={paymentDetails.cvv || ''}
                  onChange={handlePaymentChange}
                  className="flex-1 border rounded-lg px-4 py-2"
                />
              </div>
              {errors.expiry && <p className="text-red-500 text-sm">{errors.expiry}</p>}
              {errors.cvv && <p className="text-red-500 text-sm">{errors.cvv}</p>}
            </div>
          )}

          {paymentMethod === 'netbanking' && (
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">Net Banking</h3>
              <select
                name="bankName"
                value={paymentDetails.bankName || ''}
                onChange={handlePaymentChange}
                className="w-full border rounded-lg px-4 py-2"
              >
                <option value="" di>Select Your Bank</option>
              <option value="Airtel Payments Bank">Airtel Payments Bank</option>
              <option value="Axis Bank">Axis Bank</option>
              <option value="HDFC Bank">HDFC Bank</option>
              <option value="ICICI Bank">ICICI Bank</option>
              <option value="Kotak Bank">Kotak Bank</option>
              <option value="State Bank of India">State Bank of India</option>
              <option value="Allahabad Bank">Allahabad Bank</option>
              <option value="Andhra Bank">Andhra Bank</option>
              <option value="Bank of India">Bank of India</option>
              <option value="Bank of Maharashtra">Bank of Maharashtra</option>
              <option value="Canara Bank">Canara Bank</option>
              <option value="Catholic Syrian Bank">Catholic Syrian Bank</option>
              <option value="Central Bank of India">Central Bank of India</option>
              <option value="City Union Bank">City Union Bank</option>
              <option value="Corporation Bank">Corporation Bank</option>
              <option value="Cosmos Bank">Cosmos Bank</option>
              <option value="DCB Bank Ltd">DCB Bank Ltd</option>
              <option value="Deutsche Bank">Deutsche Bank</option>
              <option value="Dhanlakshmi Bank">Dhanlakshmi Bank</option>
              <option value="Federal Bank">Federal Bank</option>
              <option value="IDBI Bank">IDBI Bank</option>
              <option value="IDFC FIRST Bank">IDFC FIRST Bank</option>
              <option value="ING Vysya Bank">ING Vysya Bank</option>
              <option value="Indian Bank">Indian Bank</option>
              <option value="Indian Overseas Bank">Indian Overseas Bank</option>
              <option value="IndusInd Bank">IndusInd Bank</option>
              <option value="Jammu & Kashmir Bank">Jammu & Kashmir Bank</option>
              <option value="Janata Sahakari Bank">Janata Sahakari Bank</option>
              <option value="Karnataka Bank Ltd">Karnataka Bank Ltd</option>
              <option value="Karur Vysya Bank">Karur Vysya Bank</option>
              <option value="Laxmi Vilas Bank - Corporate">Laxmi Vilas Bank - Corporate</option>
              <option value="Laxmi Vilas Bank - Retail">Laxmi Vilas Bank - Retail</option>
              <option value="Oriental Bank of Commerce">Oriental Bank of Commerce</option>
              <option value="PNB YUVA Netbanking">PNB YUVA Netbanking</option>
              <option value="Punjab National Bank - Corporate Banking">Punjab National Bank - Corporate Banking</option>
              <option value="Punjab National Bank - Retail Banking">Punjab National Bank - Retail Banking</option>
              <option value="Saraswat Bank">Saraswat Bank</option>
              <option value="Shamrao Vitthal Co-operative Bank">Shamrao Vitthal Co-operative Bank</option>
              <option value="South Indian Bank">South Indian Bank</option>
              <option value="Standard Chartered Bank">Standard Chartered Bank</option>
              <option value="Standard Chartered Bank">State Bank of Bikaner & Jaipur</option>
              <option value="State Bank of Hyderabad">State Bank of Hyderabad</option>
              <option value="State Bank of Mysore">State Bank of Mysore</option>
              <option value="State Bank of Patiala">State Bank of Patiala</option>
              <option value="State Bank of Travancore">State Bank of Travancore</option>
              <option value="Syndicate Bank">Syndicate Bank</option>
              <option value="Tamilnad Mercantile Bank Ltd.">Tamilnad Mercantile Bank Ltd.</option>
              <option value="Union Bank of India">Union Bank of India</option>
              <option value="United Bank of India">United Bank of India</option>
              <option value="Yes Bank Ltd">Yes Bank Ltd</option>
              </select>
              {errors.bankName && <p className="text-red-500 text-sm">{errors.bankName}</p>}
            </div>
          )}

          {paymentMethod === 'upi' && (
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">UPI Payment</h3>
              <input
                type="text"
                name="upiId"
                placeholder="Enter UPI ID (e.g., name@bank)"
                value={paymentDetails.upiId || ''}
                onChange={handlePaymentChange}
                className="w-full border rounded-lg px-4 py-2"
              />
              {errors.upiId && <p className="text-red-500 text-sm">{errors.upiId}</p>}
            </div>
          )}

          {paymentMethod === 'emi' && (
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">EMI Details</h3>
              <input
                type="text"
                name="cardNumber"
                placeholder="Card Number"
                value={paymentDetails.cardNumber || ''}
                onChange={handlePaymentChange}
                className="w-full border rounded-lg px-4 py-2 mb-2"
              />
              {errors.cardNumber && <p className="text-red-500 text-sm">{errors.cardNumber}</p>}

              <select
                name="tenure"
                value={paymentDetails.tenure || ''}
                onChange={handlePaymentChange}
                className="w-full border rounded-lg px-4 py-2"
              >
                <option value="">Select Tenure</option>
                <option value="3">3 Months</option>
                <option value="6">6 Months</option>
                <option value="12">12 Months</option>
              </select>
              {errors.tenure && <p className="text-red-500 text-sm">{errors.tenure}</p>}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-red-700 text-white px-6 py-3 rounded-lg hover:bg-red-900 transition duration-200 shadow-md"
          >
            Pay Now
          </button>
        </form>
        {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
            <h3 className="text-xl font-bold mb-4 text-center">Order Placed</h3>
            <p className="text-center mb-4">Payment submitted successfully! Thank you for your purchase.</p>
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
    </div>
  );
};

export default Payment;
