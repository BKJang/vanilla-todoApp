const form = document.querySelector('.js-form');
const input = form.querySelector('input');
const greetings = document.querySelector('.js-greetings');

const USER_STORAGE = 'currentUser';
const SHOWING_CLASS = 'showing';

function paintGreetings(text) {
    form.classList.remove(SHOWING_CLASS);
    greetings.classList.add(SHOWING_CLASS);
    greetings.innerText = `Hello ${text}`;
}

function loadName() {
    const currentUser = localStorage.getItem(USER_STORAGE);
    if(!currentUser) {
        //TODO 사용자 정보가 localStorage에 없을 때 처리
    } else {
        paintGreetings(currentUser);
    }
}

function init() {
    loadName();
}

init();