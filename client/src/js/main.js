import task from './task';
import modalFunc from './header-modal';
import {watchUpdate} from './axios/update-settings';
import render from './render';


modalFunc();

watchUpdate();

task();

render();

const $time = document.querySelector('.main__time-set');
$time.addEventListener('timeEnd', (e) => {
  console.log(e.target);
});
