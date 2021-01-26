import task from './render/task';
import funcHeaderModal from './render/header-modal';
import loadingBar from './render/progress-bar';
import update from './axios/update';
import render from './render/clock';

funcHeaderModal();

update.watchUpdate();

task();

render();

loadingBar();
