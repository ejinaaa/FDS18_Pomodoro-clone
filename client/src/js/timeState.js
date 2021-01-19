const timeState = {
  _state: 'pomodoro',

  get state() {
    return this._state;
  },

  set state(value) {
    this._state = value;
  },
};

export default timeState;
