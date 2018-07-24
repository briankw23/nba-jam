import React, { Component } from 'react';
import { Route, BrowserRouter, Redirect, Switch } from 'react-router-dom';
import './App.css';

import Home from '../components/Home/Home';
import NavBar from '../components/NavBar/NavBar';
import CreateTeam from '../components/CreateTeam/CreateTeam';
import MyTeam from '../components/MyTeam/MyTeam';
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';

import firebase from 'firebase';
import fbConnection from '../firebaseRequests/connection';
import CreatePlayer from '../components/CreatePlayer/CreatePlayer';
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
            to={{ pathname: '/myTeam', state: { from: props.location } }}
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

  componentDidMount () {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  componentWillUnmount () {
    this.removeListener();
  }

  runAway = () => {
    this.setState({ authed: false });
  }

  render () {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <NavBar
              authed={this.state.authed}
              runAway={this.runAway}
            />
            <div className="container">
              <div className="row">
                <Switch>
                  <Route path="/" exact component={Home} />
                  <PublicRoute path="/login" authed={this.state.authed} component={Login} />
                  <PublicRoute path="/register" authed={this.state.authed} component={Register} />
                  <PrivateRoute path="/createTeam" authed={this.state.authed} component={CreateTeam} />
                  <PrivateRoute path="/createPlayer" authed={this.state.authed} component={CreatePlayer} />
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
