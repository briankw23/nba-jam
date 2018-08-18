import React from 'react';

import teamsRequest from '../../firebaseRequests/teams';
import playersRequest from '../../firebaseRequests/players';
import { Link } from 'react-router-dom';

import { Button, Modal, ListGroup, ListGroupItem } from 'react-bootstrap';

import './Home.css';
// import PlayerOne from '../PlayerOne/PlayerOne';
// import PlayerTwo from '../PlayerTwo/PlayerTwo';

class Home extends React.Component {
  state = {
    teams: [],
    playerOneRoster: [],
    playerTwoRoster: [],
    playerOneTeamImage: 'team30',
    playerTwoTeamImage: 'team30',
    playerInContext: 1,
    teamClickOn: '',
    // teamSelectOne: false,
    // teamSelectTwo: false,
    showOne: false,
    showTwo: false,
    pOneStarterOne: [],
    pOneStarterTwo: [],
    pTwoStarterOne: [],
    pTwoStarterTwo: [],
  };

  componentDidMount () {
    teamsRequest
      .getRequest()
      .then(teams => {
        this.setState({ teams });
      })
      .catch(err => {
        console.error(err, 'error getting teams');
      });
  }

  handleCloseOne = () => {
    this.setState({showOne: false });
  }

  handleCloseTwo = () => {
    this.setState({showTwo: false });
  }

  handleShowOne = (e, id) => {
    this.setState({showOne: true });
    this.teamClickEvent(e, id);
  }

  handleShowTwo = (e, id) => {
    this.setState({showTwo: true });
    this.teamClickEvent(e, id);
  }

  teamClickEvent = (e, id) => {
    console.error(id);
    playersRequest
      .getRequestRoster(id)
      .then(roster => {
        this.state.playerInContext === 1
          ? this.setState({ playerOneRoster: roster })
          : this.setState({ playerTwoRoster: roster });
        this.setState({ teamClickOn: id });

        this.state.playerInContext === 1 ? this.setState({ playerOneTeamImage: id }) : this.setState({ playerTwoTeamImage: id });
        // this.state.playerInContext === 1 ? this.setState({ teamSelectOne: true }) : this.setState({ teamSelectTwo: true });
        this.state.playerInContext === 1 ? this.setState({ pOneStarterOne: []}) : this.setState({ pTwoStarterOne: []});
        this.state.playerInContext === 1 ? this.setState({ pOneStarterTwo: []}) : this.setState({ pTwoStarterTwo: []});
      })
      .catch(err => {
        console.error('error getting teams', err);
      });
  };
  // test
  // teamClickEventOne = (e, id) => {
  //   console.error(id);
  //   playersRequest
  //     .getRequestRoster(id)
  //     .then(roster => {
  //       this.state.playerInContext === 1
  //         ? this.setState({ playerOneRoster: roster })
  //         : this.setState({ playerOneRoster: roster });
  //       this.setState({ teamClickOn: id });

  //       this.state.playerInContext === 1 ? this.setState({ playerOneTeamImage: id }) : this.setState({ playerOneTeamImage: id });
  //       // this.state.playerInContext === 1 ? this.setState({ pOneStarterOne: []}) : this.setState({ pTwoStarterOne: []});
  //       // this.state.playerInContext === 1 ? this.setState({ pOneStarterTwo: []}) : this.setState({ pTwoStarterTwo: []});
  //     })
  //     .catch(err => {
  //       console.error('error getting teams', err);
  //     });
  // };

  playerOneInContext = () => {
    this.setState({ playerInContext: 1 });
  };
  playerTwoInContext = () => {
    this.setState({ playerInContext: 2 });
  };

  pOneStarterOne = (player) => {
    this.setState({pOneStarterOne: player});
  };
  pOneStarterTwo = (player) => {
    this.setState({pOneStarterTwo: player});
  };

  pTwoStarterOne = (player) => {
    this.setState({pTwoStarterOne: player});
  };
  pTwoStarterTwo = (player) => {
    this.setState({pTwoStarterTwo: player});
  };

