import React from 'react';

const defaultPlayer = {
  name: '',
  defense: '',
  dunks: '',
  image: '',
  speed: '',
  starter: '',
  teamId: '',
  threePointer: '',
};

class CreatePlayer extends React.Component {
  state = {
    newPlayer: defaultPlayer,
  }

  render () {
    return (
      <div className="CreatePlayer">
        <h1>Create Player</h1>
        <form action="">
          <div className="form-group">
            <label for="">Name:</label>
            <input type="text" className="form-control" id="name" placeholder="Player Name"/>
          </div>
          <div className="form-group">
            <label for="">Image:</label>
            <input type="text" className="form-control" id="image" placeholder="Image URL"/>
          </div>
          <div className="form-group">
            <label for="">Defense:</label>
            <input type="number" className="form-control" id="defense" placeholder="0 to 100"/>
          </div>
          <div className="form-group">
            <label for="">Dunks:</label>
            <input type="number" className="form-control" id="dunks" placeholder="0 to 100"/>
          </div>
          <div className="form-group">
            <label for="">Speed:</label>
            <input type="number" className="form-control" id="speed" placeholder="0 to 100"/>
          </div>
          <div className="form-group">
            <label for="">Three Pointers:</label>
            <input type="number" className="form-control" id="threePointers" placeholder="0 to 100"/>
          </div>
        </form>
      </div>
    );
  }
};

export default CreatePlayer;
