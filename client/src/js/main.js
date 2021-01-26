import task from './render/task';
import funcHeaderModal from './render/header-modal';
import loadingBar from './render/progress-bar';
import render from './render/clock';
import watchUpdate from './render/updated-settings';

funcHeaderModal();

watchUpdate();

task();

render();

loadingBar();
