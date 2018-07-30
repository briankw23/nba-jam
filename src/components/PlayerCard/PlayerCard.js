import React from "react";

import playersRequest from "../../firebaseRequests/players";

class PlayerCard extends React.Component {
  state = {
    player: [],
  };
  render () {
    return (
      <h1>Player Card</h1>
      // <form action="" onSubmit={this.submitPlayerEvent}>
      //   <div className="form-group">
      //     <label>Name:</label>
      //     <input
      //       type="text"
      //       className="form-control"
      //       id="name"
      //       defaultValue={details.name}
      //       // value= { player.name }
      //       onChange={this.nameChange}
      //     />
      //   </div>
      //   <div className="form-group">
      //     <label>Image:</label>
      //     <input
      //       type="text"
      //       className="form-control"
      //       id="image"
      //       placeholder="Image URL"
      //       defaultValue={details.image}
      //       onChange={this.imageChange}
      //     />
      //   </div>
      //   <div className="form-group">
      //     <label>Defense:</label>
      //     <input
      //       type="number"
      //       className="form-control"
      //       id="defense"
      //       placeholder="0 to 100"
      //       defaultValue={details.defense}
      //       onChange={this.defenseChange}
      //     />
      //   </div>
      //   <div className="form-group">
      //     <label>Dunks:</label>
      //     <input
      //       type="number"
      //       className="form-control"
      //       id="dunks"
      //       placeholder="0 to 100"
      //       defaultValue={details.dunks}
      //       onChange={this.dunksChange}
      //     />
      //   </div>
      //   <div className="form-group">
      //     <label>Speed:</label>
      //     <input
      //       type="number"
      //       className="form-control"
      //       id="speed"
      //       placeholder="0 to 100"
      //       defaultValue={details.speed}
      //       onChange={this.speedChange}
      //     />
      //   </div>
      //   <div className="form-group">
      //     <label>Three Pointers:</label>
      //     <input
      //       type="number"
      //       className="form-control"
      //       id="threePointer"
      //       placeholder="0 to 100"
      //       defaultValue={details.threePointer}
      //       onChange={this.threePointerChange}
      //     />
      //   </div>
      //   <button type="submit" className="btn btn-success">
      //     Update
      //   </button>
      // </form>
    );
  }
}

export default PlayerCard;
