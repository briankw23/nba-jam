import React from 'react';
import { Link } from 'react-router-dom';
import teamsRequest from '../../firebaseRequests/teams';
import authRequest from '../../firebaseRequests/auth';
import playersRequest from '../../firebaseRequests/players';
// import Roster from '../Roster/Roster';
import Starters from '../Starters/Starters';

import './MyTeam.css';

class MyTeam extends React.Component {

  state = {
    myTeam: [],
    roster: [],
  }

  componentDidMount () {

    teamsRequest
      .getRequestOneTeam(authRequest.getUid())
      .then((myTeam) => {
        this.setState({ myTeam });
        const id = this.state.myTeam[0].id;
        playersRequest.getRequestRoster(id)
          .then((roster) => {
            this.setState({ roster });
            console.error(roster);
          });
      })
      .catch((err) => {
        console.error('error getting teams', err);
      });
  }
  // renderStarter () {
  //   if (player.starter === true) return <button>Starter</button>;
  //   return <button>Bench</button>;
  // }
  render () {
    const myTeam = this.state.myTeam.map((team) => {
      return (
        <div key={team.id}>
          <h1> {team.name}</h1>
          <img src={team.image} alt="" />
        </div>
      );
    });
    const rosterComponents = this.state.roster.map((player) => {
      // const playerCardClickEvent = () => {

      // };
      return (
        <div className="Roster">
          <div className="media" key={player.id}>
            <div className="media-left">
              <img className="media-object" src={player.image} alt="..." />
            </div>
            <div className="media-body">
              <h4 className="media-heading">{player.name}</h4>
              <button>Edit</button>
              <button>Delete</button>
              {/* {this.renderStarter()} */}
            </div>
          </div>
        </div>
      );
    });
    return (
      <div className="MyTeam">
        <button><Link to="/createTeam">Create/Edit Team</Link></button>
        <button><Link to="/createPlayer">Create Player</Link></button>
        <div>
          {myTeam}
        </div>
        <div>
          <Starters
            details = {this.state.roster}
          />
        </div>
        <div>
          {rosterComponents}
        </div>
      </div>
    );
  }
}

export default MyTeam;
