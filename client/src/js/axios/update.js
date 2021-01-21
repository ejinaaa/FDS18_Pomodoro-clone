import { fetchId } from './fetch';
import render from '../render';

const axios = require('axios');

const url = 'http://localhost:4967/api/v1/pomo/';

export async function updateSettings(set) {
  try {
    const _id = await fetchId();
    const { data: response } = await axios.put(url + _id, set);
    return response;
  } catch (error) {
    console.error(error);
  }
}

export function watchUpdate() {
  const $submitBtn = document.querySelector('.settings-modal__submit-btn');
  const $inputs = [...document.querySelectorAll('.modal-form input')];
  const $select = document.querySelector('.noti_freq');

  $submitBtn.addEventListener('click', e => {
    e.preventDefault();

    const settings = {};
    $inputs.forEach(v => {
      if (v.type === 'checkbox') settings[v.className] = v.checked;
      else settings[v.className] = v.value;
    });
    settings[$select.className] = [...$select.options][
      $select.options.selectedIndex
    ].innerText;
    updateSettings(settings).then(() => render());
  });
}
