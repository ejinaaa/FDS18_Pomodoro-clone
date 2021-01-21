import task from './task';
import modalFunc from './header-modal';
import loadingBar from './loading-bar';
import { watchUpdate } from './axios/update-settings';
import render from './render';

modalFunc();

watchUpdate();

task();

render();

loadingBar();
