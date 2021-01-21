import timeState from './timeState';

export default class Pomodoro {
  constructor(min, interval) {
    this.timerId;
    this.minute = min;
    this.second = 0;
    this.interval = interval;
    this.intervalCount = 0;
    this.clickAudio = new Audio('./src/media/mouse.wav');
    this.alram = new Audio(
      'https://t1.daumcdn.net/cfile/tistory/99412B355CF6B93806?original'
    );
    this.timeEnd = new CustomEvent('timeEnd');
    this.customEvent = new MouseEvent('click', {
      bubbles: true
    });
    this.$nav = document.querySelector('.main__btn-group');
    this.$time = document.querySelector('.main__time-set');
    this.$startBtn = document.querySelector('.btn-start');
    this.$longBtn = document.querySelector('#long-break');
    this.$shortBtn = document.querySelector('#short-break');
    this.$pomoBtn = document.querySelector('#pomodoro');
    // 시작 버튼이 클릭되면 버튼의 클래스를 토글해주고 타이머를 시작하고 버튼의 텍스트를 바꿔주고 딸깍 오디오를 재생시킨다.
    this.$startBtn.onclick = () => {
      this.$startBtn.classList.toggle('active');
      this.countDown();
      this.setBtnText();
      this.clickAudio.play();
    };

    // 네비게이션 버튼이 클릭되면 버튼의 클래스 엑티브를 제거해주고 버튼의 텍스트를 다시 셋팅해주고
    // 현재의 상태를 변경해주고 배경색과 버튼색을 변경해주고 타이머를 멈춘다.
    this.$nav.onclick = e => {
      if (e.target === e.currentTarget) return;
      this.$startBtn.classList.remove('active');
      this.setBtnText();
      this.setState(e.target);
      this.setColor();
      this.stopTimer();
    };
    // 커스텀 클릭이벤트 발생시킬 용도
    this.$longBtn.onclick = () => {};
    this.$shortBtn.onclick = () => {};
    this.$pomoBtn.onclick = () => {};
  }

  // 타이머를 시작시킨다.
  countDown() {
    if (this.timerId) {
      this.stopTimer();
      // clearInterval(this.timerId);
      // this.timerId = null;
      return;
    }

    this.timerId = setInterval(() => {
      // 0분 0초가 되면 커스텀 이벤트를 발생시키고,
      // pomodoro, short-break, long-break 중 어느 상태로 변경해야 하는지 설정하고 타이머를 멈춘다
      if (!this.minute && !this.second) {
        ++this.intervalCount;
        this.$time.dispatchEvent(this.timeEnd);
        this.alram.play();
        this.selectTime();
        return clearInterval(this.timerId);
      }

      this.setCount();
      this.setTimeText();
    }, 1000);
  }

  // 상태나 설정된 long-beak-interval에 따라서 어떤 커스텀 이벤트를 발생시킬지 선택한다.
  selectTime() {
    if (timeState.state !== 'pomodoro') {
      return this.$pomoBtn.dispatchEvent(this.customEvent);
    }
    if (+this.interval === this.intervalCount) {
      this.$longBtn.dispatchEvent(this.customEvent);
      this.intervalCount = 0;
    } else {
      this.$shortBtn.dispatchEvent(this.customEvent);
    }
  }

  // 스타트 버튼의 텍스트를 변경
  setBtnText() {
    this.$startBtn.textContent = this.$startBtn.matches('.active')
      ? 'STOP'
      : 'START';
  }

  // 현재 상태를 변경한다.
  setState(target) {
    [...this.$nav.children].forEach(child => {
      child.classList.toggle('active', target === child);
    });

    timeState.state = target.id;
  }

  // 상태에 따라 스타트버튼과 배경색을 변경한다.
  setColor() {
    const nowColor =
      timeState.state === 'pomodoro'
        ? 'rgb(219, 82, 77)'
        : timeState.state === 'short-break'
        ? 'rgb(70, 142, 145)'
        : 'rgb(67, 126, 168)';

    document.body.style.backgroundColor = nowColor;

    this.$startBtn.style.color = nowColor;
  }

  // 현재 타이머를 랜더링한다.
  setTimeText() {
    this.$time.textContent = `${
      this.minute < 10 ? '0' + this.minute : this.minute
    }:${this.second < 10 ? '0' + this.second : this.second}`;
  }

  // 타이머를 셋팅한다.
  setCount() {
    if (!this.second) {
      --this.minute;
      this.second = 59;
    } else {
      --this.second;
    }
  }

  // 타이머를 멈춘다
  stopTimer() {
    clearInterval(this.timerId);
    this.timerId = null;
    //this.second = 0;
  }
}
