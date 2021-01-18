export default function time() {
  const $startBtn = document.querySelector('.btn-start');
  let state = 'pomodoro';
  let timerId;
  let minute;
  let second;
  let stopCount = 0;

  function countDown(min = 1, sec = 0) {
    minute = min;
    second = sec;
    const $time = document.querySelector('.main__time-set');

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
  }
  $startBtn.addEventListener('click', (e) => {
    $startBtn.classList.toggle('active');
    countDown(minute, second);
    if (stopCount) {
      clearInterval(timerId);
      clearInterval(timerId - 1);
    }
    stopCount++;
    if (stopCount === 2) {
      stopCount = 0;
    }
  });
}
