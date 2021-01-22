import { fetchSettings } from './axios/fetch';
import { updateSettings } from './axios/update';
import timerState from './timeState';
import updateCurrentProgress from './update-current-progress';

// DOM
const $addTaskBtn = document.querySelector('.add-task-btn');
const $addTaskContainer = document.querySelector('.add-task-container');
const $inputTask = document.querySelector('.add-task-container .input-task');
const $tasks = document.querySelector('.tasks');
const $inputEstNum = document.querySelector('.input-est-num');
const $removeCompletedTasksBtn = document.querySelector(
  '.remove-completed-tasks-btn'
);
const $currentProgress = document.querySelector('.current-progress');
const $addTaskBtnContainer = document.querySelector(
  '.add-task-container .btn-container'
);
const $increaseEstBtn = document.querySelector(
  '.set-est-container .increase-btn'
);
const $decreaseEstBtn = document.querySelector(
  '.set-est-container .decrease-btn'
);
const $currentAct = document.querySelector('.current-progress .act .num');
const $activeTaskSubject = document.querySelector('.active-task');
const $saveBtn = document.querySelector('.save-btn');
const $msgContainer = document.querySelector('.msg-container');
const $time = document.querySelector('.main__time-set');
const $settingsSubmitBtn = document.querySelector(
  '.settings-modal__submit-btn'
);

export default function task() {
  // Functions
  const render = (() => {
    const getTemplate = task => {
      return `<li id="${task.id}" class="task ${
        task.active ? 'active' : ''
      }" draggable="true">
      <input type="checkbox" id="ck-${task.id}" class="checkbox" ${
        task.completed ? 'checked' : ''
      }/>
      <label for="ck-${
        task.id
      }"><i class="fas fa-check-circle check-icon"></i></label>
      <span class="task-subject">${task.content}</span>
      <span class="est-counter">
        <span class="est-done">${task.leftEst}</span>
        /${task.allEst}
      </span>
      <button class="remove-task-btn">
        <i class="fas fa-minus-circle remove-icon"></i>
      </button>
    </li>`;
    };

    return tasks => {
      $tasks.innerHTML = [...tasks].map(task => getTemplate(task)).join('');

      if (tasks.length) $currentProgress.classList.add('active');
      else if (!tasks.length) $currentProgress.classList.remove('active');

      if (tasks.every(({ active }) => active === false))
        $msgContainer.classList.remove('active');

      if (tasks.some(task => task.active === true)) {
        $msgContainer.classList.add('active');
        $activeTaskSubject.textContent = tasks.find(
          task => task.active
        ).content;
      } else {
        $msgContainer.classList.remove('active');
      }

      updateCurrentProgress();
    };
  })();

  const getTasks = () => {
    fetchSettings().then(res => {
      updateAct();
      render(res.tasks);
    });
  };

  const addTask = (inputTaskValue, inputEstNum) => {
    fetchSettings().then(res => {
      const generateId = Math.max(...res.tasks.map(task => task.id), 0) + 1;
      const tasks = [
        ...res.tasks,
        {
          id: generateId,
          content: inputTaskValue,
          allEst: inputEstNum,
          leftEst: 0,
          completed: false,
          active: false
        }
      ];

      updateSettings({ tasks }).then(() => getTasks());
    });
  };

  const removeTask = targetId => {
    fetchSettings().then(res => {
      const tasks = res.tasks.filter(({ id }) => +targetId !== id);

      updateSettings({ tasks }).then(() => getTasks());
    });
  };

  const toggleTask = targetId => {
    fetchSettings().then(res => {
      const tasks = res.tasks.map(task =>
        +targetId === task.id ? { ...task, completed: !task.completed } : task
      );

      updateSettings({ tasks }).then(() => getTasks());
    });
  };

  const removeCompletedTasks = () => {
    fetchSettings().then(res => {
      const tasks = [...res.tasks.filter(({ completed }) => !completed)];

      updateSettings({ tasks }).then(() => getTasks());
    });
  };

  const activateTask = targetId => {
    fetchSettings().then(res => {
      const tasks = res.tasks.map(task => ({
        ...task,
        active: +targetId === task.id
      }));

      updateSettings({ tasks }).then(() => getTasks());
    });
  };

  const updateLeftEst = () => {
    fetchSettings().then(res => {
      const tasks = res.tasks.map(task =>
        task.active ? { ...task, leftEst: ++task.leftEst } : task
      );

      updateSettings({ tasks }).then(() => getTasks());
    });
  };

  const updateAct = () => {
    fetchSettings().then(res => {
      const actNum = res.tasks.reduce((acc, { leftEst }) => acc + +leftEst, 0);

      $currentAct.textContent = actNum;
    });
  };

  // Events
  document.addEventListener('DOMContentLoaded', getTasks);

  $addTaskBtn.addEventListener('click', () => {
    $addTaskBtn.classList.remove('active');
    $addTaskContainer.classList.add('active');
    $inputTask.focus();
  });

  $addTaskContainer.addEventListener('keyup', e => {
    if (e.key !== 'Enter' || !$inputTask.value) return;

    if (e.target.matches('.input-task')) $inputEstNum.focus();
    if (e.target.matches('.input-est-num')) $saveBtn.focus();
  });

  $inputTask.addEventListener('keyup', e => {
    if (!e.target.value) $saveBtn.classList.remove('active');
    else $saveBtn.classList.add('active');
  });

  $increaseEstBtn.addEventListener('click', () => {
    ++$inputEstNum.value;
  });

  $decreaseEstBtn.addEventListener('click', () => {
    if ($inputEstNum.value < 2) return;
    --$inputEstNum.value;
  });

  $addTaskBtnContainer.addEventListener('click', e => {
    if (e.target.matches('.cancel-btn')) {
      $addTaskBtn.classList.add('active');
      $addTaskContainer.classList.remove('active');
    } else if (e.target.matches('.save-btn') && $inputTask.value) {
      addTask($inputTask.value, +$inputEstNum.value);
      $saveBtn.classList.remove('active');
      $inputTask.focus();
    }

    $inputTask.value = '';
    $inputEstNum.value = 1;
  });

  $tasks.addEventListener('click', e => {
    const targetTask = e.target.closest('.task');

    if (e.target.matches('.remove-icon')) {
      removeTask(targetTask.id);
    } else if (
      e.target.matches('.check-icon') ||
      e.target.matches('.checkbox')
    ) {
      toggleTask(targetTask.id);
    } else {
      activateTask(targetTask.id);
    }
  });

  $removeCompletedTasksBtn.addEventListener('click', () => {
    removeCompletedTasks();
  });

  $time.addEventListener('timeEnd', () => {
    if (timerState.state !== 'pomodoro') return;

    updateAct();
    updateLeftEst();
  });

  $settingsSubmitBtn.addEventListener('click', () => {
    updateCurrentProgress();
  });
}
