import task from './task';
import funcHeaderModal from './modal/header-modal';
import loadingBar from './render/progress-bar';
import update from './axios/update';
import render from './render/clock';

funcHeaderModal();

update.watchUpdate();

task();

render();

loadingBar();
