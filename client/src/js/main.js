import task from './task';
import modalFunc from './header-modal';
import {watchUpdate} from './axios/update-settings';
import render from './render';

new Pomodoro('pomodoro', 0, 10);

(function () {
  const $nav = document.querySelector('.main__btn-group');

  $nav.addEventListener('click', e => {
    if (e.target === e.currentTarget) return;
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

watchUpdate();

task();

render();
