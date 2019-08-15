const form = document.querySelector('.js-form');
const input = form.querySelector('input');
const greetings = document.querySelector('.js-greetings');

const USER_STORAGE = 'currentUser';
const SHOWING_CLASS = 'showing';

function saveItem(value) {
    localStorage.setItem(USER_STORAGE, value);
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = input.value;
    paintGreetings(currentValue);
    saveItem(currentValue);
}

function askForName() {
    form.classList.add(SHOWING_CLASS);
    form.addEventListener('submit', handleSubmit);
}

function paintGreetings(text) {
    form.classList.remove(SHOWING_CLASS);
    greetings.classList.add(SHOWING_CLASS);
    greetings.innerText = `Hello ${text}`;
}

function loadName() {
    const currentUser = localStorage.getItem(USER_STORAGE);
    
    if(!currentUser) {
        askForName();
    } else {
        paintGreetings(currentUser);
    }
}

function init() {
    loadName();
}

init();