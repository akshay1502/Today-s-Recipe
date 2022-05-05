/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './signup.scss';

export default function Signup() {
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
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
      <img src="/assests/signupBanner.png" alt="SignupBannerImage" id="signupBannerImage" />
      <form className="signupForm">
        <div className="formHeader">
          <div>Create Account</div>
          <p>
            Already have an account?
            {' '}
            <Link to="/login">Login here</Link>
          </p>
        </div>
        <div className="fullName">
          <div>
            <label htmlFor="firstName">Fisrt Name</label>
            <br />
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={formValues.firstName}
              onChange={handleInputChange}
            />
            <small>error in firstName</small>
          </div>
          <div>
            <label htmlFor="lastName">Last Name</label>
            <br />
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={formValues.lastName}
              onChange={handleInputChange}
            />
            <small>error in lastName</small>
          </div>
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
            placeholder="User@123"
            value={formValues.password}
            onChange={handleInputChange}
          />
          <small style={{ visibility: 'visible' }}>
            Use 8 or more characters with a mix of alphabets, numbers and special characters.
          </small>
        </div>
        <input type="submit" value="Sign up" id="signupBtn" />
      </form>
    </div>
  );
}
