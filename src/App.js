/* eslint-disable no-constant-condition */
import './App.css';
import {
  BrowserRouter, Routes, Route,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Header from './components/Header/header';
import Home from './components/home/home';
import AddRecipe from './components/addRecipe/addRecipe';
import Signup from './components/signup/signup';
import Login from './components/login/login';
import Recipes from './components/recipes/recipes';

function App() {
  const { pathname } = window.location;
  return (
    <BrowserRouter>
      <div className="App">
        { pathname === '/signup' || pathname === '/login' ? null : <Header /> }
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="addRecipe" element={<AddRecipe />} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="recipes/:id" element={<Recipes />} />
        </Routes>
        <ToastContainer />
      </div>
    </BrowserRouter>
  );
}

export default App;
