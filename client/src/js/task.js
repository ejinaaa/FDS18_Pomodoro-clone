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

  // Events
  $inputTask.addEventListener('keyup', e => {
    if (!e.target.value) $saveBtn.classList.remove('active');
    else $saveBtn.classList.add('active');
  })
  
  $addTaskBtn.addEventListener('click', () => {
    $addTaskBtn.classList.remove('active');
    $addTaskContainer.classList.add('active');
    $inputTask.focus();
  });

  $addTaskBtnContainer.addEventListener('click', e => {
    if (e.target.matches('.cancel-btn')) {
      $addTaskBtn.classList.add('active');
      $addTaskContainer.classList.remove('active');
    } else if (e.target.matches('.save-btn') && $inputTask.value) {
      addTask();
      render();
    }

    $inputTask.value = '';
    $inputEstNum.value = 1;
  });

  $increaseEstBtn.addEventListener('click', () => {
    ++$inputEstNum.value
  });

  $decreaseEstBtn.addEventListener('click', () => {
    if ($inputEstNum.value < 2) return;
    --$inputEstNum.value
  });

  $tasks.addEventListener('click', e => {
    const targetId = e.target.closest('.task').id;

    if (e.target.matches('.remove-icon')) {
      removeTask(targetId);
    } else if (e.target.matches('.check-icon')) {
      toggleTask(targetId);
    }

    render();
  });

  $removeCompletedTasksBtn.addEventListener('click', () => {
    removeCompletedTasks();
    render();
  });
};