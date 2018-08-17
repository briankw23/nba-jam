import React from 'react';
import { Link } from 'react-router-dom';
import teamsRequest from '../../firebaseRequests/teams';
import authRequest from '../../firebaseRequests/auth';
import playersRequest from '../../firebaseRequests/players';
import Roster from '../Roster/Roster';
import { Button, Modal} from 'react-bootstrap';

import './MyTeam.css';

class MyTeam extends React.Component {
  state = {
    myTeam: [],
    roster: [],
    updateTeam: {},
    show: false,
  };

  componentDidMount () {
    teamsRequest
      .getRequestOneTeam(authRequest.getUid())
      .then(myTeam => {
        this.setState({ myTeam });
        const id = this.state.myTeam[0].id;
        playersRequest.getRequestRoster(id).then(roster => {
          this.setState({ roster });
          console.error(roster);
        });
      })
      .catch(err => {
        console.error('error getting teams', err);
      });
  }

  redirectToMyTeam = () => {
    teamsRequest
      .getRequestOneTeam(authRequest.getUid())
      .then(myTeam => {
        this.setState({ myTeam });
        const id = this.state.myTeam[0].id;
        playersRequest.getRequestRoster(id).then(roster => {
          this.setState({ roster });
          console.error(roster);
        });
      })
      .catch(err => {
        console.error('error getting teams', err);
      });
  };

  handleClose = () => {
    this.setState({show: false });
  }

  handleShow = () => {
    this.setState({updateTeam: this.state.myTeam[0]});
    this.setState({show: true });
  }

  formFieldStateString = (name, e) => {
    const currentTeam = {...this.state.updateTeam};
    currentTeam[name] = e.target.value;
    this.setState({ updateTeam: currentTeam});
  }

  formFieldStateNumber = (name, e) => {
    const currentTeam = {...this.state.updateTeam};
    currentTeam[name] = e.target.value * 1;
    this.setState({ updateTeam: currentTeam});
  }

  nameChange = (e) => {
    this.formFieldStateString('name', e);
  }

  imageChange = (e) => {
    this.formFieldStateString('image', e);
  }
  confChange = (e) => {
    this.formFieldStateNumber('conf', e);
  }

  updateTeamClick = (e, idz) => {
    console.error (e, 'clicked update');
    const firebaseId = idz;
    console.error(firebaseId);
    teamsRequest
      .putRequest(firebaseId, this.state.updateTeam)
      .then(() => {
        this.redirectToMyTeam();
      })
      .catch((err) => {
        console.error('error with update team', err);
      });
  };

  deleteTeamClick = (e, idz) => {
    console.error (e, 'clicked delete');
    const firebaseId = idz;
    console.error(firebaseId);
    teamsRequest
      .deleteRequest(firebaseId)
      .then(() => {
        this.redirectToMyTeam();
      })
      .catch((err) => {
        console.error('error with delete team', err);
      });
  };

  render () {
    const myTeam = this.state.myTeam.map(team => {
      return (
        <div>
          <Button
            className="col-lg-6 col-lg-offset-3  teamCard"
            // bsStyle="primary"
            bsSize="large"
            key={team.id}
            onClick={this.handleShow}
          >
            <div className="row teamCardButton" key={team.id}>
              <div>
                <div className="">
                  <img src={team.image} alt="..."/>
                  <div >
                    <h3 className="myTeam">{team.name}</h3>
                  </div>
                </div>
              </div>
            </div>
          </Button>
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Player Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form action="" onSubmit={this.submitPlayerEvent}>
                <div className="form-group">
                  <label> Team Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Team Name"
                    defaultValue={this.state.myTeam[0].name}
                    onChange={this.nameChange}
                  />
                </div>
                <div className="form-group">
                  <label> Team Image:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="image"
                    placeholder="Image URL"
                    defaultValue={this.state.myTeam[0].image}
                    onChange={this.imageChange}
                  />
                </div>
                <div className="form-group">
                  <label>Conference</label>
                  <input
                    type="number"
                    className="form-control"
                    id="conf"
                    placeholder="0 to 100"
                    defaultValue={this.state.myTeam[0].confId}
                    onChange={this.confChange}
                  />
                </div>
                <div onClick={this.handleClose}>
                  <button type="button" onClick={(e) => this.updateTeamClick(e, team.id)} className="btn btn-success">
                    Update
                  </button>
                </div>

                <div onClick={this.handleClose}>
                  <button type="button" onClick={(e) => this.deleteTeamClick(e, team.id)} className="btn btn-success">
                    Delete
                  </button>
                </div>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.handleClose}>Close</Button>
            </Modal.Footer>
          </Modal>
        </div>
      );
    });
    const rosterComponents = this.state.roster.map(player => {
      return (
        <Roster
          redirectToMyTeam= {this.redirectToMyTeam}
          key={player.id}
          index={player.id}
          details= {player}
        />
      );
    });

    const speed = {
      width: `99%`,
    };
    const threePointer = {
      width: `76%`,
    };
    const dunks = {
      width: `45%`,
    };
    const defense = {
      width: `95%`,
    };
    const image = 'http://dc-52097-1700323097.us-east-1.elb.amazonaws.com/sites/default/files//imagefield_default_images/blank-profile-md.png';
    return (
      <div className="container-fluid">
        <div className="row">
          <button>
            <Link to="/createTeam">Create Team</Link>
          </button>
        </div>
        <div className="row">
          {myTeam}
        </div>

        <div className="row">
          <h3 className="roster">ROSTER</h3>
        </div>

        <div className="row" >
          <div className="createPlayerSection col-lg-3">
            <Button
              className="rosterItem"
            >
              <Link to="/createPlayer">
                <div class="">
                  <div class="rosterItemBody">
                    <div class="">
                      <img src={image} alt="..."/>
                      <div class="rosterItemName">
                        <h3>CREATE A PLAYER</h3>
                      </div>
                      <div>
                        <div className="progress">
                          <div className="progress-bar" role="progressbar" aria-valuenow="99" aria-valuemin="0" aria-valuemax="100" style={speed}>
                            <span className="rosterItemSkills">SPEED</span>
                          </div>
                        </div>
                        <div className="progress">
                          <div className="progress-bar" role="progressbar" aria-valuenow="76" aria-valuemin="0" aria-valuemax="100" style={threePointer}>
                            <span className="rosterItemSkills">3 PRTS</span>
                          </div>
                        </div>
                        <div className="progress">
                          <div className="progress-bar" role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" style={dunks}>
                            <span className="rosterItemSkills">DUNKS</span>
                          </div>
                        </div>
                        <div className="progress">
                          <div className="progress-bar" role="progressbar" aria-valuenow="95" aria-valuemin="0" aria-valuemax="100" style={defense}>
                            <span className="rosterItemSkills">DEF</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </Button>
          </div>

          <div className="col-lg-9">
            {rosterComponents}
          </div>
        </div>
      </div>
    );
  }
}

export default MyTeam;
