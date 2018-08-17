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
            className="col-lg-6 teamCard"
            // bsStyle="primary"
            bsSize="large"
            key={team.id}
            onClick={this.handleShow}
          >
            <div className="row teamCardButton" key={team.id}>
              <div>
                <div className="">
                  <img src={team.image} alt="..."/>
                  <div className="caption">
                    <h3>{team.name}</h3>
                  </div>
                </div>
              </div>
            </div>
          </Button>
          <button>
            <Link to="/createPlayer">Create Player</Link>
          </button>

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
    return (
      <div className="container-fluid">
        <button>
          <Link to="/createTeam">Create Team</Link>
        </button>
        {/* <button>
          <Link to="/createPlayer">Create Player</Link>
        </button> */}
        <div className="col-lg-12">
          {myTeam}
        </div>
        <div>
        </div>
        <div>{rosterComponents}</div>
      </div>
    );
  }
}

export default MyTeam;
