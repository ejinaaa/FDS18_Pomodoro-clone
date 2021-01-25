import task from './task';
import funcHeaderModal from './modal/header-modal';
import loadingBar from './progress-bar';
import update from './axios/update';
import render from './render';

funcHeaderModal();

update.watchUpdate();

task();

render();

loadingBar();
