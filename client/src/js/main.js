import task from './task';
import modalFunc from './header-modal';
import watchUpdate from './axios/update-settings';
import render from './render';
watchUpdate();

modalFunc();

task();

render();
