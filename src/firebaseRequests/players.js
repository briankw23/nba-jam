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

export default {  postRequest };
