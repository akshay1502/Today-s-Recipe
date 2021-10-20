import React from 'react';
import { FaUserCircle, FaAngleDown } from 'react-icons/fa';
import { AiOutlineSearch } from 'react-icons/ai';
import { BiLogIn } from 'react-icons/bi';
import './header.css';

export default function Header() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">Today&apos;s Recipe</div>
      <div className="navbar-input">
        <input type="text" className="searchBox" />
        <AiOutlineSearch size="2rem" />
      </div>
      <div className="navbar-menu">
        {/* <a href="index.html">Add recipe</a> */}
        <div className="login">
          <a href="index.html">Login </a>
          <BiLogIn size="2rem" />
        </div>
        <div className="user">
          <FaUserCircle size="3rem" />
          <FaAngleDown />
        </div>
      </div>
    </nav>
  );
}
