/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import toastMsg from '../../helperFunctions/toast';
import 'react-toastify/dist/ReactToastify.css';
import './signup.scss';

export default function Signup({ user }) {
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: 'Use 8 or more characters with a mix of alphabets, numbers and special characters.',
  });
  useEffect(() => {
    if (user) {
      window.location.href = '/';
    }
  }, [user]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
    switch (name) {
      case 'firstName': {
        const result = /^[a-zA-Z]+$/g.test(value);
        const errorMsg = result ? '' : 'First name should contain only alphabets.';
        setFormErrors({ ...formErrors, [name]: errorMsg });
        break;
      }
      case 'lastName': {
        const result = /^[a-zA-Z]+$/g.test(value);
        const errorMsg = result ? '' : 'Last name should contain only alphabets.';
        setFormErrors({ ...formErrors, [name]: errorMsg });
        break;
      }
      case 'email': {
        const result = /^\S+@\S+\.\S+$/.test(value);
        const errorMsg = result ? '' : 'Enter a valid email address.';
        setFormErrors({ ...formErrors, [name]: errorMsg });
        break;
      }
      case 'password': {
        const result = /^(?=.*\d)(?=.*[!"#$%&'()*+,-.:;<=>?@[\]^_`])(?=.*[a-z]|[A-Z]).{8,}$/g.test(value);
        const errorMsg = result ? '' : 'Use 8 or more characters with a mix of alphabets, numbers and special characters.';
        setFormErrors({ ...formErrors, [name]: errorMsg });
        break;
      }
      default:
        break;
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      firstName, lastName, email, password,
    } = formValues;
    const valueRequiredError = {};
    if (!firstName.length) { valueRequiredError.firstName = 'First name is required'; }
    if (!lastName.length) { valueRequiredError.lastName = 'Last name is required'; }
    if (!email.length) { valueRequiredError.email = 'Email is required'; }
    if (!password.length) { valueRequiredError.password = 'Password is required'; }
    if (formErrors.firstName === '' && formErrors.lastName === '' && formErrors.email === '' && formErrors.password === '') {
      const res = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formValues),
      });
      const resData = await res.json();
      if (resData.id) {
        setFormValues({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
        });
        window.location.href = '/';
      } else {
        toastMsg('error', resData.message);
      }
    } else {
      setFormErrors({ ...formErrors, ...valueRequiredError });
    }
  };
  return (
    <div className="form">
      <img src="/assests/signupBanner.png" alt="SignupBannerImage" id="signupBannerImage" />
      <form className="signupForm" onSubmit={handleSubmit} method="POST">
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
            <small>{formErrors.firstName}</small>
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
            <small>{formErrors.lastName}</small>
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
          <small>{formErrors.email}</small>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <br />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="eg.user@123"
            value={formValues.password}
            onChange={handleInputChange}
          />
          <small style={{ visibility: 'visible' }}>
            { formErrors.password }
          </small>
        </div>
        <input type="submit" value="Sign up" id="signupBtn" />
      </form>
    </div>
  );
}
