/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useRef } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import fetchURL from '../../helperFunctions/fetch';
import toastMsg from '../../helperFunctions/toast';
import 'react-toastify/dist/ReactToastify.css';
import './signup.scss';
import { ReactSpinner } from '../../loading';

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
  const [hide, setHide] = useState(false);
  const [islogging, setIslogging] = useState(false);
  const passwordRef = useRef(null);
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
  const changePasswordType = () => {
    passwordRef.current.type = hide ? 'password' : 'text';
    setHide(!hide);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      firstName, lastName, email, password,
    } = formValues;
    const valueRequiredError = {
      email: '', password: '', firstName: '', lastName: '',
    };
    if (!firstName.length) { valueRequiredError.firstName = 'First name is required'; }
    if (!lastName.length) { valueRequiredError.lastName = 'Last name is required'; }
    if (!email.length) { valueRequiredError.email = 'Email is required'; }
    if (!password.length) { valueRequiredError.password = 'Password is required'; }
    if (formErrors.firstName === ''
    && formErrors.lastName === ''
    && formErrors.email === ''
    && formErrors.password === ''
    && firstName.length && lastName.length && email.length && password.length) {
      setIslogging(true);
      const { result } = await fetchURL('/signup', 'POST', formValues);
      if (result.id) {
        setFormValues({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
        });
        setFormErrors({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
        });
        window.history.replaceState({}, '', '/');
        window.location.reload();
      } else {
        setIslogging(false);
        toastMsg('error', result.message);
      }
    } else {
      alert(`${valueRequiredError.email}\n${valueRequiredError.password}\n${valueRequiredError.firstName}\n${valueRequiredError.lastName}`);
      setFormErrors({ ...formErrors, ...valueRequiredError });
    }
  };
  return (
    <div className="form auth">
      <img src="/assests/signupBanner.png" alt="SignupBannerImage" id="signupBannerImage" />
      <form className="signupForm" onSubmit={handleSubmit} method="POST">
        <div className="formHeader">
          <h2>Create Account</h2>
          <p>
            Already have an account?
            {' '}
            <Link to="/login">Login here</Link>
          </p>
        </div>
        <div className="fullName">
          <div>
            <label htmlFor="firstName">
              Fisrt Name
              <br />
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={formValues.firstName}
                onChange={handleInputChange}
              />
            </label>
            <small>{formErrors.firstName}</small>
          </div>
          <div>
            <label htmlFor="lastName">
              Last Name
              <br />
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={formValues.lastName}
                onChange={handleInputChange}
              />
            </label>
            <small>{formErrors.lastName}</small>
          </div>
        </div>
        <div>
          <label htmlFor="email">
            Email
            <br />
            <input
              type="email"
              name="email"
              id="email"
              value={formValues.email}
              onChange={handleInputChange}
            />
          </label>
          <small>{formErrors.email}</small>
        </div>
        <div>
          <label htmlFor="password">
            Password
            <br />
            <div className="password">
              <input
                type="password"
                name="password"
                id="password"
                placeholder="eg.user@123"
                ref={passwordRef}
                value={formValues.password}
                onChange={handleInputChange}
              />
              {
                hide
                  ? <AiFillEye size="1.5rem" className="hideOrShowpass" onClick={changePasswordType} />
                  : <AiFillEyeInvisible size="1.5rem" className="hideOrShowpass" onClick={changePasswordType} />
              }
            </div>
          </label>
          <small>{ formErrors.password }</small>
        </div>
        {
          islogging
            ? <ReactSpinner icon={<PulseLoader />} />
            : <input type="submit" value="Signup" id="signupBtn" />
        }
      </form>
    </div>
  );
}
