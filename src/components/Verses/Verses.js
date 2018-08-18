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
    }).map((team, index, array) => {

      return team.image;
    });

    const pOneStarterOneImage = this.props.location.state.playerOneRoster.filter((player) => {
      return player.id === this.props.location.state.pOneStarterOne;
    }).map((player, index, array) => {
      return player.image;
    });

    const pOneStarterTwoImage = this.props.location.state.playerOneRoster.filter((player) => {
      return player.id === this.props.location.state.pOneStarterTwo;
    }).map((player, index, array) => {
      return player.image;
    });

    const pTwoStarterOneImage = this.props.location.state.playerTwoRoster.filter((player) => {
      return player.id === this.props.location.state.pTwoStarterOne;
    }).map((player, index, array) => {
      return player.image;
    });

    const pTwoStarterTwoImage = this.props.location.state.playerTwoRoster.filter((player) => {
      return player.id === this.props.location.state.pTwoStarterTwo;
    }).map((player, index, array) => {
      return player.image;
    });

    console.error('verse', playerOneTeamLogo[0]);
    console.error('verse', pOneStarterOneImage[0]);
    const playerTwoTeamLogo = this.props.location.state.teams.filter((team) => {
      return team.id === this.props.location.state.playerTwoTeamImage;
    }).map((team, index, array) => {
      return team.image;
    });

    return (
      <div className="container-fluid">
        {/* top row */}
        <div className="row">
          <div className="col-lg-3 score">
            <img className="col-lg-6 teamLogos" src={playerOneTeamLogo[0]} alt=""/>
            <h1 className="col-lg-6 scoreText">78</h1>
          </div>
          <div className="col-lg-6">
            <h1 className="finalText">FINAL GAME STATS:</h1>
          </div>
          <div className="col-lg-3 score">
            <h1 className="col-lg-6 scoreText">78</h1>
            <img className="col-lg-6 teamLogos" src={playerTwoTeamLogo[0]} alt=""/>
          </div>
        </div>
        {/* Second Section */}
        <div className="row">
          {/* 1 */}
          <div className="col-lg-6">
            <div className="col-lg-4">
              {/* player one s one image */}
              <img src={pOneStarterOneImage[0]} alt=""/>
            </div>
            <div className="col-lg-8">

            </div>
          </div>
          {/* 2 */}
          <div className="col-lg-6">
            <div className="col-lg-4">
              {/* player two s one image */}
              <img src={pTwoStarterOneImage[0]} alt=""/>
            </div>
            <div className="col-lg-8">

            </div>
          </div>
          {/* 3 */}
          <div className="col-lg-6">
            <div className="col-lg-4">
              {/* player one s2 image */}
              <img src={pOneStarterTwoImage[0]} alt=""/>
            </div>
            <div className="col-lg-8">

            </div>
          </div>
          {/* 4 */}
          <div className="col-lg-6">
            <div className="col-lg-4">
              {/* player two s two image */}
              <img src={pTwoStarterTwoImage[0]} alt=""/>
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
