/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './login.scss';

export default function Login() {
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });
  const handleInputChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="form">
      <img src="/assests/loginBanner.jpg" alt="LoginBannerImage" id="loginBannerImage" />
      <form className="loginForm">
        <div className="formHeader">
          <div>Login</div>
          <p>
            Don&#8216;t have an account?
            {' '}
            <Link to="/signup">Create one here</Link>
          </p>
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="email"
            name="email"
            id="email"
            value={formValues.email}
            onChange={handleInputChange}
          />
          <small>error in firstName</small>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <br />
          <input
            type="password"
            name="password"
            id="password"
            value={formValues.password}
            onChange={handleInputChange}
          />
          <small>info about the user password</small>
        </div>
        <input type="submit" value="Login" id="loginBtn" />
      </form>
    </div>
  );
}
