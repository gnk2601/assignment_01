import React from 'react';
import logo from './logo.svg';
import './App.css';
import HeaderComponnet from './header';
import MoviesList from './list';
import MovieDetails from './details';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function App() {
  return (
    <Router>
      <div className="App">
        <HeaderComponnet />
        <Switch>
          <Route path="/" exact={true}>
            <MoviesList />
          </Route>
          <Route path="/details/:id" exact={true}>
            <MovieDetails />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
