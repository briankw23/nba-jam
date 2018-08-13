import React from 'react';

import teamsRequest from '../../firebaseRequests/teams';
import playersRequest from '../../firebaseRequests/players';

import { Button, ProgressBar } from 'react-bootstrap';

import './Home.css';
import PlayerOne from '../PlayerOne/PlayerOne';
import PlayerTwo from '../PlayerTwo/PlayerTwo';

class Home extends React.Component {
  state = {
    teams: [],
    playerOneRoster: [],
    playerTwoRoster: [],
    playerOneTeamImage: '',
    playerTwoTeamImage: '',
    playerInContext: 1,
    teamClickOn: '',
  };

  componentDidMount () {
    teamsRequest
      .getRequest()
      .then(teams => {
        this.setState({ teams });
      })
      .catch(err => {
        console.error(err, 'error getting teams');
      });
  }

  teamClickEvent = (e, id) => {
    console.error(id);
    playersRequest
      .getRequestRoster(id)
      .then(roster => {
        this.state.playerInContext === 1
          ? this.setState({ playerOneRoster: roster })
          : this.setState({ playerTwoRoster: roster });
        this.setState({ teamClickOn: id });

        this.state.playerInContext === 1 ? this.setState({ playerOneTeamImage: id }) : this.setState({ playerTwoTeamImage: id });

      })
      .catch(err => {
        console.error('error getting teams', err);
      });
  };

  playerOneInContext = () => {
    this.setState({ playerInContext: 1 });
  };
  playerTwoInContext = () => {
    this.setState({ playerInContext: 2 });
  };

  render () {
    // const teamsComponents = this.state.teams.map((team) => {
    //   return (
    //     <li className="Teams col-sm-3" key={team.id} index={team.id}>{team.name}</li>
    //   );
    // });

    const playerOneComponents = this.state.playerOneRoster.map(player => {
      return (
        < PlayerOne
          key={player.id}
          index={player.id}
          details={player}
        />);
    });

    const playerOneTeamLogo = this.state.teams.filter((team) => {
      return team.id === this.state.playerOneTeamImage;
    }).map((team) => {
      return (
        <div class="row" key={team.id}>
          <div class="col-sm-12">
            <div class="thumbnail">
              <img src={team.image} alt="..."/>
            </div>
          </div>
        </div>
      );
    });

    const playerOneCards = this.state.playerOneRoster.filter((player) => {
      return player.starter === true;
    }).map((player) => {
      return (
        <div className="row">
          <div className="col-sm-3">
            <div className="thumbnail">
              <img src={player.image} alt="player imaghe"/>
              <div className="caption">
                <h3>{player.name}</h3>
                <ProgressBar now={player.speed}  label={`SPEED`} />
                <ProgressBar now={player.threePointer}  label={`3 PTRS`} />
                <ProgressBar now={player.dunks}  label={`DUNKS`} />
                <ProgressBar now={player.defense}  label={`DEF`} />
              </div>
            </div>
          </div>
        </div>
      );
    });

    const playerTwoCards = this.state.playerTwoRoster.filter((player) => {
      return player.starter === true;
    }).map((player) => {
      return (
        <div className="row">
          <div className="col-sm-3">
            <div className="thumbnail">
              <img src={player.image} alt="player imaghe"/>
              <div className="caption">
                <h3>{player.name}</h3>
                <ProgressBar now={player.speed}  label={`SPEED`} />
                <ProgressBar now={player.threePointer}  label={`3 PTRS`} />
                <ProgressBar now={player.dunks}  label={`DUNKS`} />
                <ProgressBar now={player.defense}  label={`DEF`} />
              </div>
            </div>
          </div>
        </div>
      );
    });

    const playerTwoTeamLogo = this.state.teams.filter((team) => {
      return team.id === this.state.playerTwoTeamImage;
    }).map((team) => {
      return (
        <div class="row" key={team.id}>
          <div class="col-sm-12">
            <div class="thumbnail">
              <img src={team.image} alt="..."/>
            </div>
          </div>
        </div>
      );
    });

    const playerTwoComponents = this.state.playerTwoRoster.map(player => {
      return <PlayerTwo key={player.id} index={player.id} details={player} />;
    });

    const eastComponents = this.state.teams
      .filter(team => {
        return team.confId === 0;
      })
      .map(team => {
        return (
          <Button
            className="col-md-6"
            onClick={e => this.teamClickEvent(e, team.id)}
            key={team.id}
          >
            <li className="Teams col-sm-2" key={team.id} index={team.id}>
              <h4>{team.name}</h4>
            </li>
          </Button>
        );
      });

    const westComponents = this.state.teams
      .filter(team => {
        return team.confId === 1;
      })
      .map(team => {
        return (
          <Button
            className="col-md-6"
            onClick={e => this.teamClickEvent(e, team.id)}
            key={team.id}
          >
            <li className="Teams col-sm-2" key={team.id} index={team.id}>
              <h4>{team.name}</h4>
            </li>
          </Button>
        );
      });
    return (
      <div className="">
        <div className="container">
          <div className="row top">
            {/* East Section */}
            <div className="col-md-1">
              <h2 className="East">East</h2>
            </div>

            {/* Teams */}
            <div className="col-md-5">{eastComponents}</div>

            <div className="col-md-5">{westComponents}</div>

            {/* West Section */}
            <div className="col-md-1">
              <h2 className="West">West</h2>
            </div>
          </div>
          {/* Second Row */}
          <div className="row bottom">
            <div className="col-sm-6">
              <Button
                className="col-sm-12 playerButton btn-success"
                onClick={this.playerOneInContext}
              >
                Player 1
              </Button>
              {/* {playerOneTeamImage} */}
            </div>
            <div className="col-sm-6">
              <Button
                className="col-sm-12 playerButton btn-success"
                onClick={this.playerTwoInContext}
              >
                Player 2
              </Button>
              {/* {playerTwoTeamImage} */}
            </div>
            {/* Third Row */}
            <div className="row">
              <div className="col-sm-6">
                {playerOneTeamLogo}
                {playerOneCards}
                {playerOneComponents}
              </div>

              <div className="col-sm-6">
                {playerTwoTeamLogo}
                {playerTwoCards}
                {playerTwoComponents}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
