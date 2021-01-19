export default function modalFunc() {
  const $modalContainer = document.querySelector('.settings-modal__container');
  const $modalForm = document.querySelector('.modal-form');
  const $settingsBtn = document.querySelector('.nav-settings-btn');
  const $submitBtn = document.querySelector('.settings-modal__submit-btn');
  const $cancelBtn = document.querySelector('.settings-modal__cancel-btn');

  $settingsBtn.onclick = e => {
    e.preventDefault();
    $modalContainer.style.display = 'block';
  };

  const turnModal = (e, node) => {
    e.preventDefault();
    node.style.display = node.style.display === 'none' ? 'block' : 'none';
  };
  $modalContainer.onclick = e => {
    turnModal(e, $modalContainer);
  };

  $cancelBtn.onclick = e => {
    turnModal(e, $modalContainer);
  };

  $submitBtn.addEventListener('click', e => {
    turnModal(e, $modalContainer);
  });

  $modalForm.onclick = e => {
    e.stopPropagation();
  };
}
