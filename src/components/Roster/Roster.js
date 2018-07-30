import React from "react";
import { Panel, Button, Modal } from "react-bootstrap";
// import playersRequest from "../../firebaseRequests/players";

class Roster extends React.Component {
  state = {
    updatePlayer: {},
    show: false,
  }
  handleClose = () => {
    this.setState({show: false });
  }

  handleShow = () => {
    this.setState({show: true });
  }

  playerSelectEvent = (id) => {
    this.setState({playerId: id});
  };
  formFieldStateString = (name, e) => {
    const tempPlayer = {...this.state.newPlayer};
    tempPlayer[name] = e.target.value;
    this.setState({ updatePlayer: tempPlayer});
  }

  formFieldStateNumber = (name, e) => {
    const tempPlayer = {...this.state.newPlayer};
    tempPlayer[name] = e.target.value * 1;
    this.setState({ updatePlayer: tempPlayer});
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
    return (
      <div>
        {/* // Button and Modal for Player */}
        <div>
          <Button
            bsStyle="primary"
            bsSize="large"
            key={details.id}
            onClick={this.handleShow}
          >
            <img className="media-object" src={details.image} alt="..." />
            <h4 className="media-heading">{details.name}</h4>
          </Button>

          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form action="" onSubmit={this.submitPlayerEvent}>
                <div className="form-group">
                  <label>Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    defaultValue={details.name}
                    // value= { player.name }
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
                    defaultValue={details.image}
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
                    defaultValue={details.defense}
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
                    defaultValue={details.dunks}
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
                    defaultValue={details.speed}
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
                    defaultValue={details.threePointer}
                    onChange={this.threePointerChange}
                  />
                </div>
                <button type="submit" className="btn btn-success">
                  Update
                </button>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.handleClose}>Close</Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>

      // <div>
      //   <Button>
      //     <Panel>
      //       <Panel.Body>
      //         <img className="media-object" src={details.image} alt="..." />
      //         <h4 className="media-heading">{details.name}</h4>
      //       </Panel.Body>
      //     </Panel>
      //   </Button>
      // </div>
    );
  }
}

export default Roster;
