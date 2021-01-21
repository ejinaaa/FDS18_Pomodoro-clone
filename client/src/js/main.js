import task from './task';
import modalFunc from './header-modal';
import watchUpdate from './axios/update-settings';
import { render } from './render';
import loadingBar from './loading-bar';

watchUpdate();

modalFunc();

task();

render();

loadingBar();
