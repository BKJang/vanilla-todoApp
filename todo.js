const toDoForm = document.querySelector('.js-toDoForm');
const toDoInput = toDoForm.querySelector('input');
const toDoList = document.querySelector('.js-toDoList')

const TODO_LIST = 'toDos';

let toDos = [];

function filterToDo(toDo, targetId) {
    return toDo.id !== Number(targetId);
}

function deleteToDo(event) {
    if(event.target.tagName === 'BUTTON') {
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
        id : toDoId,
        todo : value,
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

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODO_LIST);

    if(loadedToDos) {
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.map((item) => {
            return paintToDo(item.todo);
        });
    }

    toDoList.addEventListener('click', function(event) {
        deleteToDo(event);
    });
}

function init() {
    loadToDos();
    toDoForm.addEventListener('submit', handleSubmit);
}

init();