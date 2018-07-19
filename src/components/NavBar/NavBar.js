import React from 'react';

import authRequests from '../../firebaseRequests/auth';

import { Link } from 'react-router-dom';

import './NavBar.css';

class NavBar extends React.Component {
  render() {

    const { authed, runAway } = this.props;
    const logoutClickEvent = () => {
      authRequests.logoutUser();
      runAway();
    };
    return (
      <div className="NavBar">
        <nav className="navbar navbar-default">
          <div className="container-fluid">

            <div className="navbar-header">
              <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span classN="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <Link to="/" className="navbar-brand">Arcade</Link>
            </div>

            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav">
                {/* <li className="active"><a href="#">Link <span class="sr-only">(current)</span></a></li>
                <li><a href="#">Link</a></li> */}
              </ul>
              <ul className="nav navbar-nav navbar-right">
                            {
                authed ? (
                  <ul className="nav navbar-nav navbar-right">
                    <li>
                      <Link to="/myTeam">My Team</Link>
                    </li>
                    {/* <li>
                      <Link to="/orders">Orders</Link>
                    </li> */}
                    <li className="navbar-form">
                      <button
                        onClick={logoutClickEvent}
                        className="btn btn-danger"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                ) : (
                  <ul className="nav navbar-nav navbar-right">
                    <li>
                      <Link to="/login">Login</Link>
                    </li>
                  </ul>
                )
              }

              </ul>

            </div>
          </div>
        </nav>
      </div>
    )
  }
}

export default NavBar;
