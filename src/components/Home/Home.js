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
        <li className="Teams" key={team.id} index={team.id}>{team.name}</li>
      );
    });
    return (
      <div className="Home">
        <div className="container">
          <div className="row">
            <div className="col-sm-2">
              East</div>
            <div className="col-sm-8">{teamsComponents}</div>
            <div className="col-sm-2">West</div>
          </div>
        </div>
      </div>
    )
  }
}

export default Home;
