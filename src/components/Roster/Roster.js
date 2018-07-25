import React from 'react';

class Roster extends React.Component {
  state = {
    roster: [],
  }

  render () {
    const { details } = this.props;
    return (
      <div className="Roster">
        <h1>Roster</h1>
        <li>
          <h3>{details.name}</h3>
        </li>
      </div>
    );
  }
};

export default Roster;
