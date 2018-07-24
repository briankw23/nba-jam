import React from 'react';

import teamsRequest from '../../firebaseRequests/teams';

import './CreateTeam.css';

const defaultTeam = {
  name: '',
  imgUrl: '',
  confId: 0,
}

class CreateTeam extends React.Component {
  state = {
    newTeam: defaultTeam,
  }

  formFieldState = (name, e) => {
    const tempTeam = {...this.state.newTeam}
    tempTeam[name] = e.target.value;
    this.setState({newTeam:tempTeam});
  }

  nameChange = (e) => {
    this.formFieldState('name', e);
  }

  CreateTeamEvent = (newTeam) => {
    // Firebase call
  }


  render() {
    const { newTeam } = this.state;
    return (
      <div className="CreateTeam">
        <h2 className="text-center">Create Team:</h2>
        <form action="">
          <div className="row">
            <fieldset className="col-xs-3">
              <label htmlFor="Team Name">Team Name:</label>
              <br />
              <input
                className="col-xs-12"
                type="text"
                id="name"
                placeholder="Flint Tropics"
                value={newTeam.name}
                onChange={this.nameChange}
              />
            </fieldset>

            <fieldset className="col-xs-3">
              <label htmlFor="Team Name">Team Logo</label>
              <br />
              <input
                className="col-xs-12"
                type="text"
                id="logo"
                placeholder="https://www.spreadshirt.com/image-server/v1/mp/designs/11637207,width=178,height=178/flint-tropics.png"
              />
            </fieldset>
            <button className="col-xs-3 btn btn-success">
            Submit
          </button>
          </div>
        </form>
      </div>
    )
  }
}

export default CreateTeam;
