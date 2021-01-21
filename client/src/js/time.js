import timeState from './timeState';

export default class Pomodoro {
  constructor(min, sec, interval) {
    this.timerId;
    this.minute = min;
    this.second = sec;
    this.interval = interval;
    this.intervalCount = 0;
    this.clickAudio = new Audio('./src/media/mouse.wav');
    this.alram = new Audio(
      'https://t1.daumcdn.net/cfile/tistory/99412B355CF6B93806?original'
    );
    this.timeEnd = new CustomEvent('timeEnd');
    this.customEvent = new MouseEvent('click', {
      bubbles: true,
    });
    this.$nav = document.querySelector('.main__btn-group');
    this.$time = document.querySelector('.main__time-set');
    this.$startBtn = document.querySelector('.btn-start');
    this.$longBtn = document.querySelector('#long-break');
    this.$shortBtn = document.querySelector('#short-break');

    this.$startBtn.onclick = () => {
      this.$startBtn.classList.toggle('active');
      this.countDown();
      this.setBtnText();
      this.clickAudio.play();
    };

    this.$nav.onclick = (e) => {
      if (e.target === e.currentTarget) return;
      this.$startBtn.classList.remove('active');
      this.setBtnText();
      this.setState(e.target);
      this.setColor();
      this.stopTimer();
    };

    this.$longBtn.onclick = () => {};
    this.$shortBtn.onclick = () => {};
  }

  countDown() {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
      return;
    }

    this.timerId = setInterval(() => {
      if (!this.minute && !this.second) {
        ++this.intervalCount;
        this.alram.play();
        this.selectBreakTime();
        this.$time.dispatchEvent(this.timeEnd);
        return clearInterval(this.timerId);
      }

      this.setCount();
      this.setTimeText();
    }, 1000);
  }

  selectBreakTime() {
    if (+this.interval === this.intervalCount) {
      this.$longBtn.dispatchEvent(this.customEvent);
      this.intervalCount = 0;
    } else {
      this.$shortBtn.dispatchEvent(this.customEvent);
    }
  }

  setBtnText() {
    this.$startBtn.textContent = this.$startBtn.matches('.active')
      ? 'STOP'
      : 'START';
  }

  setState(target) {
    [...this.$nav.children].forEach((child) => {
      child.classList.toggle('active', target === child);
    });

    timeState.state = target.id;
  }

  setColor() {
    document.body.style.backgroundColor =
      timeState.state === 'pomodoro'
        ? 'rgb(219, 82, 77)'
        : timeState.state === 'short-break'
        ? 'rgb(70, 142, 145)'
        : 'rgb(67, 126, 168)';

    this.$startBtn.style.color =
      timeState.state === 'pomodoro'
        ? 'rgb(219, 82, 77)'
        : timeState.state === 'short-break'
        ? 'rgb(70, 142, 145)'
        : 'rgb(67, 126, 168)';
  }

  setTimeText() {
    this.$time.textContent = `${
      this.minute < 10 ? '0' + this.minute : this.minute
    }:${this.second < 10 ? '0' + this.second : this.second}`;
  }

  setCount() {
    if (!this.second) {
      --this.minute;
      this.second = 59;
    } else {
      --this.second;
    }
  }

  stopTimer() {
    clearInterval(this.timerId);
    this.timerId = null;
    this.second = 0;
  }
}

//   let state = 'pomodoro';
//   let timerId;
//   let minute;
//   let second;
//   let shortMinute;
//   let shortSecond;
//   let longMinute;
//   let longSecond;

//   const countDown = (min = 25, sec = 0) => {
//     minute = min;
//     second = sec;
//     if (timerId) {
//       clearInterval(timerId);
//       timerId = null;
//       return;
//     }

