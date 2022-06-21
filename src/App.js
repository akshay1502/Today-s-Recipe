/* eslint-disable no-constant-condition */
import './App.css';
import {
  Routes, Route,
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
  const [user, setUser] = useState(null);
  const [fetchStatus, setFetchStatus] = useState(null);
  useEffect(async () => {
    const { result, statusValue } = await fetchURL('users/self', 'GET');
    if (statusValue === 200) {
      setUser(result);
    }
    setFetchStatus(statusValue);
  }, []);
  return (
    <div className="App">
      { fetchStatus && <Header user={user} fetchStatus={fetchStatus} /> }
      {user && (
        <Routes>
          <Route path="signup" element={<Signup user={user} />} />
          <Route path="login" element={<Login user={user} />} />
          <Route path="/" element={<Home />} />
          <Route path="addRecipe" element={<AddRecipe />} />
          <Route path="recipes/:id" element={<Recipes user={user} />} />
          <Route path="profile" element={<Profile />} />
          <Route path="profile/:id" element={<Profile />} />
          <Route path="temp" element={<Temp />} />
        </Routes>
      )}
      <ToastContainer />
    </div>
  );
}

export default App;
