import React from 'react';
import { NavLink } from 'react-router-dom';
import Create from './Create';
import './Styles/navbar.css';
const Navbar = () => {
  return (
    <div>
      <div className="navbar">
        <h2 id="white-text">VALOHUB</h2>
        <form>
          <input
            type="text"
            id="postName"
            name="postName"
            placeholder="Search"
          />
        </form>
        <NavLink
          to="/"
          style={{
            textDecoration: 'none',
            color: '#53212b ',
            fontWeight: 'bolder',
            fontSize: '25px',
          }}
        >
          Home
        </NavLink>
        <NavLink
          to="/create"
          style={{
            textDecoration: 'none',
            color: '#53212b ',
            fontWeight: 'bolder',
            fontSize: '25px',
          }}
        >
          Create
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
