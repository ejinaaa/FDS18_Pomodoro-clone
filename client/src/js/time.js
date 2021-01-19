export default function time() {
  const $startBtn = document.querySelector('.btn-start');
  const $nav = document.querySelector('.main__btn-group');
  const $time = document.querySelector('.main__time-set');
  let state = 'pomodoro';
  let timerId;
  let minute;
  let second;

  const countDown = (min = 25, sec = 0) => {
    minute = min;
    second = sec;
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
      return;
    }

    timerId = setInterval(() => {
      if (!minute && !second) {
        return clearInterval(timerId);
      } else if (!second) {
        --minute;
        second = 59;
      } else {
        --second;
      }
      $time.innerText = `${minute < 10 ? '0' + minute : minute}:${
        second < 10 ? '0' + second : second
      }`;
    }, 1000);
  };

  const changeTimer = () => {
    state === 'pomodoro'
      ? countDown(minute, second)
      : state === 'short-break'
      ? countDown(minute, second)
      : countDown(minute, second);
  };

  const changeBtnText = () => {
    $time.textContent =
      state === 'pomodoro'
        ? '25:00'
        : state === 'short-break'
        ? '05:00'
        : '15:00';
  };

  const stopTimer = () => {
    clearInterval(timerId);
    timerId = null;
  };

  const setBtnText = () => {
    $startBtn.innerHTML = $startBtn.matches('.active') ? 'STOP' : 'START';
  };

  const changeState = (target) => {
    [...$nav.children].forEach((child) => {
      child.classList.toggle('active', target === child);
    });

    state = target.id;
  };

  const changeColor = () => {
    document.body.style.backgroundColor =
      state === 'pomodoro'
        ? 'rgb(219, 82, 77)'
        : state === 'short-break'
        ? 'rgb(70, 142, 145)'
        : 'rgb(67, 126, 168)';
    $startBtn.style.color =
      state === 'pomodoro'
        ? 'rgb(219, 82, 77)'
        : state === 'short-break'
        ? 'rgb(70, 142, 145)'
        : 'rgb(67, 126, 168)';
  };

  $startBtn.addEventListener('click', (e) => {
    $startBtn.classList.toggle('active');
    setBtnText();
    changeTimer();
  });

  $nav.addEventListener('click', (e) => {
    $startBtn.classList.remove('active');
    setBtnText();
    changeState(e.target);
    changeColor();
    changeBtnText();
    stopTimer();
  });
}
