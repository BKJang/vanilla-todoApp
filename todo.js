const toDoForm = document.querySelector('.js-toDoForm');
const toDoInput = toDoForm.querySelector('input');
const toDoList = document.querySelector('.js-toDoList')

const TODO_LIST = 'toDos';

function paintToDo(value) {
    const li = document.createElement('li');
    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'X';
    const span = document.createElement('span');
    span.innerText = value;
    
    li.appendChild(span);
    li.appendChild(deleteBtn);

    toDoList.appendChild(li);
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = '';
}

function loadTodos() {
    const toDos = localStorage.getItem(TODO_LIST);

    if(toDos) {

    }
}

function init() {
    loadTodos();
    toDoForm.addEventListener('submit', handleSubmit);
}

init();