import getId from './fetch-id';

const axios = require('axios');

const url = 'http://localhost:4967/api/v1/pomo/get/';

export default async function fetchData() {
  try {
    const { _id } = await getId();
    const { data } = await axios.get(url + _id);
    return data;
  } catch (error) {
    console.error(error);
  }
}

/* 
  사용법 

  import fetchData from './axios/fetch-data';
  
  (async () => {
    const data = await fetchData();
    console.log(data); // 셋팅 가지고 있는 객체
    data 안의 필요한 프로퍼티 가지고 가서

    이 async 즉시 실행 함수 안에서 조작
  })();  
  
*/
