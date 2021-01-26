export default function () {
  const $modalContainer = document.querySelector('.settings-modal__container');
  const $modalForm = document.querySelector('.modal-form');
  const $settingsBtn = document.querySelector('.nav-settings-btn');
  const $submitBtn = document.querySelector('.settings-modal__submit-btn');
  const $cancelBtn = document.querySelector('.settings-modal__cancel-btn');

  // 설정 버튼 누르면 모달 열기
  $settingsBtn.onclick = e => {
    e.preventDefault();
    $modalContainer.style.display = 'block';
  };

  // 모달 열기/닫기
  const turnModal = (e, node) => {
    e.preventDefault();
    node.style.display = node.style.display === 'none' ? 'block' : 'none';
  };

  $modalContainer.onmousedown = e => {
    turnModal(e, $modalContainer);
  };

  $cancelBtn.onclick = e => {
    turnModal(e, $modalContainer);
  };

  $submitBtn.addEventListener('click', e => {
    turnModal(e, $modalContainer);
  });

  // 모달 눌렀을 때 onclick 이벤트 버블링 막기
  $modalForm.onmousedown = e => {
    e.stopPropagation();
  };
}
