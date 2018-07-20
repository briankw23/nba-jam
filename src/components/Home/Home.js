import React from 'react';

import teamsRequest from '../../firebaseRequests/teams';

import './Home.css';

class Home extends React.Component {

  state = {
    teams: [],
  }

  componentDidMount() {
    teamsRequest
      .getRequest()
      .then((teams) => {
        this.setState({ teams })
      })
      .catch((err) => {
        console.error('error getting teams');
      })
  }

  render() {

    const teamsComponents = this.state.teams.map((team) => {
      return (
        <li className="Teams col-sm-3" key={team.id} index={team.id}>{team.name}</li>
      );
    });
    return (
      <div className="">
        <div className="container">
          <div className="row top">
            {/* East Section */}
            <div className="col-sm-2">
              <h2 className="East">East</h2>
            </div>

            {/* Teams */}
            <div className="col-sm-8">{teamsComponents}</div>

            {/* West Section */}
            <div className="col-sm-2">
              <h2 className="West">West</h2>
            </div>

          </div>
        {/* Second Row */}
        <div className="row bottom">
          <div className="col-sm-6">Player 1</div>
          <div className="col-sm-6">Player 2</div>
        </div>
        </div>
      </div>
    )
  }
}

export default Home;
