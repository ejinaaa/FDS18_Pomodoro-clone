const axios = require('axios');

const url = 'http://localhost:4967/api/v1/pomo/';

export default function getId() {
  return (async () => {
    try {
      const { data } = await axios.get(url); // 원래 로그인한 유저의 설정을 찾아야 하지만, 로그인 구현하지 않았으므로
      return data[0]; // 첫 번째 데이터 반환
    } catch (error) {
      console.error(error);
    }
  })();
}
