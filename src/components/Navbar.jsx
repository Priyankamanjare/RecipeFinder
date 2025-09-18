import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="w-full bg-yellow-100 border-b-2 border-yellow-300 px-6 py-3 flex items-center justify-between shadow-lg sticky top-0 z-50">
      <Link to="/">
        <span
          className="text-2xl md:text-3xl"
          style={{ fontFamily: "'Caveat Brush', cursive" }}
        >
          WhatToCook
        </span>
      </Link>
    </nav>
  );
};

export default Navbar;
