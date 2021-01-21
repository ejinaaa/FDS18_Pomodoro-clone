import Pomodoro from './time';
import timeState from './timeState';
import fetchData from './axios/fetch-data';

export default async function () {
  try {
    const {
      pomo_time,
      short_break,
      long_break,
      long_interval,
    } = await fetchData();

    const getNowState = () => {
      return timeState.state === 'pomodoro'
        ? +pomo_time
        : timeState.state === 'short-break'
        ? +short_break
        : +long_break;
    };

    const curTime = getNowState() || 1;

    const pomodoro = new Pomodoro(curTime, 0, long_interval);
    pomodoro.setTimeText();

    const $nav = document.querySelector('.main__btn-group');
    $nav.addEventListener('click', (e) => {
      pomodoro.minute = getNowState();
      pomodoro.setTimeText();
    });
  } catch (e) {
    console.error(e);
  }
}
