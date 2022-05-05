/* eslint-disable no-constant-condition */
import './App.css';
import {
  BrowserRouter, Routes, Route,
} from 'react-router-dom';
import Header from './components/Header/header';
import Card from './components/card/card';
import AddRecipe from './components/addRecipe/addRecipe';
import Signup from './components/signup/signup';
import Login from './components/login/login';

function App() {
  const { pathname } = window.location;
  return (
    <BrowserRouter>
      <div className="App">
        { pathname === '/signup' || '/login' ? null : <Header /> }
        <Routes>
          <Route path="/" element={<Card />} />
          <Route path="addRecipe" element={<AddRecipe />} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
