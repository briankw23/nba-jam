import React from 'react';

import teamsRequest from '../../firebaseRequests/teams';
import playersRequest from '../../firebaseRequests/players';

import { Button } from 'react-bootstrap';

import './Home.css';
import PlayerOne from '../PlayerOne/PlayerOne';
import PlayerTwo from '../PlayerTwo/PlayerTwo';

class Home extends React.Component {

  state = {
    teams: [],
    playerOneRoster: [],
    playerTwoRoster: [],
    playerInContext: 1,
  }

  componentDidMount () {
    teamsRequest
      .getRequest()
      .then((teams) => {
        this.setState({ teams });
      })
      .catch((err) => {
        console.error(err,'error getting teams');
      });
  }

  teamClickEvent = (e, id) => {
    console.error(id);
    playersRequest
      .getRequestRoster(id)
      .then(roster => {
        this.state.playerInContext === 1 ? this.setState({ playerOneRoster: roster }) : this.setState({ playerTwoRoster: roster });
      })
      .catch(err => {
        console.error("error getting teams", err);
      });
  }

  checkPlayer = () => {

  }

  playerOneInContext = () => {
    this.setState({ playerInContext: 1});
  }
  playerTwoInContext = () => {
    this.setState({ playerInContext: 2});
  }

  render () {

    // const teamsComponents = this.state.teams.map((team) => {
    //   return (
    //     <li className="Teams col-sm-3" key={team.id} index={team.id}>{team.name}</li>
    //   );
    // });

    const playerOneComponents = this.state.playerOneRoster.map((player) => {
      return (
        <PlayerOne
          redirectToMyTeam= {this.redirectToMyTeam}
          key={player.id}
          index={player.id}
          details= {player}
        />
      );
    });

    const playerTwoComponents = this.state.playerTwoRoster.map((player) => {
      return (
        <PlayerTwo
          redirectToMyTeam= {this.redirectToMyTeam}
          key={player.id}
          index={player.id}
          details= {player}
        />
      );
    });

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
              <Button onClick={this.playerOneInContext}>Player 1</Button>
              { playerOneComponents}
            </div>
            <div className="col-sm-6">
              <Button onClick={this.playerTwoInContext}>Player 2</Button>
              { playerTwoComponents }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
