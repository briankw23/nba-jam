import React from 'react';
import { Link } from 'react-router-dom';
import teamsRequest from '../../firebaseRequests/teams';
import authRequest from '../../firebaseRequests/auth';
import playersRequest from '../../firebaseRequests/players';
import Roster from '../Roster/Roster';
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

  render () {
    const myTeam = this.state.myTeam.map((team) => {
      return (
        <div key={team.id}>
          <h1> {team.name}</h1>
          <img src={team.image} alt="" />
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
          <Starters/>
        </div>
        <div>
          <Roster details= {this.state.roster}/>
        </div>
      </div>
    );
  }
}

export default MyTeam;
