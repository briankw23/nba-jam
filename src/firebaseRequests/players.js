import axios from 'axios';

import constants from '../constants';

const postRequest = (newPlayer) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${constants.firebaseConfig.databaseURL}/players.json`, newPlayer)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const getRequestRoster = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${constants.firebaseConfig.databaseURL}/players.json?orderBy="teamId"&equalTo="${id}"`)
      .then((res) => {
        const players = [];
        if (res.data !== null) {
          Object.keys(res.data).forEach(fbKey => {
            res.data[fbKey].id = fbKey;
            players.push(res.data[fbKey]);
          });
        }
        resolve(players);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const putRequest = (playerId, updatedPlayer) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${constants.firebaseConfig.databaseURL}/players/${playerId}.json`, updatedPlayer)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default {  postRequest, getRequestRoster, putRequest };
