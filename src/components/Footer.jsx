import React from 'react';
import { FaHome, FaBox, FaShoppingCart, FaInfoCircle, FaEnvelope } from 'react-icons/fa';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const Footer = () => (
   
  <div> 
  
    <footer className="">
      <div className="bg-red-700 text-center text-white text-sm border-t-2 font-mono py-4">
      <div className=" flex flex-wrap justify-center md:justify-center space-x-4 px-4">
      <Link to='/' className='hover:underline'><FaHome /></Link>
      <Link to='/products' className='hover:underline'><FaBox /></Link>
      <Link to='/cart' className='hover:underline'><FaShoppingCart /></Link>
      <Link to='/#' className='hover:underline'><FaInfoCircle /></Link>
      <Link to='/contect' className='hover:underline'><FaEnvelope /></Link>
      </div>
        <br/>
        <p className='font-bold'>&copy; {new Date().getFullYear()} Kiva Brand - Kiva India - CIN: L19201WB1931PLC007261</p>
        <br/>
        <div className="flex flex-wrap justify-center md:justify-center space-x-4 px-4">
          <a href="https://facebook.com" className="hover:underline"><FaFacebook /></a>
          <a href="https://twitter.com" className="hover:underline"><FaTwitter /></a>
          <a href="https://instagram.com" className="hover:underline"><FaInstagram /></a>
        </div>
      </div>
    </footer>
  </div>
);

export default Footer;
