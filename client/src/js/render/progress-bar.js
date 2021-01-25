import fetch from '../axios/fetch';

const $startBtn = document.querySelector('.btn-start');
const $progressBar = document.querySelector('.loading-bar');
const $clock = document.querySelector('.main__time-set');
const $nav = document.querySelector('.main__btn-group');
const $submitBtn = document.querySelector('.settings-modal__submit-btn');

const progress = 10;
let progressTimerId = null;

const setProgressBar = () => {
  clearInterval(progressTimerId);
  progressTimerId = null;
  $progressBar.style.width = '620px';
};

export default function () {
  $startBtn.addEventListener('click', async () => {
    if (progressTimerId) {
      clearInterval(progressTimerId);
      progressTimerId = null;
      return;
    }

    const curTime = await fetch.curClockTime();

    progressTimerId = setInterval(() => {
      const remainProgress = $progressBar.style.width.substring(
        0,
        $progressBar.style.width.length - 2
      );
      $progressBar.style.width =
        remainProgress === 30 ? '0px' : `${remainProgress - progress}px`;
    }, 1000 * curTime);
  });

  $clock.addEventListener('timeEnd', setProgressBar);

  $nav.addEventListener('click', setProgressBar);

  $submitBtn.addEventListener('click', setProgressBar);
}
