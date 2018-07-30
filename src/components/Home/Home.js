import React from 'react';

import teamsRequest from '../../firebaseRequests/teams';
import playersRequest from '../../firebaseRequests/players';

import { Button } from 'react-bootstrap';

import './Home.css';

class Home extends React.Component {

  state = {
    teams: [],
    playerOneRoster: [],
    playerTwoRoster: [],
    playerInContext: 0,
  }

  componentDidMount () {
    teamsRequest
      .getRequest()
      .then((teams) => {
        this.setState({ teams });
      })
      .catch((err) => {
        console.error('error getting teams');
      });
  }

  teamClickEvent = (e, id) => {
    console.error(id);
    playersRequest
      .getRequestRoster(id)
      .then(roster => {
        this.setState({ playerOneRoster: roster });
        console.error(roster);
      })
      .catch(err => {
        console.error("error getting teams", err);
      });
  }

  render () {

    // const teamsComponents = this.state.teams.map((team) => {
    //   return (
    //     <li className="Teams col-sm-3" key={team.id} index={team.id}>{team.name}</li>
    //   );
    // });

    const eastComponents = this.state.teams.filter((team) => {
      return team.confId === 0;
    }).map((team) => {
      return (
        <Button onClick={(e) => this.teamClickEvent(e, team.id)} key={team.id}>
          <li className="Teams col-sm-2" key={team.id} index={team.id}>{team.name}</li>
        </Button>
      );
    });

    const westComponents = this.state.teams.filter((team) => {
      return team.confId === 1;
    }).map((team) => {
      return (
        <Button onClick={(e) => this.teamClickEvent(e, team.id)} key={team.id}>
          <li className="Teams col-sm-2" key={team.id} index={team.id}>{team.name}</li>
        </Button>
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
            <div className="col-sm-4">
              {eastComponents}
            </div>

            <div className="col-sm-4">
              {westComponents}
            </div>

            {/* West Section */}
            <div className="col-sm-2">
              <h2 className="West">West</h2>
            </div>

          </div>
          {/* Second Row */}
          <div className="row bottom">
            <div className="col-sm-6">
              <Button>Player 1</Button>
            </div>
            <div className="col-sm-6">
              <Button>Player 2</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
