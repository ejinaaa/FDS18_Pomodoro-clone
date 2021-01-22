import { fetchSettings } from './axios/fetch';
const $currentEst = document.querySelector('.current-progress .est .num');
const $currentFinishTime = document.querySelector(
  '.current-progress .finish-time .num'
);

export default function updateCurrentProgress () {
  fetchSettings().then(res => {
    const pomodoroTime = res.pomo_time;
    const shortBreakTime = res.short_break;
    const longBreakTime = res.long_break;
    const longBreakInterval = res.long_interval;

    const currentEst = res.tasks.reduce(
      (acc, { completed, allEst }) => (completed ? acc : acc + allEst),
      0
    );

    $currentEst.textContent = currentEst;

    const currentTime = new Date();
    const pomoMinutes =
      pomodoroTime * currentEst +
      shortBreakTime * ((currentEst - 1 < 0 ? 0 : currentEst - 1) - Math.floor(currentEst / longBreakInterval)) +
      (currentEst > longBreakInterval
        ? longBreakTime * Math.floor(currentEst / longBreakInterval)
        : 0);
    const totalMinutes =
      currentTime.getHours() * 60 + (currentTime.getMinutes() + pomoMinutes);
    const totalTime = `${Math.floor(totalMinutes / 60)} : ${
      ('' + (totalMinutes % 60)).length === 1
        ? '0' + (totalMinutes % 60)
        : totalMinutes % 60
    }`;

    $currentFinishTime.textContent = totalTime;
  });
};