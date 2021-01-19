export default function task() {
  // Nodes
  const $addTaskBtn = document.querySelector('.add-task-btn');
  const $addTaskContainer = document.querySelector('.add-task-container');
  const $inputTask = document.querySelector('.add-task-container .input-task');
  const $tasks = document.querySelector('.tasks');
  const $inputEstNum = document.querySelector('.input-est-num');
  const $removeCompletedTasksBtn = document.querySelector('.remove-completed-tasks-btn');
  const $currentProgress = document.querySelector('.current-progress');
  const $addTaskBtnContainer = document.querySelector('.add-task-container .btn-container');
  const $increaseEstBtn = document.querySelector('.set-est-container .increase-btn');
  const $decreaseEstBtn = document.querySelector('.set-est-container .decrease-btn');
  const $currentEst = document.querySelector('.current-progress .est .num');
  const $currentAct = document.querySelector('.current-progress .act .num');
  const $currentFinishTime = document.querySelector('.current-progress .finish-time .num');
  const $activeTaskSubject = document.querySelector('.active-task');
  const $saveBtn = document.querySelector('.save-btn');
  const $msgContainer = document.querySelector('.msg-container');

  let tasks = [];
  let pomodoroTime = 1;
  let shorBreakTime = 1;
  let longBreakTime = 0;
  let longBreakInterval = 0;

  // Functions
  const render = (() => {
    const getTemplate = task => {
      return `<li id="${task.id}" class="task ${task.active ? 'active' : ''}">
      <input type="checkbox" id="ck-${task.id}" class="checkbox" ${task.completed? 'checked' : ''}/>
      <label for="ck-${task.id}"><i class="fas fa-check-circle check-icon"></i></label>
      <span class="task-subject">${task.content}</span>
      <span class="est-counter">
        <span class="est-done">${task.leftEst}</span>
        /${task.allEst}
      </span>
      <button class="remove-task-btn">
        <i class="fas fa-minus-circle remove-icon"></i>
      </button>
    </li>`
    };
    
    return () => {
      $tasks.innerHTML = tasks.map(task => getTemplate(task)).join('');

      if (tasks.length) $currentProgress.classList.add('active');
      else {
        $currentProgress.classList.remove('active');
        $msgContainer.classList.remove('active');
      }

      $currentEst.textContent = countCurrentEst();
      $currentFinishTime.textContent = countCurrentFinishTime();
    };
  })();

  const addTask = (() => {
    const generateId = () => {
      return Math.max(...tasks.map(task => task.id), 0) + 1;
    };

    return () => {
      tasks = [{id: generateId(), content: $inputTask.value, allEst: +$inputEstNum.value, leftEst: 0, completed: false, active: false }, ...tasks];
    };
  })();

  const removeTask = targetId => {
    tasks = tasks.filter(({ id }) => +targetId !== id);
  };

  const toggleTask = targetId => {
    tasks = tasks.map(task => ({ id: task.id, content: task.content, allEst: task.allEst, leftEst: task.leftEst, completed: +targetId === task.id ? !task.completed : task.completed, active: task.active }));
  };

  const removeCompletedTasks = () => {
    tasks = tasks.filter(({ completed }) => !completed);
  };

  const countCurrentEst = () => {
    return tasks.reduce((acc, { allEst }) => acc + allEst, 0);
  };

  const countCurrentFinishTime = () => {
    const currentTime = new Date();
    const pomoMinutes = pomodoroTime * countCurrentEst() + shorBreakTime * (countCurrentEst() - 1) + longBreakTime * longBreakInterval;
    const totalMinutes = currentTime.getHours() * 60 + currentTime.getMinutes() + pomoMinutes;
    const totalTime = `${Math.floor(totalMinutes / 60)} : ${('' + totalMinutes % 60).length === 1 ? ('0' + totalMinutes % 60) : (totalMinutes % 60)}`

    return totalTime;
  };

  const activateTask = targetId => {
    tasks = tasks.map(task => ({ id: task.id, content: task.content, allEst: task.allEst, leftEst: task.leftEst, completed: task.completed, active: !!(+targetId === task.id) }));
  };

  // Events
  $addTaskBtn.addEventListener('click', () => {
    $addTaskBtn.classList.remove('active');
    $addTaskContainer.classList.add('active');
    $inputTask.focus();
  });

  $addTaskContainer.addEventListener('keyup', e => {
    if (e.key !== 'Enter' || !$inputTask.value) return;
    else {
      if (e.target.matches('.input-task')) $inputEstNum.focus();
      if (e.target.matches('.input-est-num')) $saveBtn.focus();
    }
  });

  $inputTask.addEventListener('keyup', e => {
    if (!e.target.value) $saveBtn.classList.remove('active');
    else $saveBtn.classList.add('active');
  });

  $increaseEstBtn.addEventListener('click', () => {
    ++$inputEstNum.value
  });

  $decreaseEstBtn.addEventListener('click', () => {
    if ($inputEstNum.value < 2) return;
    --$inputEstNum.value
  });

  $addTaskBtnContainer.addEventListener('click', e => {
    if (e.target.matches('.cancel-btn')) {
      $addTaskBtn.classList.add('active');
      $addTaskContainer.classList.remove('active');
    } else if (e.target.matches('.save-btn') && $inputTask.value) {
      addTask();
      render();

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
    } else if (e.target.matches('.check-icon')) {
      toggleTask(targetTask.id);
    } else {
      activateTask(targetTask.id);
      $msgContainer.classList.add('active');
      $activeTaskSubject.textContent = targetTask.children[2].textContent;
    }
    
    render();
  });

  $removeCompletedTasksBtn.addEventListener('click', () => {
    removeCompletedTasks();
    render();
  });
};