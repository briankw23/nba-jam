import React from "react";

import playersRequest from "../../firebaseRequests/players";

class Roster extends React.Component {
  renderStarter () {
    if (this.props.details.starter === true) return <button>Starter</button>;
    return <button>Bench</button>;
  }

  render() {
    const { details } = this.props;
    return (
      <h1>Roster</h1>
      <div className="Roster">
        <div className="media">
          <div className="media-left">
            <img className="media-object" src={details.image} alt="..." />
          </div>
          <div className="media-body">
            <h4 className="media-heading">{details.name}</h4>
            <button>Edit</button>
            <button>Delete</button>
            {this.renderStarter()}
          </div>
        </div>
      </div>
    );
  }
}

export default Roster;
