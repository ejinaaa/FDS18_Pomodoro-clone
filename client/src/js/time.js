export default function time() {
  const $startBtn = document.querySelector('.btn-start');
  const $nav = document.querySelector('.main__btn-group');
  const $time = document.querySelector('.main__time-set');
  let state = 'pomodoro';
  let timerId;
  let minute;
  let second;
  let stopCount = 0;

  const countDown = (min = 25, sec = 0) => {
    minute = min;
    second = sec;

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
      ? countDown(5, 0)
      : countDown(15, 0);
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
    console.log(stopCount);
    if (stopCount) {
      clearInterval(timerId);
      clearInterval(timerId - 1);
    }
    stopCount++;
    if (stopCount >= 2) {
      stopCount = 0;
    }
  };

  const setBtnText = () => {
    $startBtn.innerHTML = $startBtn.matches('.active') ? 'STOP' : 'START';
  };

  $startBtn.addEventListener('click', (e) => {
    $startBtn.classList.toggle('active');
    setBtnText();
    changeTimer();
    stopTimer();
  });

  const changeState = (target) => {
    [...$nav.children].forEach((child) => {
      child.classList.toggle('active', target === child);
    });

    state = target.id;
    console.log(state);
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

  $nav.addEventListener('click', (e) => {
    stopCount = 2;
    $startBtn.classList.remove('active');
    setBtnText();
    changeState(e.target);
    changeColor();
    changeBtnText();
    stopTimer();
  });
}
