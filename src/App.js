/* eslint-disable no-constant-condition */
import './App.css';
import {
  Routes, Route, useLocation,
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import Header from './components/Header/header';
import Home from './components/home/home';
import AddRecipe from './components/addRecipe/addRecipe';
import Signup from './components/signup/signup';
import Login from './components/login/login';
import Recipes from './components/recipes/recipes';
import Profile from './components/profile/profile';
import Temp from './temp';
import fetchURL from './helperFunctions/fetch';

function App() {
  const { pathname } = useLocation();
  const [user, setUser] = useState(null);
  useEffect(async () => {
    const { result, statusValue } = await fetchURL('users/self', 'GET');
    if (statusValue === 200) {
      setUser(result);
    }
  }, []);
  return (
    <div className="App">
      {user && (
        <>
          { pathname === '/signup' || pathname === '/login' ? null : <Header user={user} /> }
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="addRecipe" element={<AddRecipe />} />
            <Route path="signup" element={<Signup />} />
            <Route path="login" element={<Login />} />
            <Route path="recipes/:id" element={<Recipes />} />
            <Route path="profile" element={<Profile />} />
            <Route path="profile/:id" element={<Profile />} />
            <Route path="temp" element={<Temp />} />
          </Routes>
          <ToastContainer />
        </>
      )}
    </div>
  );
}

export default App;
