import timeState from '../common/timeState';

const axios = require('axios');

const url = 'http://localhost:4967/api/v1/pomo/';

export default {
  async id() {
    try {
      const { data } = await axios.get(url); // 원래 로그인한 유저의 설정을 찾아야 하지만, 로그인 구현하지 않았으므로
      const dataId = data[0]._id;
      return dataId; // 첫 번째 데이터 반환
    } catch (error) {
      console.error(error);
    }
  },
  async settings() {
    try {
      const _id = await this.id();
      const { data } = await axios.get(url + _id);
      return data;
    } catch (error) {
      console.error(error);
    }
  },
  async curClockTime() {
    const {
      pomo_time: pomoTime,
      short_break: shortBreak,
      long_break: longBreak
    } = await this.settings();

    const curTime =
      timeState.state === 'pomodoro'
        ? pomoTime
        : timeState.state === 'short-break'
        ? shortBreak
        : longBreak;

    return curTime;
  }
};
