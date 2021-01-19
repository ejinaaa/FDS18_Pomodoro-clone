import getId from './axios-get-id';

const axios = require('axios');

const url = 'http://localhost:4967/api/v1/pomo/';

export default function putSettings() {
  const $submitBtn = document.querySelector('.settings-modal__submit-btn');
  const $inputs = [...document.querySelectorAll('.modal-form input')];
  const $select = document.querySelector('.noti_freq');

  async function putSettings(set) {
    try {
      const res = await getId();
      const id = res.data[0]._id;
      const response = await axios.put(url + id, set);
      console.log(response);
      return true;
    } catch (error) {
      console.error(error);
    }
  }

  $submitBtn.addEventListener('click', e => {
    e.preventDefault();

    // console.log(inputs[0].className);
    const settings = {};
    $inputs.forEach(v => {
      if (v.type === 'checkbox') settings[v.className] = v.checked;
      else settings[v.className] = v.value;
    });
    settings[$select.className] = [...$select.options][
      $select.options.selectedIndex
    ].innerText;
    console.dir(settings);
    putSettings(settings);
  });
}
