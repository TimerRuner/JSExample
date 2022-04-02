import './styles.css';

import { isValid, createModal } from './utils';
import { Question } from './question';
import { getAuthForm, authWithEmailAndPassword } from './auth';

const form = document.getElementById('form');
const input = form.querySelector('#questions-input');
const button = form.querySelector('#submit');
const modalBtn = document.getElementById('modal-btn');

window.addEventListener('load', Question.renderList);
form.addEventListener('submit', submitFormHandler);
input.addEventListener('input', () => button.disabled = !isValid(input.value));
modalBtn.addEventListener('click', openModal);

function submitFormHandler(event){
  event.preventDefault()

  if(isValid(input.value)){
    const question = {
      text: input.value.trim(),
      data: new Date().toJSON()
    }

    button.disabled = true;
    //Async request to server to save question
    Question.create(question).then(() => {
      input.value = '';
      input.className = '';
      button.disabled = false;
    });


  }
}



function openModal(){
  createModal('Авторизаця', getAuthForm());
  document
    .getElementById('auth-form')
    .addEventListener('submit', authFormHandler, {once: true});


}

function authFormHandler(event){
  event.preventDefault();
  const email = event.target.querySelector('#email').value;
  const password = event.target.querySelector('#password').value;
  const btn = event.target.querySelector('button');

  btn.disabled = true;
  authWithEmailAndPassword(email, password)
    .then(Question.fetch)
    .then(renderModalAfterAuth)
    .then(() => {btn.disabled = false});
}

function renderModalAfterAuth(content){
  if (typeof content === 'string'){
    createModal('Помилка', content);
  } else {
    createModal('Список питань', Question.listToHtml(content));
  }
}