//     timerId = setInterval(() => {
//       if (!minute && !second) {
//         $shortBtn.dispatchEvent(customEvent);
//         return clearInterval(timerId);
//       } else if (!second) {
//         --minute;
//         second = 59;
//       } else {
//         --second;
//       }
//       $time.innerText = `${minute < 10 ? '0' + minute : minute}:${
//         second < 10 ? '0' + second : second
//       }`;
//     }, 1000);
//   };

//   const shortCountDown = (min = 5, sec = 0) => {
//     shortMinute = min;
//     shortSecond = sec;
//     if (timerId) {
//       clearInterval(timerId);
//       timerId = null;
//       return;
//     }

//     timerId = setInterval(() => {
//       if (!shortMinute && !shortSecond) {
//         $shortBtn.dispatchEvent(customEvent);
//         return clearInterval(timerId);
//       } else if (!shortSecond) {
//         --shortMinute;
//         shortSecond = 59;
//       } else {
//         --shortSecond;
//       }
//       $time.innerText = `${
//         shortMinute < 10 ? '0' + shortMinute : shortMinute
//       }:${shortSecond < 10 ? '0' + shortSecond : shortSecond}`;
//     }, 1000);
//   };

//   const longCountDown = (min = 15, sec = 0) => {
//     longMinute = min;
//     longSecond = sec;
//     if (timerId) {
//       clearInterval(timerId);
//       timerId = null;
//       return;
//     }

//     timerId = setInterval(() => {
//       if (!longMinute && !longSecond) {
//         $shortBtn.dispatchEvent(customEvent);
//         return clearInterval(timerId);
//       } else if (!longSecond) {
//         --longMinute;
//         longSecond = 59;
//       } else {
//         --longSecond;
//       }
//       $time.innerText = `${longMinute < 10 ? '0' + longMinute : longMinute}:${
//         longSecond < 10 ? '0' + longSecond : longSecond
//       }`;
//     }, 1000);
//   };

//   const changeTimer = () => {
//     state === 'pomodoro'
//       ? countDown()
//       : state === 'short-break'
//       ? shortCountDown()
//       : longCountDown();
//   };

//   const changeBtnText = () => {
//     $time.textContent =
//       state === 'pomodoro'
//         ? '25:00'
//         : state === 'short-break'
//         ? '05:00'
//         : '15:00';
//   };

//   const stopTimer = () => {
//     clearInterval(timerId);
//     timerId = null;
//   };

//   const setBtnText = () => {
//     $startBtn.innerHTML = $startBtn.matches('.active') ? 'STOP' : 'START';
//   };

//   const changeState = (target) => {
//     [...$nav.children].forEach((child) => {
//       child.classList.toggle('active', target === child);
//     });

//     state = target.id;
//   };

//   const changeColor = () => {
//     document.body.style.backgroundColor =
//       state === 'pomodoro'
//         ? 'rgb(219, 82, 77)'
//         : state === 'short-break'
//         ? 'rgb(70, 142, 145)'
//         : 'rgb(67, 126, 168)';
//     $startBtn.style.color =
//       state === 'pomodoro'
//         ? 'rgb(219, 82, 77)'
//         : state === 'short-break'
//         ? 'rgb(70, 142, 145)'
//         : 'rgb(67, 126, 168)';
//   };

//   const allInitialize = () => {
//     shortMinute = undefined;
//     shortSecond = undefined;
//     minute = undefined;
//     second = undefined;
//     longMinute = undefined;
//     longSecond = undefined;
//   };

//   $startBtn.addEventListener('click', (e) => {
//     $startBtn.classList.toggle('active');
//     setBtnText();
//     changeTimer();
//   });

//   $nav.addEventListener('click', (e) => {
//     $startBtn.classList.remove('active');
//     allInitialize();
//     setBtnText();
//     changeState(e.target);
//     changeColor();
//     changeBtnText();
//     stopTimer();
//   });

//   $shortBtn.addEventListener('click', (e) => {
//     $startBtn.classList.remove('active');
//     setBtnText();
//     changeState(e.target);
//     changeColor();
//     changeBtnText();
//     stopTimer();
//   });
// }
//
