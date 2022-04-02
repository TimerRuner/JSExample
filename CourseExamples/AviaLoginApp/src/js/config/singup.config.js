const sing = {
  formSing: document.forms['authForm'],
  email: document.getElementById('email-auth'),
  password: document.getElementById('password-auth'),
  nikname: document.getElementById('nikname-auth'),
  name: document.getElementById('name-auth'),
  surname: document.getElementById('surname-auth'),
  phone: document.getElementById('phone-auth'),
  sex: document.querySelector('[name="sex"]'),
  city: document.getElementById('autocompolete-city'),
  country: document.getElementById('autocomplete-country'),
  birthday: document.getElementById('datepicker-birthday')
};


export default sing;