/* eslint-disable no-constant-condition */
import './App.scss';
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
import Profile, { EditProfile } from './components/profile/profile';
import ShowProfile from './components/profile/showProfile';
import Temp from './temp';
import Search from './components/search/search';
import fetchURL from './helperFunctions/fetch';

function App() {
  const [user, setUser] = useState(null);
  const [fetchStatus, setFetchStatus] = useState(null);
  useEffect(async () => {
    const { result, statusValue } = await fetchURL('/users/self', 'GET');
    if (statusValue === 200) {
      setUser(result);
    }
    setFetchStatus(statusValue);
  }, []);
  return (
    <div className="App">
      { fetchStatus && <Header user={user} fetchStatus={fetchStatus} /> }
      <Routes>
        <Route path="signup" element={<Signup user={user} />} />
        <Route path="login" element={<Login user={user} />} />
        {user && (
        <>
          <Route path="addRecipe" element={<AddRecipe />} />
          <Route path="recipes/:id" element={<Recipes user={user} />} />
          <Route path="profile" element={<Profile />}>
            <Route path="edit" element={<EditProfile user={user} />} />
            <Route path=":id" element={<ShowProfile user={user} />} />
          </Route>
          <Route path="search" element={<Search />} />
          <Route path="temp" element={<Temp />} />
          <Route exact path="/" element={<Home />} />
        </>
        )}
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
