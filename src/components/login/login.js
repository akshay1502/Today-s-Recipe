/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './login.scss';

export default function Login({ user }) {
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
  });
  const [show, setShow] = useState(false);
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
      default:
        break;
    }
    return null;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formValues;
    const valueRequiredError = {};
    if (!email.length) { valueRequiredError.email = 'Email is required'; }
    if (!password.length) { valueRequiredError.password = 'Password is required'; }
    if (formErrors.email === '' && formErrors.password === '') {
      const res = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formValues),
      });
      const resData = await res.json();
      if (resData.id) {
        setFormValues({
          email: '',
          password: '',
        });
        window.history.replaceState({}, '', '/');
        window.location.reload();
      } else {
        toast.error(resData.message, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        });
      }
    } else {
      setFormErrors({ ...formErrors, ...valueRequiredError });
    }
  };
  const changePasswordType = () => {
    const password = document.getElementById('password');
    if (show) {
      password.type = 'password';
    } else {
      password.type = 'text';
    }
    setShow(!show);
  };
  return (
    <div className="form auth">
      <img src="/assests/loginBanner.jpg" alt="LoginBannerImage" id="loginBannerImage" />
      <form className="loginForm" onSubmit={handleSubmit} method="POST">
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
          <small>{formErrors.email}</small>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <br />
          <div className="password">
            <input
              type="password"
              name="password"
              id="password"
              value={formValues.password}
              onChange={handleInputChange}
            />
            {
              show
                ? <AiFillEye size="1.5rem" className="hideOrShowpass" onClick={changePasswordType} />
                : <AiFillEyeInvisible size="1.5rem" className="hideOrShowpass" onClick={changePasswordType} />
            }
          </div>
          <small>{formErrors.password}</small>
        </div>
        <input type="submit" value="Login" id="loginBtn" />
      </form>
      <ToastContainer />
    </div>
  );
}
