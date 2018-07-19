import React, { Component } from 'react';
import {Route, BrowserRouter, Redirect, Switch} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import Home from '../components/Home/Home';
import NavBar from '../components/NavBar/NavBar';
import CreateTeam from '../components/CreateTeam/CreateTeam';
import MyTeam from '../components/MyTeam/MyTeam';
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
          <NavBar/>
            <div className="container">
              <div className="row">
                <Switch>
                  <Route path="/" exact component= {Home}/>
                </Switch>
              </div>
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
