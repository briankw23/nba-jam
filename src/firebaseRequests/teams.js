import axios from 'axios';

import constants from '../constants';

const getRequest = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${constants.firebaseConfig.databaseURL}/teams.json`)
      .then((res) => {
        const teams = [];
        if (res.data !== null) {
          Object.keys(res.data).forEach(fbKey => {
            res.data[fbKey].id = fbKey;
            teams.push(res.data[fbKey]);
          });
        }
        resolve(teams);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const getRequestOneTeam = (uid) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${constants.firebaseConfig.databaseURL}/teams.json?orderBy="uid"&equalTo="${uid}"`)
      .then((res) => {
        const teams = [];
        if (res.data !== null) {
          Object.keys(res.data).forEach(fbKey => {
            res.data[fbKey].id = fbKey;
            teams.push(res.data[fbKey]);
          });
        }
        resolve(teams);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const postRequest = (newTeam) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${constants.firebaseConfig.databaseURL}/teams.json`, newTeam)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const putRequest = (teamId, updatedTeam) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${constants.firebaseConfig.databaseURL}/teams/${teamId}.json`, updatedTeam)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const deleteRequest = (teamId) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${constants.firebaseConfig.databaseURL}/teams/${teamId}.json`)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default { getRequest, postRequest, getRequestOneTeam, putRequest, deleteRequest };
