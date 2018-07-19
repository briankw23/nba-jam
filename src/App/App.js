import React, { Component } from 'react';
import { Route, BrowserRouter, Redirect, Switch } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import Home from '../components/Home/Home';
import NavBar from '../components/NavBar/NavBar';
import CreateTeam from '../components/CreateTeam/CreateTeam';
import MyTeam from '../components/MyTeam/MyTeam';
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';

import fbConnection from '../firebaseRequests/connection';
fbConnection();

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        authed === false ? (
          <Component {...props} />
        ) : (
            <Redirect
              to={{ pathname: '/orders', state: { from: props.location } }}
            />
          )
      }
    />
  );
};

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        authed === true ? (
          <Component {...props} />
        ) : (
            <Redirect
              to={{ pathname: '/login', state: { from: props.location } }}
            />
          )
      }
    />
  );
};

class App extends Component {

  state = {
    authed: false,
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <NavBar />
            <div className="container">
              <div className="row">
                <Switch>
                  <Route path="/" exact component={Home} />
                  <PublicRoute path="/register" authed={this.state.authed} component={Register} />
                  <PrivateRoute path="/myTeam" authed={this.state.authed} component={MyTeam} />
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
