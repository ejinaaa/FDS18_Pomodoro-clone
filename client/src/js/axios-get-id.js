const axios = require('axios');

const url = 'http://localhost:4967/api/v1/pomo/';

export default function getId() {
  async function getUser() {
    try {
      const response = await axios.get(url);
      return response;
    } catch (error) {
      console.error(error);
    }
  }
  return getUser();
}