  render () {
    // const teamsComponents = this.state.teams.map((team) => {
    //   return (
    //     <li className="Teams col-sm-3" key={team.id} index={team.id}>{team.name}</li>
    //   );
    // });

    const playerOneComponents = this.state.playerOneRoster.map(player => {
      return (
        <ListGroup>
          <ListGroupItem>
            <div className="container-fluid">
              <div className="row">
                <div className="col-sm-12">
                  <img className="playerImage" src={player.image} alt="player"/>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6">
                  <h5>{player.name}</h5>
                </div>
                <div className="col-sm-6">
                  <button
                    onClick={e => this.pOneStarterOne(player.id)}
                  >Starter 1
                  </button>
                  <button
                    onClick={e => this.pOneStarterTwo(player.id)}
                  >Starter 2
                  </button>
                </div>
              </div>
            </div>
          </ListGroupItem>
        </ListGroup>
      );
    });
    const playerOneTeamLogo = this.state.teams.filter((team) => {
      return team.id === this.state.playerOneTeamImage;
    }).map((team) => {
      return (
        <div className="row" key={team.id}>
          <div className="col-sm-12">
            <div className="thumbnail">
              <img className="teamCardImage" src={team.image} alt="..."/>
            </div>
          </div>
        </div>
      );
    });

    const pOneStarterOneImage = this.state.playerOneRoster.filter((player) => {
      return player.id === this.state.pOneStarterOne;
    }).map((player) => {
      return (
        <div>
          <img className="playerCardImage" src={player.image} alt="imageofplayer"/>
          <h4 className="skills">{player.name}</h4>
        </div>
      );
    });

    const pOneStarterTwoImage = this.state.playerOneRoster.filter((player) => {
      return player.id === this.state.pOneStarterTwo;
    }).map((player) => {
      return (
        <div>
          <img className="playerCardImage" src={player.image} alt="imageofplayer"/>
          <h4 className="skills">{player.name}</h4>
        </div>
      );
    });

    const pOneStarterOneSkills = this.state.playerOneRoster.filter((player) => {
      return player.id === this.state.pOneStarterOne;
    }).map((player) => {
      const speed = {
        width: `${player.speed}%`,
      };
      const threePointer = {
        width: `${player.threePointer}%`,
      };
      const dunks = {
        width: `${player.dunks}%`,
      };
      const defense = {
        width: `${player.defense}%`,
      };

      return (
        <div>
          <div class="progress">
            <div class="progress-bar" role="progressbar" aria-valuenow={player.speed} aria-valuemin="0" aria-valuemax="100" style={speed}>
              <span class="sr-only">60% Complete</span>
            </div>
          </div>
          <div class="progress">
            <div class="progress-bar" role="progressbar" aria-valuenow={player.threePointer} aria-valuemin="0" aria-valuemax="100" style={threePointer}>
              <span class="sr-only">60% Complete</span>
            </div>
          </div>
          <div class="progress">
            <div class="progress-bar" role="progressbar" aria-valuenow={player.dunks} aria-valuemin="0" aria-valuemax="100" style={dunks}>
              <span class="sr-only">60% Complete</span>
            </div>
          </div>
          <div class="progress">
            <div class="progress-bar" role="progressbar" aria-valuenow={player.defense} aria-valuemin="0" aria-valuemax="100" style={defense}>
              <span class="sr-only">60% Complete</span>
            </div>
          </div>
          {/* <ProgressBar bsStyle="progress-bar" now={player.speed}/>
          <ProgressBar now={player.threePointer}/>
          <ProgressBar now={player.dunks}/>
          <ProgressBar now={player.defense}/> */}
        </div>
      );
    });

    const pOneStarterTwoSkills = this.state.playerOneRoster.filter((player) => {
      return player.id === this.state.pOneStarterTwo;
    }).map((player) => {
      const speed = {
        width: `${player.speed}%`,
      };
      const threePointer = {
        width: `${player.threePointer}%`,
      };
      const dunks = {
        width: `${player.dunks}%`,
      };
      const defense = {
        width: `${player.defense}%`,
      };

      return (
        <div>
          <div class="progress">
            <div class="progress-bar" role="progressbar" aria-valuenow={player.speed} aria-valuemin="0" aria-valuemax="100" style={speed}>
              <span class="sr-only">60% Complete</span>
            </div>
          </div>
          <div class="progress">
            <div class="progress-bar" role="progressbar" aria-valuenow={player.threePointer} aria-valuemin="0" aria-valuemax="100" style={threePointer}>
              <span class="sr-only">60% Complete</span>
            </div>
          </div>
          <div class="progress">
            <div class="progress-bar" role="progressbar" aria-valuenow={player.dunks} aria-valuemin="0" aria-valuemax="100" style={dunks}>
              <span class="sr-only">60% Complete</span>
            </div>
          </div>
          <div class="progress">
            <div class="progress-bar" role="progressbar" aria-valuenow={player.defense} aria-valuemin="0" aria-valuemax="100" style={defense}>
              <span class="sr-only">60% Complete</span>
            </div>
          </div>
          {/* <ProgressBar bsStyle="progress-bar" now={player.speed}/>
          <ProgressBar now={player.threePointer}/>
          <ProgressBar now={player.dunks}/>
          <ProgressBar now={player.defense}/> */}
        </div>
      );
    });

    const pOneStarterOnePanel = this.state.playerOneRoster.filter((player) => {
      return player.id === this.state.pOneStarterOne;
    }).map((player) => {
      return (
        <div className="col-sm-12">
          <div>
            <div className="thumbnail">
              <img src={player.image} alt="..."/>
              <div className="caption">
                <h5>{player.name}</h5>
              </div>
            </div>
          </div>
        </div>
      );
    });

    const pOneStarterTwoPanel = this.state.playerOneRoster.filter((player) => {
      return player.id === this.state.pOneStarterTwo;
    }).map((player) => {
      return (
        <div className="col-sm-12">
          <div>
            <div className="thumbnail">
              <img src={player.image} alt="..."/>
              <div className="caption">
                <h5>{player.name}</h5>
              </div>
            </div>
          </div>
        </div>
      );
    });

    const pTwoStarterOnePanel = this.state.playerTwoRoster.filter((player) => {
      return player.id === this.state.pTwoStarterOne;
    }).map((player) => {
      return (
        <div className="col-sm-12">
          <div>
            <div className="thumbnail">
              <img src={player.image} alt="..."/>
              <div className="caption">
                <h5>{player.name}</h5>
              </div>
            </div>
          </div>
        </div>
      );
    });

    const pTwoStarterTwoPanel = this.state.playerTwoRoster.filter((player) => {
      return player.id === this.state.pTwoStarterTwo;
    }).map((player) => {
      return (
        <div className="col-sm-12">
          <div>
            <div className="thumbnail">
              <img src={player.image} alt="..."/>
              <div className="caption">
                <h5>{player.name}</h5>
              </div>
            </div>
          </div>
        </div>
      );
    });

    const pTwoStarterOneSkills = this.state.playerTwoRoster.filter((player) => {
      return player.id === this.state.pTwoStarterOne;
    }).map((player) => {
      const speed = {
        width: `${player.speed}%`,
      };
      const threePointer = {
        width: `${player.threePointer}%`,
      };
      const dunks = {
        width: `${player.dunks}%`,
      };
      const defense = {
        width: `${player.defense}%`,
      };

      return (
        <div>
          <div className="progress">
            <div className="progress-bar" role="progressbar" aria-valuenow={player.speed} aria-valuemin="0" aria-valuemax="100" style={speed}>
              <span className="sr-only">60% Complete</span>
            </div>
          </div>
          <div className="progress">
            <div className="progress-bar" role="progressbar" aria-valuenow={player.threePointer} aria-valuemin="0" aria-valuemax="100" style={threePointer}>
              <span className="sr-only">60% Complete</span>
            </div>
          </div>
          <div className="progress">
            <div className="progress-bar" role="progressbar" aria-valuenow={player.dunks} aria-valuemin="0" aria-valuemax="100" style={dunks}>
              <span className="sr-only">60% Complete</span>
            </div>
          </div>
          <div className="progress">
            <div className="progress-bar" role="progressbar" aria-valuenow={player.defense} aria-valuemin="0" aria-valuemax="100" style={defense}>
              <span className="sr-only">60% Complete</span>
            </div>
          </div>
          {/* <ProgressBar bsStyle="progress-bar" now={player.speed}/>
          <ProgressBar now={player.threePointer}/>
          <ProgressBar now={player.dunks}/>
          <ProgressBar now={player.defense}/> */}
        </div>
      );
    });

    const pTwoStarterTwoSkills = this.state.playerTwoRoster.filter((player) => {
      return player.id === this.state.pTwoStarterTwo;
    }).map((player) => {
      const speed = {
        width: `${player.speed}%`,
      };
      const threePointer = {
        width: `${player.threePointer}%`,
      };
      const dunks = {
        width: `${player.dunks}%`,
      };
      const defense = {
        width: `${player.defense}%`,
      };

      return (
        <div>
          <div class="progress">
            <div class="progress-bar" role="progressbar" aria-valuenow={player.speed} aria-valuemin="0" aria-valuemax="100" style={speed}>
              <span class="sr-only">60% Complete</span>
            </div>
          </div>
          <div class="progress">
            <div class="progress-bar" role="progressbar" aria-valuenow={player.threePointer} aria-valuemin="0" aria-valuemax="100" style={threePointer}>
              <span class="sr-only">60% Complete</span>
            </div>
          </div>
          <div class="progress">
            <div class="progress-bar" role="progressbar" aria-valuenow={player.dunks} aria-valuemin="0" aria-valuemax="100" style={dunks}>
              <span class="sr-only">60% Complete</span>
            </div>
          </div>
          <div class="progress">
            <div class="progress-bar" role="progressbar" aria-valuenow={player.defense} aria-valuemin="0" aria-valuemax="100" style={defense}>
              <span class="sr-only">60% Complete</span>
            </div>
          </div>
          {/* <ProgressBar bsStyle="progress-bar" now={player.speed}/>
          <ProgressBar now={player.threePointer}/>
          <ProgressBar now={player.dunks}/>
          <ProgressBar now={player.defense}/> */}
        </div>
      );
    });

    const pTwoStarterOneImage = this.state.playerTwoRoster.filter((player) => {
      return player.id === this.state.pTwoStarterOne;
    }).map((player) => {
      return (
        <div>
          <img className="playerCardImage" src={player.image} alt="imageofplayer"/>
          <h4 className="skills">{player.name}</h4>
        </div>
      );
    });

    const pTwoStarterTwoImage = this.state.playerTwoRoster.filter((player) => {
      return player.id === this.state.pTwoStarterTwo;
    }).map((player) => {
      return (
        <div>
          <img className="playerCardImage" src={player.image} alt="imageofplayer"/>
          <h4 className="skills">{player.name}</h4>
        </div>
      );
    });

    // const playerTwoCards = this.state.playerTwoRoster.filter((player) => {
    //   return player.starter === true;
    // }).map((player) => {
    //   return (
    //     <div className="row">
    //       <div className="col-sm-3">
    //         <div className="thumbnail">
    //           <img src={player.image} alt="player imaghe"/>
    //           <div className="caption">
    //             <h3>{player.name}</h3>
    //             <ProgressBar now={player.speed}  label={`SPEED`} />
    //             <ProgressBar now={player.threePointer}  label={`3 PTRS`} />
    //             <ProgressBar now={player.dunks}  label={`DUNKS`} />
    //             <ProgressBar now={player.defense}  label={`DEF`} />
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   );
    // });

