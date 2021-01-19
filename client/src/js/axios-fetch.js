import getId from './axios-get-id';

const axios = require('axios');

const url = 'http://localhost:4967/api/v1/pomo/get/';

export default async function fetchData() {
  try {
    const { res } = await getId();
    const id = res._id;
    const { data } = await axios.get(url + id);
    return data;
  } catch (error) {
    console.error(error);
  }
}
