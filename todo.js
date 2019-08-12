const toDoHead = document.querySelector('.js-toDoHead');
const toDoDate = toDoHead.querySelector('h1');
const toDoWeekDay = toDoHead.querySelector('.day');
const toDoTasksLeft = toDoHead.querySelector('.tasks-left')
const toDoForm = document.querySelector('.js-toDoForm');
const toDoInput = toDoForm.querySelector('.js-todoInput');
const toDoList = document.querySelector('.js-toDoList');
const toDoBtn = document.querySelector('.js-todoBtn');

const TODO_LIST = 'toDos';

let toDos = [];
let openTodoInput = false;

function filterToDo(toDo, targetId) {
  return toDo.id !== Number(targetId);
}

function deleteToDo(event) {
  if (event.target.tagName === 'BUTTON') {
    const targetId = event.target.parentNode.id;
    const li = event.target.parentNode;

    toDoList.removeChild(li);

    const cleanToDos = toDos.filter((item) => { return filterToDo(item, targetId) })
    toDos = cleanToDos;
    saveToDo();
  }
}

function saveToDo() {
  localStorage.setItem(TODO_LIST, JSON.stringify(toDos));
}

function paintToDo(value) {
  const li = document.createElement('li');
  const deleteBtn = document.createElement('button');
  const span = document.createElement('span');
  const toDoId = toDos.length + 1;

  deleteBtn.innerText = 'X';
  span.innerText = value;

  li.appendChild(span);
  li.appendChild(deleteBtn);
  li.id = toDoId;

  toDoList.appendChild(li);

  const toDoObj = {
    id: toDoId,
    todo: value,
  }

  toDos.push(toDoObj);
  saveToDo();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = '';
}

function handleTodoButton() {
  toDoBtn.addEventListener('click', function () {
    openTodoInput = !openTodoInput;

    if (openTodoInput) {
      toDoInput.classList.add('input-open');
      toDoBtn.classList.add('btn-open');
    } else {
      toDoInput.classList.remove('input-open');
      toDoBtn.classList.remove('btn-open');
    }
  });
}

function loadDate() {
  const today = new Date();
  const dateString = today.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const day = today.toLocaleDateString('ko-KR', {
    weekday: 'long',
  })

  toDoDate.insertAdjacentText('afterbegin', dateString);
  toDoWeekDay.insertAdjacentText('afterbegin', day);
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODO_LIST);

  if (loadedToDos) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.map((item) => {
      return paintToDo(item.todo);
    });
  }

  toDoList.addEventListener('click', function (event) {
    deleteToDo(event);
  });
}

function init() {
  loadToDos();
  loadDate();
  handleTodoButton();
  toDoForm.addEventListener('submit', handleSubmit);
}

init();