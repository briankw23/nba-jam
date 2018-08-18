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

    const pointsPOSO = Math.floor(Math.random() * 70);
    const pointsPOST = Math.floor(Math.random() * 70);
    const dunks11 = Math.floor(Math.random() * 7);
    const dunks12 = Math.floor(Math.random() * 7);
    const assist11 = Math.floor(Math.random() * 15);
    const assist12 = Math.floor(Math.random() * 15);
    const steals11 = Math.floor(Math.random() * 7);
    const steals12 = Math.floor(Math.random() * 7);
    const blocks11 = Math.floor(Math.random() * 7);
    const blocks12 = Math.floor(Math.random() * 7);
    const reb11 = Math.floor(Math.random() * 7);
    const reb12 = Math.floor(Math.random() * 7);
    const scoreOne = pointsPOSO + pointsPOST;
    const pointsPTSO = Math.floor(Math.random() * 70);
    const pointsPTST = Math.floor(Math.random() * 70);
    const dunks21 = Math.floor(Math.random() * 7);
    const dunks22 = Math.floor(Math.random() * 7);
    const assist21 = Math.floor(Math.random() * 15);
    const assist22 = Math.floor(Math.random() * 15);
    const steals21 = Math.floor(Math.random() * 7);
    const steals22 = Math.floor(Math.random() * 7);
    const blocks21 = Math.floor(Math.random() * 7);
    const blocks22 = Math.floor(Math.random() * 7);
    const reb21 = Math.floor(Math.random() * 7);
    const reb22 = Math.floor(Math.random() * 7);
    const scoreTwo = pointsPTSO + pointsPTST;

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
            <h1 className="col-lg-6 scoreText">{scoreOne}</h1>
          </div>
          <div className="col-lg-6">
            <h1 className="finalText">FINAL GAME STATS:</h1>
          </div>
          <div className="col-lg-3 score">
            <h1 className="col-lg-6 scoreText">{scoreTwo}</h1>
            <img className="col-lg-6 teamLogos" src={playerTwoTeamLogo[0]} alt=""/>
          </div>
        </div>
        {/* Second Section */}
        <div className="row second">
          {/* 1 */}
          <div className="col-lg-6 playerCardOne">
            <div className="col-lg-4">
              {/* player one s one image */}
              <img className="playerImage" src={pOneStarterOneImage[0]} alt=""/>
            </div>
            <div className="col-lg-8">
              <div>
                <h2>POINTS: {pointsPOSO}</h2>
              </div>
              <div>
                <h2>DUNKS: {dunks11}</h2>
              </div>
              <div>
                <h2>ASSISTS: {assist11}</h2>
              </div>
              <div>
                <h2>STEALS: {steals11}</h2>
              </div>
              <div>
                <h2>BLOCKS: {blocks11}</h2>
              </div>
              <div>
                <h2>REBNDS: {reb11}</h2>
              </div>
            </div>
          </div>
          {/* 2 */}
          <div className="col-lg-6 playerCardTwo">
            <div className="col-lg-4">
              {/* player two s one image */}
              <img className="playerImage" src={pTwoStarterOneImage[0]} alt=""/>
            </div>
            <div className="col-lg-8">
              <div>
                <h2>POINTS: {pointsPTSO}</h2>
              </div>
              <div>
                <h2>DUNKS: {dunks21}</h2>
              </div>
              <div>
                <h2>ASSISTS: {assist21}</h2>
              </div>
              <div>
                <h2>STEALS: {steals21}</h2>
              </div>
              <div>
                <h2>BLOCKS: {blocks21}</h2>
              </div>
              <div>
                <h2>REBNDS: {reb21}</h2>
              </div>
            </div>
          </div>
          {/* 3 */}
          <div className="col-lg-6 playerCardOne">
            <div className="col-lg-4">
              {/* player one s2 image */}
              <img className="playerImage" src={pOneStarterTwoImage[0]} alt=""/>
            </div>
            <div className="col-lg-8">
              <div>
                <h2>POINTS: {pointsPOST}</h2>
              </div>
              <div>
                <h2>DUNKS: {dunks12}</h2>
              </div>
              <div>
                <h2>ASSISTS: {assist12}</h2>
              </div>
              <div>
                <h2>STEALS: {steals12}</h2>
              </div>
              <div>
                <h2>BLOCKS: {blocks12}</h2>
              </div>
              <div>
                <h2>REBNDS: {reb12}</h2>
              </div>
            </div>
          </div>
          {/* 4 */}
          <div className="col-lg-6 playerCardTwo">
            <div className="col-lg-4">
              {/* player two s two image */}
              <img className="playerImage" src={pTwoStarterTwoImage[0]} alt=""/>
            </div>
            <div className="col-lg-8">
              <div>
                <h2>POINTS: {pointsPTST}</h2>
              </div>
              <div>
                <h2>DUNKS: {dunks22}</h2>
              </div>
              <div>
                <h2>ASSISTS: {assist22}</h2>
              </div>
              <div>
                <h2>STEALS: {steals22}</h2>
              </div>
              <div>
                <h2>BLOCKS: {blocks22}</h2>
              </div>
              <div>
                <h2>REBNDS: {reb22}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
};

export default Verses;
