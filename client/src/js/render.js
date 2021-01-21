import Pomodoro from './time';
import timeState from './timeState';
import fetchData from './axios/fetch-data';

export default async function () {
  // 서버에서 설정된 시간들을 가져온다.
  try {
    const {
      pomo_time,
      short_break,
      long_break,
      long_interval,
    } = await fetchData();
    // 상태에 따라 어떤시간을 렌더링할지 정한다.
    const getNowState = () => {
      return timeState.state === 'pomodoro'
        ? +pomo_time
        : timeState.state === 'short-break'
        ? +short_break
        : +long_break;
    };
    // 설정된 시간이 0분이면 1분을 넣어준다.
    const curTime = getNowState() || 1;

    const pomodoro = new Pomodoro(curTime, long_interval);
    // 설정된 시간을 랜더링한다.
    pomodoro.setTimeText();

    const $nav = document.querySelector('.main__btn-group');
    $nav.addEventListener('click', (e) => {
      if (e.target === e.currentTarget) return;
      // 네비게이션 버튼이 클릭되면 현재 설정된 시간으로 초기화 되고 초기화 된 시간을 다시 랜더링한다.
      pomodoro.minute = getNowState() || 1;
      pomodoro.second = 0;
      pomodoro.setTimeText();
    });
  } catch (e) {
    console.error(e);
  }
}
