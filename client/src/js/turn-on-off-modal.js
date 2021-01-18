export default function turnOnOff() {
  const $settingsBtn = document.querySelector('.nav-settings-btn');
  const $modalContainer = document.querySelector('.settings-modal__container');
  const $modalForm = document.querySelector('.modal-form');

  $settingsBtn.onclick = e => {
    console.log('adfasdf');
    e.preventDefault();
    $modalContainer.style.display = 'block';
  };
  const $cancelBtn = document.querySelector('.settings-modal__cancel-btn');
  const offscreen = (e, node) => {
    e.preventDefault();
    node.style.display = 'none';
  };
  $modalContainer.onclick = e => {
    offscreen(e, $modalContainer);
  };

  $cancelBtn.onclick = e => {
    offscreen(e, $modalContainer);
  };

  $modalForm.onclick = e => {
    e.stopPropagation();
  };
}
