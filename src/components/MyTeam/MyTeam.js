import React from 'react';
import { Link } from 'react-router-dom';
import teamsRequest from '../../firebaseRequests/teams';
import authRequest from '../../firebaseRequests/auth';

import './MyTeam.css';

class MyTeam extends React.Component {

  state = {
    myTeam: [],
  }

  componentDidMount () {
    teamsRequest
      .getRequestOneTeam(authRequest.getUid())
      .then((myTeam) => {
        this.setState({ myTeam });
        console.error(myTeam);
      })
      .catch((err) => {
        console.error('error getting teams');
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
        <button><Link to="/createPlayer">Create/Edit Player</Link></button>
        <div>
          {myTeam}
        </div>
      </div>
    );
  }
}

export default MyTeam;
