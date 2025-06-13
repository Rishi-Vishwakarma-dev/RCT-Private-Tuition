import React from 'react';
import './Navbar.css'; // Make sure to link to your CSS file
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className="logo">RCT &nbsp;Classes</div>
      <input type="checkbox" id="nav_check" hidden />
      <nav>
        <ul>
          <li>
            <Link to={"/"}  className="active">Home</Link>
          </li>
          <li>
            <Link to={"/contact"} >Contact Us</Link>
          </li>
          <li>
            <Link to={"/about"} >About</Link>
          </li>
          <li>
            <Link to={"/help"} >Help</Link>
          </li>
        </ul>
      </nav>
      <label htmlFor="nav_check" className="hamburger">
        <div></div>
        <div></div>
        <div></div>
      </label>
    </div>
  );
};

export default Navbar;