    const playerTwoTeamLogo = this.state.teams.filter((team) => {
      return team.id === this.state.playerTwoTeamImage;
    }).map((team) => {
      return (
        <div className="row" key={team.id}>
          <div className="col-sm-12">
            <div className="thumbnail">
              <img className="teamCardImage" src={team.image} alt="..."/>
            </div>
          </div>
        </div>
      );
    });

    const playerTwoComponents = this.state.playerTwoRoster.map(player => {
      return (
        <ListGroup>
          <ListGroupItem>
            <div className="container-fluid">
              <div className="row">
                <div className="col-sm-12">
                  <img className="playerImage" src={player.image} alt="player"/>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6">
                  <h5>{player.name}</h5>
                </div>
                <div className="col-sm-6">
                  <button
                    onClick={e => this.pTwoStarterOne(player.id)}
                  >Starter 1
                  </button>
                  <button
                    onClick={e => this.pTwoStarterTwo(player.id)}
                  >Starter 2
                  </button>
                </div>
              </div>
            </div>
          </ListGroupItem>
        </ListGroup>
        // <ListGroup>
        //   <ListGroupItem>
        //     <div className="row">
        //       <div className="col-sm-2">
        //         <img className="playerImage" src={player.image} alt="player"/>
        //       </div>
        //       <div className="col-sm-6">
        //         <h5>{player.name}</h5>
        //       </div>
        //       <div className="col-sm-4">
        //         <button
        //           onClick={e => this.pTwoStarterOne(player.id)}
        //         >Starter 1
        //         </button>
        //         <button
        //           onClick={e => this.pTwoStarterTwo(player.id)}
        //         >Starter 2
        //         </button>
        //       </div>
        //     </div>
        //   </ListGroupItem>
        // </ListGroup>
      );
    });

