import React from "react";
import { Link } from "react-router-dom";
import teamsRequest from "../../firebaseRequests/teams";
import authRequest from "../../firebaseRequests/auth";
import playersRequest from "../../firebaseRequests/players";
import Starters from "../Starters/Starters";
import {Modal, Button} from 'react-bootstrap';

import "./MyTeam.css";

class MyTeam extends React.Component {
  state = {
    myTeam: [],
    roster: [],
    playerId: -1,
    show: false,
  };

  handleClose = () => {
    this.setState({show: false });
  }

  handleShow = () => {
    this.setState({show: true });
  }

  playerSelectEvent = id => {
    this.setState({
      playerId: id
    });
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
        console.error("error getting teams", err);
      });
  }

  render () {
    const myTeam = this.state.myTeam.map(team => {
      return (
        <div key={team.id}>
          <h1> {team.name}</h1>
          <img src={team.image} alt="" />
        </div>
      );
    });
    const rosterComponents = this.state.roster.map(player => {
      const playerCardClickEvent = () => {
        this.playerSelectEvent(player.Id);
        // this.props.history.push(`/myTeam/${player.id}`);
      };
      return (
        // <button
        //   key={player.id}
        //   onClick={playerCardClickEvent}
        // >
        //   <div className="Roster" >
        //     <div className="media" >
        //       <div className="media-left">
        // <img className="media-object" src={player.image} alt="..." />
        // <h4 className="media-heading">{player.name}</h4>
        //       </div>
        //       <div className="media-body">

        //       </div>
        //     </div>
        //   </div>
        // </button>
        // Button and Modal for Player
        <div>
          <Button bsStyle="primary" bsSize="large"
            onClick={playerCardClickEvent}
            onClick={this.handleShow}>
            Launch demo modal
          </Button>

          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>

            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.handleClose}>Close</Button>
            </Modal.Footer>
          </Modal>
        </div>
      );
    });
    return (
      <div className="MyTeam">
        <button>
          <Link to="/createTeam">Create/Edit Team</Link>
        </button>
        <button>
          <Link to="/createPlayer">Create Player</Link>
        </button>
        <div>{myTeam}</div>
        <div>
          <Starters details={this.state.roster} />
        </div>
        <div>{rosterComponents}</div>
      </div>
    );
  }
}

export default MyTeam;
