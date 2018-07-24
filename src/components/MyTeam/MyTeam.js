import React from 'react';
import { Link } from 'react-router-dom';

import './MyTeam.css';

class MyTeam extends React.Component {
  render () {
    return (
      <div className="MyTeam">
        <h1>My Team</h1>
        <button><Link to="/createTeam">Create/Edit Team</Link></button>
      </div>
    );
  }
}

export default MyTeam;
