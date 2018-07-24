import React from 'react';
import authRequest from '../../firebaseRequests/auth';
import teamsRequest from '../../firebaseRequests/teams';

import './CreateTeam.css';

const defaultTeam = {
  name: '',
  image: '',
  confId: 0,
};

class CreateTeam extends React.Component {
  state = {
    newTeam: defaultTeam,
  }

  submitTeamEvent = (e) => {
    const newTeam = this.state.newTeam;
    newTeam.uid = authRequest.getUid();
    e.preventDefault();
    teamsRequest
      .postRequest(newTeam)
      .then(() => {
        this.props.history.push('/myTeam');
      })
      .catch((err) => {
        console.error('error with post', err);
      });
  }

  formFieldState = (name, e) => {
    const tempTeam = {...this.state.newTeam};
    tempTeam[name] = e.target.value;
    this.setState({ newTeam: tempTeam});
  }

  nameChange = (e) => {
    this.formFieldState('name', e);
  }

  imageChange = (e) => {
    this.formFieldState('image', e);
  }

  render () {
    const { newTeam } = this.state;
    return (
      <div className="CreateTeam">
        <h2 className="text-center">Create Team:</h2>
        <form onSubmit={this.submitTeamEvent}>
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
                id="image"
                placeholder="https://www.spreadshirt.com/image-server/v1/mp/designs/11637207,width=178,height=178/flint-tropics.png"
                value={newTeam.image}
                onChange={this.imageChange}
              />
            </fieldset>
            <button type="submit" className="col-xs-3 btn btn-success">
            Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default CreateTeam;
