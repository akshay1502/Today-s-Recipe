import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header/header';
import Card from './components/card/card';
// import Editor from './components/editor/editor';
import Cook from './components/cook/cook';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/card">
            <Card />
          </Route>
          <Route path="/testing">
            <Cook />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
