import Pomodoro from './time';
import ShortTime from './shortTime';
import timeState from './timeState';
import LongTime from './longTime';
import task from './task';
import modalFunc from './header-modal';
import watchUpdate from './axios/update-settings';

new Pomodoro('pomodoro', 0, 10);

(function () {
  const $nav = document.querySelector('.main__btn-group');

  $nav.addEventListener('click', (e) => {
    console.log(timeState.state);
    if (timeState.state === 'pomodoro') {
      new Pomodoro('pomodoro', 0, 10);
    } else if (timeState.state === 'short-break') {
      new ShortTime('short-break', 5, 0);
    } else {
      new LongTime('long-break', 15, 0);
    }
  });
})();

modalFunc();

task();

watchUpdate();
