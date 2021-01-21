import fetchData from './axios/fetch-data';
import timeState from './timeState';

const $startBtn = document.querySelector('.btn-start');
const $loadingBar = document.querySelector('.loading-bar');
let loadingTID = null;

export default function () {
  $startBtn.addEventListener('click', async () => {
    if (loadingTID) {
      clearInterval(loadingTID);
      loadingTID = null;
      return;
    }

    const {
      pomo_time: pomoTime,
      short_break: shortBreak,
      long_break: longBreak
    } = await fetchData();
    const curTime =
      timeState.state === 'pomodoro'
        ? pomoTime
        : timeState.state === 'short-break'
        ? shortBreak
        : longBreak;
    const oneSecLoad = 10;

    loadingTID = setInterval(() => {
      $loadingBar.style.width = `${
        +$loadingBar.style.width.substring(0, 3) - oneSecLoad
      }px`;
      console.log($loadingBar.style.width);
    }, 1000 * curTime);
  });
}
