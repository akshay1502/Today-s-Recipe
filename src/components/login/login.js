import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { PulseLoader } from 'react-spinners';
import './login.scss';
import { ReactSpinner } from '../../loading';
import fetchURL from '../../helperFunctions/fetch';
import toastMsg from '../../helperFunctions/toast';

export default function Login({ user }) {
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
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
      [name]: value.trim(),
    });
    switch (name) {
      case 'email': {
        const result = /^\S+@\S+\.\S+$/.test(value);
        const errorMsg = result ? '' : 'Enter a valid email address.';
        setFormErrors({ ...formErrors, [name]: errorMsg });
        break;
      }
      case 'password': {
        const errorMsg = value.length ? '' : 'Password is required';
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
    const { email, password } = formValues;
    const valueRequiredError = { email: '', password: '' };
    if (!email.length) { valueRequiredError.email = 'Email is required'; }
    if (!password.length) { valueRequiredError.password = 'Password is required'; }
    if (formErrors.email === '' && formErrors.password === '' && email.length && password.length) {
      setIslogging(true);
      const { result } = await fetchURL('/login', 'POST', formValues);
      if (result.id) {
        setFormValues({
          email: '',
          password: '',
        });
        setFormErrors({
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
      alert(`${valueRequiredError.email}\n${valueRequiredError.password}`);
      setFormErrors({ ...formErrors, ...valueRequiredError });
    }
  };
  const changePasswordType = () => {
    passwordRef.current.type = hide ? 'password' : 'text';
    setHide(!hide);
  };
  return (
    <div className="form">
      <img src="/assests/loginBanner.jpg" alt="LoginBannerImage" id="loginBannerImage" />
      <form className="loginForm" onSubmit={handleSubmit} method="POST">
        <div className="formHeader">
          <h2>Login</h2>
          <p>
            Don&#8216;t have an account?
            {' '}
            <Link to="/signup">Create one here</Link>
          </p>
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
          <small>{formErrors.password}</small>
        </div>
        {
          islogging
            ? <ReactSpinner icon={<PulseLoader />} />
            : <input type="submit" value="Login" id="loginBtn" />
        }
      </form>
    </div>
  );
}
