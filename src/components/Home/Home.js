import React from 'react';
import './Home.css';

class Home extends React.Component {
  render() {
    return (
      <div className="Home">
      <div className="container">
        <div className="row">
          <div className="col-sm-2">
          East</div>
          <div className="col-sm-8">Teams</div>
          <div className="col-sm-2">West</div>
        </div>
      </div>
      </div>
    )
  }
}

export default Home;
