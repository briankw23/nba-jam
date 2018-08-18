import React from 'react';
import './Verses.css';

class Verses extends  React.Component {

  render () {
    const {
      pOneStarterOne,
      pOneStarterTwo,
      pTwoStarterOne,
      pTwoStarterTwo,
      playerOneRoster,
      playerTwoRoster,
      playerOneTeamImage,
      playerTwoTeamImage,
      teams,
    } = this.props.location.state;

    const playerOneTeamLogo = this.props.location.state.teams.filter((team) => {
      return team.id === this.props.location.state.playerOneTeamImage;
    }).map((team) => {
      return team.image;
    });

    const playerTwoTeamLogo = this.props.location.state.teams.filter((team) => {
      return team.id === this.props.location.state.playerTwoTeamImage;
    }).map((team) => {
      return team.image;
    });

    console.error(playerOneTeamLogo);
    console.error(playerOneTeamImage);
    return (
      <div className="container-fluid">
        {/* top row */}
        <div className="row">
          <div className="col-lg-3 score">
            <img className="col-lg-6" src={playerOneTeamLogo} alt=""/>
            <h1 className="col-lg-6 scoreText">78</h1>
          </div>
          <div className="col-lg-6">
            <h1 className="finalText">FINAL GAME STATS:</h1>
          </div>
          <div className="col-lg-3 score">
            <img className="col-lg-6" src={playerTwoTeamLogo} alt=""/>
            <h1 className="col-lg-6 scoreText">78</h1>
          </div>
        </div>
        {/* Second Section */}
        <div className="row">
          {/* 1 */}
          <div className="col-lg-6">
            <div className="col-lg-4">
              {/* player one s one image */}
            </div>
            <div className="col-lg-8">

            </div>
          </div>
          {/* 2 */}
          <div className="col-lg-6">
            <div className="col-lg-4">
              {/* player two s one image */}
            </div>
            <div className="col-lg-8">

            </div>
          </div>
          {/* 3 */}
          <div className="col-lg-6">
            <div className="col-lg-4">
              {/* player one s2 image */}
            </div>
            <div className="col-lg-8">

            </div>
          </div>
          {/* 4 */}
          <div className="col-lg-6">
            <div className="col-lg-4">
              {/* player two s two image */}
            </div>
            <div className="col-lg-8">

            </div>
          </div>
        </div>
      </div>
    );
  };
};

export default Verses;
