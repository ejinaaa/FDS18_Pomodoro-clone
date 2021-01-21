import fetchData from './axios/fetch-data';
import timeState from './timeState';

const $startBtn = document.querySelector('.btn-start');
const $loadingBar = document.querySelector('.loading-bar');
const $clock = document.querySelector('.main__time-set');
const $nav = document.querySelector('.main__btn-group');

const oneSecLoad = 10;
let loadingTID = null;

const fetchCurTime = async () => {
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

  return curTime;
};

const setLoadingBar = () => {
  clearInterval(loadingTID);
  loadingTID = null;
  $loadingBar.style.width = '620px';
};

export default function () {
  $startBtn.addEventListener('click', async () => {
    if (loadingTID) {
      clearInterval(loadingTID);
      loadingTID = null;
      return;
    }
    const curTime = await fetchCurTime();
    loadingTID = setInterval(() => {
      if ($loadingBar.style.width.length === 5)
        $loadingBar.style.width = `${
          +$loadingBar.style.width.substring(0, 3) - oneSecLoad
        }px`;
      else if ($loadingBar.style.width.length === 4) {
        $loadingBar.style.width =
          +$loadingBar.style.width.substring(0, 2) === 30
            ? '0px'
            : `${+$loadingBar.style.width.substring(0, 2) - oneSecLoad}px`;
      }
    }, 1000 * curTime);
  });

  $clock.addEventListener('timeEnd', () => {
    setLoadingBar();
  });

  $nav.addEventListener('click', () => {
    setLoadingBar();
  });
}
