import task from './task';
import funcHeaderModal from './modal/header-modal';
import loadingBar from './progress-bar';
import { watchUpdate } from './axios/update';
import render from './render';

funcHeaderModal();

watchUpdate();

task();

render();

loadingBar();
