import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import playersRequest from '../../firebaseRequests/players';
import './Roster.css';

const defaultPlayer = {
  name: '',
  defense: '',
  dunks: '',
  image: '',
  speed: '',
  starter: false,
  teamId: '',
  threePointer: '',
};

class Roster extends React.Component {
  state = {
    updatePlayer: defaultPlayer,
    show: false,
  }

  playerClickEvent = (e, idz) => {
    console.error('player clicked', idz);
    playersRequest
      .getRequestSinglePlayer(idz)
      .then(player => {
        this.setState({ updatePlayer: player });
        console.error(player);
      })
      .catch(err => {
        console.error('error getting single player', err);
      });
  };

  updatePlayerClick = (e, idz) => {
    console.error (e, 'clicked update');
    const firebaseId = idz;
    console.error(firebaseId);
    playersRequest
      .putRequest(firebaseId, this.state.updatePlayer)
      .then(() => {
        this.props.redirectToMyTeam();
      })
      .catch((err) => {
        console.error('error with update player', err);
      });
  };

  deletePlayerClick = (e, idz) => {
    console.error (e, 'clicked delete');
    const firebaseId = idz;
    console.error(firebaseId);
    playersRequest
      .deleteRequest(firebaseId)
      .then(() => {
        this.props.redirectToMyTeam();
      })
      .catch((err) => {
        console.error('error with delete player', err);
      });
  };

  handleClose = () => {
    this.setState({show: false });
  }

  handleShow = () => {
    this.setState({show: true });
  }

  formFieldStateString = (name, e) => {
    const currentPlayer = {...this.state.updatePlayer};
    currentPlayer[name] = e.target.value;
    this.setState({ updatePlayer: currentPlayer});
  }

  formFieldStateNumber = (name, e) => {
    const currentPlayer = {...this.state.updatePlayer};
    currentPlayer[name] = e.target.value * 1;
    this.setState({ updatePlayer: currentPlayer});
  }

  nameChange = (e) => {
    this.formFieldStateString('name', e);
  }

  imageChange = (e) => {
    this.formFieldStateString('image', e);
  }

  defenseChange = (e) => {
    this.formFieldStateNumber('defense', e);
  }

  dunksChange = (e) => {
    this.formFieldStateNumber('dunks', e);
  }

  speedChange = (e) => {
    this.formFieldStateNumber('speed', e);
  }

  threePointerChange = (e) => {
    this.formFieldStateNumber('threePointer', e);
  }

  render () {
    const { details } = this.props;
    const speed = {
      width: `${details.speed}%`,
    };
    const threePointer = {
      width: `${details.threePointer}%`,
    };
    const dunks = {
      width: `${details.dunks}%`,
    };
    const defense = {
      width: `${details.defense}%`,
    };
    return (
      <div>
        <div>
          <div onClick={(e) => this.playerClickEvent(e, details.id)}>
            <Button
              bsStyle=""
              bsSize="large"
              key={details.id}
              onClick={this.handleShow}
              className="rosterItem col-lg-3"
            >
              <div class="">
                <div class="rosterItemBody">
                  <div class="">
                    <img src={details.image} alt="..."/>
                    <div class="rosterItemName">
                      <h3>{details.name}</h3>
                    </div>
                    <div>
                      <div className="progress">
                        <div className="progress-bar" role="progressbar" aria-valuenow={details.speed} aria-valuemin="0" aria-valuemax="100" style={speed}>
                          <span className="rosterItemSkills">SPEED</span>
                        </div>
                      </div>
                      <div className="progress">
                        <div className="progress-bar" role="progressbar" aria-valuenow={details.threePointer} aria-valuemin="0" aria-valuemax="100" style={threePointer}>
                          <span className="rosterItemSkills">3 PRTS</span>
                        </div>
                      </div>
                      <div className="progress">
                        <div className="progress-bar" role="progressbar" aria-valuenow={details.dunks} aria-valuemin="0" aria-valuemax="100" style={dunks}>
                          <span className="rosterItemSkills">DUNKS</span>
                        </div>
                      </div>
                      <div className="progress">
                        <div className="progress-bar" role="progressbar" aria-valuenow={details.defense} aria-valuemin="0" aria-valuemax="100" style={defense}>
                          <span className="rosterItemSkills">DEF</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <Media className="rosterItemBody" >
                <Media.Left>
                  <img width={64} height={64} src={details.image} alt="thumbnail" />
                </Media.Left>
                <Media.Body>
                  <Media.Heading>{details.name}</Media.Heading>
                </Media.Body>
              </Media> */}
            </Button>
          </div>
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Player Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form action="" onSubmit={this.submitPlayerEvent}>
                <div className="form-group">
                  <label>Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    defaultValue={this.state.updatePlayer.name}
                    onChange={this.nameChange}
                  />
                </div>
                <div className="form-group">
                  <label>Image:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="image"
                    placeholder="Image URL"
                    defaultValue={this.state.updatePlayer.image}
                    onChange={this.imageChange}
                  />
                </div>
                <div className="form-group">
                  <label>Defense:</label>
                  <input
                    type="number"
                    className="form-control"
                    id="defense"
                    placeholder="0 to 100"
                    defaultValue={this.state.updatePlayer.defense}
                    onChange={this.defenseChange}
                  />
                </div>
                <div className="form-group">
                  <label>Dunks:</label>
                  <input
                    type="number"
                    className="form-control"
                    id="dunks"
                    placeholder="0 to 100"
                    defaultValue={this.state.updatePlayer.dunks}
                    onChange={this.dunksChange}
                  />
                </div>
                <div className="form-group">
                  <label>Speed:</label>
                  <input
                    type="number"
                    className="form-control"
                    id="speed"
                    placeholder="0 to 100"
                    defaultValue={this.state.updatePlayer.speed}
                    onChange={this.speedChange}
                  />
                </div>
                <div className="form-group">
                  <label>Three Pointers:</label>
                  <input
                    type="number"
                    className="form-control"
                    id="threePointer"
                    placeholder="0 to 100"
                    defaultValue={this.state.updatePlayer.threePointer}
                    onChange={this.threePointerChange}
                  />
                </div>
                <div onClick={this.handleClose}>
                  <button type="button" onClick={(e) => this.updatePlayerClick(e, details.id)} className="btn btn-success">
                    Update
                  </button>
                </div>

                <div onClick={this.handleClose}>
                  <button type="button" onClick={(e) => this.deletePlayerClick(e, details.id)} className="btn btn-success">
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
      </div>
    );
  }
}

export default Roster;
