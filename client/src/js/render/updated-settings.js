import update from '../axios/update';
import renderClock from './clock';
import renderCurrentProgress from './status';

export default function () {
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

    await update.settings(settings);
    renderCurrentProgress();
    renderClock();
  });
}
