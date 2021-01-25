import fetch from './fetch';
import render from '../render/clock';
import updateCurrentProgress from '../render/status';

const axios = require('axios');

const url = 'http://localhost:4967/api/v1/pomo/';

export default {
  async settings(set) {
    try {
      const _id = await fetch.id();
      const { data: response } = await axios.put(url + _id, set);
      return response;
    } catch (error) {
      console.error(error);
    }
  },
  watchUpdate() {
    const $submitBtn = document.querySelector('.settings-modal__submit-btn');
    const $inputs = [...document.querySelectorAll('.modal-form input')];
    const $select = document.querySelector('.noti_freq');

    $submitBtn.addEventListener('click', async e => {
      e.preventDefault();

      const settings = {};
      $inputs.forEach(v => {
        settings[v.className] = v.type === 'checkbox' ? v.checked : v.value;
      });
      settings[$select.className] = [...$select.options][
        $select.options.selectedIndex
      ].innerText;

      await this.settings(settings);
      updateCurrentProgress();
      render();
    });
  }
};