    const eastComponents = this.state.teams
      .filter(team => {
        return team.confId === 0;
      })
      .map(team => {
        return (
          <div>
            <Button
              className="col-md-6 teamButton"
              // onClick={e => this.teamClickEvent(e, team.id)}
              key={team.id}
              onClick={e => this.handleShowOne(e, team.id)}
            >
              <li className="Teams col-sm-2" key={team.id} index={team.id}>
                <h4 className="eastTeamNames">{team.name}</h4>
              </li>
            </Button>
            <Modal show={this.state.showOne} onHide={this.handleCloseOne}>
              <Modal.Header closeButton>
                <Modal.Title>Roster</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Button onClick={this.handleCloseOne}>Close</Button>
                <div className="row">
                  <div className="col-sm-8">
                    {playerOneComponents}
                  </div>
                  <div className="col-sm-4">
                    <h6>Starter One:</h6>
                    {pOneStarterOnePanel}
                    <h6>Starter Two:</h6>
                    {pOneStarterTwoPanel}
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={this.handleCloseOne}>Close</Button>
              </Modal.Footer>
            </Modal>
          </div>
        );
      });

    const westComponents = this.state.teams
      .filter(team => {
        return team.confId === 1;
      })
      .map(team => {
        return (
          <div>
            <Button
              className="col-md-6 teamButton"
              // onClick={e => this.teamClickEvent(e, team.id)}
              key={team.id}
              onClick={e => this.handleShowTwo(e, team.id)}
            >
              <li className="Teams col-sm-2" key={team.id} index={team.id}>
                <h4 className="eastTeamNames">{team.name}</h4>
              </li>
            </Button>
            <Modal show={this.state.showTwo} onHide={this.handleCloseTwo}>
              <Modal.Header closeButton>
                <Modal.Title>Roster</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Button onClick={this.handleCloseTwo}>Close</Button>
                <div className="row">
                  <div className="col-sm-8">
                    {playerTwoComponents}
                  </div>
                  <div className="col-sm-4">
                    <h6>Starter One:</h6>
                    {pTwoStarterOnePanel}
                    <h6>Starter Two:</h6>
                    {pTwoStarterTwoPanel}
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={this.handleCloseTwo}>Close</Button>
              </Modal.Footer>
            </Modal>
          </div>
        );
      });
    return (
      // Root Div
      <div className="container-fluid">
        {/* Top Section */}
        <div className="row top">
          {/* East Banner */}
          <div className="col-lg-1">
            <h2 className="East">East</h2>
          </div>
          {/* East Teams */}
          <div className="col-lg-5">
            {eastComponents}
          </div>
          {/* West Teams */}
          <div className="col-lg-5">
            {westComponents}
          </div>
          {/* West Banner */}
          <div className="col-lg-1">
            <h2 className="West">West</h2>
          </div>
        </div>
        {/* End of Top Section */}
        {/* Start of second Section */}
        <div className="row buttonsSec">
          <div className="col-lg-4">
            <Button
              className="col-sm-12 playerButton btn-success playerOneBtn"
              onClick={this.playerOneInContext}
            >
              Player 1
            </Button>
          </div>
          <div className="col-lg-4">
            <Button
              className="col-sm-12 btn-danger"
            >
              <Link
                to={{pathname: '/gameMode', state: {
                  pOneStarterOne: this.state.pOneStarterOne,
                  pOneStarterTwo: this.state.pOneStarterTwo,
                  pTwoStarterOne: this.state.pTwoStarterOne,
                  pTwoStarterTwo: this.state.pTwoStarterTwo,
                  playerOneRoster: this.state.playerOneRoster,
                  playerTwoRoster: this.state.playerTwoRoster,
                  playerOneTeamImage: this.state.playerOneTeamImage,
                  playerTwoTeamImage: this.state.playerTwoTeamImage,
                  teams: this.state.teams,
                },
                }}>
              START GAME
              </Link>
            </Button>
          </div>
          <div className="col-lg-4">
            <Button
              className="col-sm-12 playerButton btn-success"
              onClick={this.playerTwoInContext}
            >
              Player 2
            </Button>
          </div>
        </div>
        {/* End of Second Section */}
        {/* Start of Third Section */}
        {/* Left/PlayerOne/East */}
        <div className="row">
          <div className="col-lg-6 starterCard">
            <div className="row starterCardLevelOne">
              <div className="col-lg-4">{this.state.pl}{pOneStarterOneImage}</div>
              <div className="col-lg-4">
                {playerOneTeamLogo}
              </div>
              <div className="col-lg-4">{pOneStarterTwoImage}</div>
            </div>
            <div className="row starterCardLevelTwo">
              <div className="col-lg-4">
                {pOneStarterOneSkills}
              </div>
              <div className="col-lg-4 skills">
                <p>SPEED</p>
                <p>3 PTRS</p>
                <p>DUNKS</p>
                <p>DEF</p></div>
              <div className="col-lg-4">
                {pOneStarterTwoSkills}
              </div>
            </div>
          </div>
          {/* Right/PlayerTwo/West */}
          <div className="col-lg-6 starterCard">
            <div className="row starterCardLevelOne">
              <div className="col-lg-4">{pTwoStarterOneImage}</div>
              <div className="col-lg-4">{playerTwoTeamLogo}</div>
              <div className="col-lg-4">{pTwoStarterTwoImage}</div>
            </div>
            <div className="row starterCardLevelTwo">
              <div className="col-lg-4">
                {pTwoStarterOneSkills}
              </div>
              <div className="col-lg-4 skills">
                <p>SPEED</p>
                <p>3 PTRS</p>
                <p>DUNKS</p>
                <p>DEF</p></div>
              <div className="col-lg-4">
                {pTwoStarterTwoSkills}
              </div>
            </div>
          </div>
        </div>
      </div>
      // <div>
      //   <div className="container">
      //     <div className="row top">
      //       {/* East Section */}
      //       <div className="col-md-1">
      //         <h2 className="East">East</h2>
      //       </div>

      //       {/* Teams */}
      //       <div className="col-md-5">{eastComponents}</div>

      //       <div className="col-md-5">{westComponents}</div>

      //       {/* West Section */}
      //       <div className="col-md-1">
      //         <h2 className="West">West</h2>
      //       </div>
      //     </div>
      //     {/* Second Row */}
      //     <div className="row bottom">
      //       <div className="col-sm-6">
      //         <Button
      //           className="col-sm-12 playerButton btn-success playerOneBtn"
      //           onClick={this.playerOneInContext}
      //         >
      //           Player 1
      //         </Button>
      //         {/* {playerOneTeamImage} */}
      //       </div>
      //       <div className="col-sm-6">
      //         <Button
      //           className="col-sm-12 playerButton btn-success"
      //           onClick={this.playerTwoInContext}
      //         >
      //           Player 2
      //         </Button>
      //         {/* {playerTwoTeamImage} */}
      //       </div>
      //       {/* Third Row */}
      //       <div className="row">
      //         <div className="col-sm-6">
      //           {playerOneTeamLogo}
      //           {playerOneCards}
      //           {playerOneComponents}
      //         </div>

      //         <div className="col-sm-6">
      //           {playerTwoTeamLogo}
      //           {playerTwoCards}
      //           {playerTwoComponents}
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      // </div>
    );
  }
}

export default Home;
