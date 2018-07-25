import React from 'react';

import playersRequest from '../../firebaseRequests/players';
import teamsRequest from '../../firebaseRequests/teams';
import authRequest from '../../firebaseRequests/auth';

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

class CreatePlayer extends React.Component {
  state = {
    newPlayer: defaultPlayer,
    myTeam: [],
  }
  componentDidMount () {
    teamsRequest
      .getRequestOneTeam(authRequest.getUid())
      .then((myTeam) => {
        this.setState({ myTeam });
        console.error(myTeam);
      })
      .catch((err) => {
        console.error('error getting teams');
      });
  }

  submitPlayerEvent = (e) => {
    const newPlayer = this.state.newPlayer;
    newPlayer.teamId = this.state.myTeam[0].id;
    e.preventDefault();
    playersRequest
      .postRequest(newPlayer)
      .then(() => {
        this.props.history.push('/myTeam');
      })
      .catch((err) => {
        console.error('error with post player', err);
      });
  }

  formFieldStateString = (name, e) => {
    const tempPlayer = {...this.state.newPlayer};
    tempPlayer[name] = e.target.value;
    this.setState({ newPlayer: tempPlayer});
  }

  formFieldStateNumber = (name, e) => {
    const tempPlayer = {...this.state.newPlayer};
    tempPlayer[name] = e.target.value * 1;
    this.setState({ newPlayer: tempPlayer});
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
    const { newPlayer } = this.state;
    return (
      <div className="CreatePlayer">
        <h1>Create Player</h1>
        <form action="" onSubmit={this.submitPlayerEvent} >
          <div className="form-group">
            <label for="">Name:</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Player Name"
              value= { newPlayer.name }
              onChange = { this.nameChange }
            />
          </div>
          <div className="form-group">
            <label for="">Image:</label>
            <input type="text"
              className="form-control"
              id="image"
              placeholder="Image URL"
              value= { newPlayer.image }
              onChange = { this.imageChange }
            />
          </div>
          <div className="form-group">
            <label for="">Defense:</label>
            <input type="number"
              className="form-control"
              id="defense"
              placeholder="0 to 100"
              value= { newPlayer.defense }
              onChange = { this.defenseChange }
            />
          </div>
          <div className="form-group">
            <label for="">Dunks:</label>
            <input type="number"
              className="form-control"
              id="dunks"
              placeholder="0 to 100"
              value= { newPlayer.dunks }
              onChange = { this.dunksChange }
            />
          </div>
          <div className="form-group">
            <label for="">Speed:</label>
            <input type="number"
              className="form-control"
              id="speed"
              placeholder="0 to 100"
              value= { newPlayer.speed }
              onChange = { this.speedChange}
            />
          </div>
          <div className="form-group">
            <label for="">Three Pointers:</label>
            <input type="number"
              className="form-control"
              id="threePointer"
              placeholder="0 to 100"
              value= { newPlayer.threePointer }
              onChange = { this.threePointerChange }
            />
          </div>
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </form>
      </div>
    );
  }
};

export default CreatePlayer;
