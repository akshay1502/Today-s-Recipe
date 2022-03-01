import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/header';
import Card from './components/card/card';
import AddRecipe from './components/addRecipe/addRecipe';
// import Editor from './components/editor/editor';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Card />} />
          <Route path="/addRecipe" element={<AddRecipe />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
