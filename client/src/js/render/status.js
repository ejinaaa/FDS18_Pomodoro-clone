import fetch from '../axios/fetch';

const $currentEst = document.querySelector('.current-progress .est .num');
const $currentAct = document.querySelector('.current-progress .act .num');
const $currentFinishTime = document.querySelector(
  '.current-progress .finish-time .num'
);

export default function updateCurrentProgress() {
  fetch.settings().then(res => {
    const pomoTime = +res.pomo_time;
    const shortBreakTime = +res.short_break;
    const longBreakTime = +res.long_break;
    const longBreakInterval = +res.long_interval;

    const currentEst = res.tasks.reduce(
      (acc, { completed, allEst }) => (completed ? acc : acc + allEst),
      0
    );

    $currentEst.textContent = currentEst;
    const currentTime = new Date();
    const totalPomoMinutes = pomoTime * (currentEst - $currentAct.textContent);
    let totalShortBreakTimes = 0;
    let totalLongBreakTimes = 0;

    if (currentEst > longBreakInterval) {
      if (Math.floor(currentEst / longBreakInterval)) {
        totalLongBreakTimes = Math.floor(currentEst / longBreakInterval);
        totalShortBreakTimes = currentEst - 1 - totalLongBreakTimes;
        if (!(currentEst % longBreakInterval)) {
          totalLongBreakTimes = Math.floor(currentEst / longBreakInterval) - 1;
          totalShortBreakTimes = currentEst - 1 - totalLongBreakTimes;
        }
      }
    } else {
      totalShortBreakTimes = currentEst - 1;
    }

    const totalShortBreakMinutes = shortBreakTime * totalShortBreakTimes;
    const totalLongBreakMinutes = longBreakTime * totalLongBreakTimes;
    const pomoMinutes =
      totalPomoMinutes + totalShortBreakMinutes + totalLongBreakMinutes;
    const totalMinutes =
      currentTime.getHours() * 60 + (currentTime.getMinutes() + pomoMinutes);
    const finishTime = `${Math.floor(totalMinutes / 60)} : ${
      ('' + (totalMinutes % 60)).length === 1
        ? '0' + (totalMinutes % 60)
        : totalMinutes % 60
    }`;

    $currentFinishTime.textContent = finishTime;
  });
}
