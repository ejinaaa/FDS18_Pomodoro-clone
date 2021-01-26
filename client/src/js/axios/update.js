import fetch from './fetch';

const axios = require('axios');

const url = 'http://localhost:4967/api/v1/pomo/';

export default {
  async settings(set) {
    try {
      const _id = await fetch.id();
      const { data: response } = await axios.put(url + _id, set);
      return response;
    } catch (error) {
      console.error(error);
    }
  }
};
