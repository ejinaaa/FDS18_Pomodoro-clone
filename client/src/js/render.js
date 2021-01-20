import Pomodoro from './time';
import timeState from './timeState';
import fetchData from './axios/fetch-data';

export default async function () {
  try {
    const { pomo_time, short_break, long_break } = await fetchData();
    const curTime =
      timeState.state === 'pomodoro'
        ? pomo_time
        : timeState.state === 'short-break'
        ? short_break
        : long_break;

    const pomodoro = new Pomodoro(curTime, 0);
    const $nav = document.querySelector('.main__btn-group');

    $nav.addEventListener('click', (e) => {
      if (e.target === e.currentTarget) return;
      if (timeState.state === 'pomodoro') {
        pomodoro.minute = pomo_time;
      } else if (timeState.state === 'short-break') {
        pomodoro.minute = short_break;
      } else {
        pomodoro.minute = long_break;
      }
      pomodoro.second = 0;
      pomodoro.setTimeText();
    });
    pomodoro.setTimeText();
  } catch (e) {
    console.error(e);
  }
}
