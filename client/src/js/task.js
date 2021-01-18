export default function task() {
  // Nodes
  const $addTaskBtn = document.querySelector('.add-task-btn');
  const $addTaskContainer = document.querySelector('.add-task-container');
  const $inputTask = document.querySelector('.add-task-container .input-task');
  const $cancelTaskBtn = document.querySelector('.add-task-container .cancel-btn');
  const $saveTaskBtn = document.querySelector('.add-task-container .save-btn');
  const $tasks = document.querySelector('.tasks');
  const $inputEstNum = document.querySelector('.input-est-num');

  let tasks = [];

  // Functions
  const render = (() => {
    const getTemplate = task => {
      return `<li id="${task.id}" class="task">
      <input type="checkbox" id="ck-${task.id}" class="checkbox" ${task.completed? 'checked' : ''}/>
      <label for="ck-${task.id}" class="task-subject">
        <i class="fas fa-check-circle check-icon"></i>
        ${task.content}
      </label>
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
      $tasks.innerHTML = tasks.map(task => getTemplate(task)).join('')
    };
  })();

  const addTask = (() => {
    const generateId = () => {
      return Math.max(...tasks.map(task => task.id), 0) + 1;
    };

    return () => {
      tasks = [{id: generateId(), content: $inputTask.value, allEst: +$inputEstNum.value, leftEst: 0, completed: false}, ...tasks];
    };
  })();

  const removeTask = targetId => {
    tasks = tasks.filter(({ id }) => +targetId !== id);
  };

  // Events
  $addTaskBtn.addEventListener('click', () => {
    $addTaskBtn.classList.remove('active');
    $addTaskContainer.classList.add('active');
  });
  
  $saveTaskBtn.addEventListener('click', () => {
    if (!$inputTask.value) return;

    addTask();
    render();

    $inputTask.value = '';
  });

  $cancelTaskBtn.addEventListener('click', () => {
    $addTaskBtn.classList.add('active');
    $addTaskContainer.classList.remove('active');
    
    $inputTask.value = '';
  });

  $tasks.addEventListener('click', e => {
    if (e.target.matches('.remove-icon')) removeTask(e.target.parentNode.parentNode.id);
    render();
  });
};