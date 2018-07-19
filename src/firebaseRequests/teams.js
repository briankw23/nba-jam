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
    })
});
};

export default { getRequest };
