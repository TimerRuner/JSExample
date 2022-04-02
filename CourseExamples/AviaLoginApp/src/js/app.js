import '../css/style.css';
import './plugins/axios/axios';
import './plugins/axios/interceptors';
import './plugins/materialize/materialize';
import locations from './store/locations';
import favourite from './store/favourite';
import formUI from './views/formUI';
import ticketsUI from './views/tickets';
import currencyUI from './views/currency';
import favouriteTicket from './views/favouriteTicket';

import 'bootstrap/dist/css/bootstrap.css';
import UI from './config/ui.config';
import sing from './config/singup.config'
import { validate } from './helpers/validate';
import { showInputError, removeInputError, showInputWarning, removeInputWarning } from './views/inputNotify';
import { login, singUp } from './services/auth.service';
import { notify } from './views/notifications';
import { getNews } from './services/news.service';
import mask from './helpers/mask';
import checkNumInput from './helpers/checkTextInput';
import local from './store/local';
import checkTextInputs from './helpers/chechInputLanguage';
// import autocomplete from './views/autocomplite';

import './views/tab';

const { form, inputEmail, inputPassword } = UI;
const {formSing, email, password, nikname, name, surname, phone, sex, city, country, birthday} = sing;
const inputs = [inputEmail, inputPassword];
const singInputs = [email, password, nikname, name, surname, phone, sex, city, country, birthday];


document.addEventListener('DOMContentLoaded', e => {
  const formApp = formUI.form;
  const container = document.querySelector('.tickets-sections');
  const deleteFavourite = document.querySelector('.dropdown-content');
  const favouriteCounter = document.querySelector('.favorites-counter span');
  const locationInput = document.querySelectorAll('[data-warning]');
  const countryInput = document.getElementById('autocomplete-country');

  mask('#phone-auth');
  checkNumInput('._text-only');
  checkTextInputs('#autocomplete-country');
  checkTextInputs('#autocomplete-city');
  inputs.forEach(el => el.addEventListener('focus', () => removeInputError(el)));
  singInputs.forEach(el => el.addEventListener('focus', () => removeInputError(el)));
  // Events
  initApp();
  formApp.addEventListener('submit', e => {
    e.preventDefault();
    onFormSubmit();
  });
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    onSubmit();
  });
  formSing.addEventListener('submit', (e) => {
    e.preventDefault();
    onSingUp();
  });
  container.addEventListener('click', (e) => {
    let target = e.target;
    if(target.classList.contains('add-favorite')){
      const parent = target.closest('.ticket-item');
      const ticketData = {
        airline_logo: parent.querySelector('.ticket-airline-img').getAttribute('src'),
        airline_name: parent.querySelector('.ticket-airline-name').textContent,
        origin_name: parent.querySelector('.ticket-origin').textContent,
        destination_name: parent.querySelector('.ticket-destination .ticket-destination').textContent,
        departure_at: parent.querySelector('.ticket-time-departure').textContent,
        price: parent.querySelector('.ticket-price').textContent,
        transfers: parent.querySelector('.ticket-transfers').textContent,
        flight_number: parent.querySelector('.ticket-flight-number').textContent,
        index: parent.dataset.index,
      };
      favourite.setTicketInfo(ticketData);
      favouriteTicket.renderFavourite(favourite.getTicketInfo());
      parent.remove();
      favouriteCounter.textContent = favouriteTicket.renderCount();
    }
  });
  deleteFavourite.addEventListener('click', (e) => {
    const target = e.target;
    if(target.classList.contains('delete-favorite')) {
      const count = target.closest('.favorite-item').dataset.index;
      document.querySelector(`[data-index="${count}"]`).remove();
      favouriteTicket.removeItem(count);
      favouriteTicket.checkData();
      favouriteCounter.textContent = favouriteTicket.renderCount();
    }
  });
  locationInput.forEach(input => {
    input.addEventListener('focus', (e) => {
      showInputWarning(e.target);
    });
    input.addEventListener('input', (e) => {
      removeInputWarning(e.target);
    });
  });
  countryInput.addEventListener('change', (e) => {
    const valid = local.checkValidCountries(e.target.value);
    if(valid){
      document.getElementById('autocompolete-city').removeAttribute('disabled');
      const countryCode = local.getCodeCountry(e.target.value);
      const cities = local.getCities(countryCode);
      cities.then(cities => formUI.setAutocompleteCity(cities));
    }
  });


  // handlers
  async function initApp() {
    await locations.init();
    await local.init();
    favouriteTicket.init();
    formUI.setAutocompleteCountry(local.shortCoutries);
    formUI.setAutocompleteData(locations.shortCities);
  };

  async function onFormSubmit() {
    const origin = locations.getCityCodeByKey(formUI.originValue);
    const destination = locations.getCityCodeByKey(formUI.destinationValue);
    const depart_date = formUI.departDateValue;
    const return_date = formUI.returnDateValue;
    const currency = currencyUI.currecyValue;
    await locations.fetchTickets({
      origin,
      destination,
      depart_date,
      return_date,
      currency,
    });
    ticketsUI.renderTickets(locations.lastSearch);
  }
  async function onSubmit() {
    inputs.forEach(el  => removeInputError(el));
    if (!checkValidation(inputs)) return;

    try {
      await login(inputEmail.value, inputPassword.value);
      await getNews();
      form.reset();
      notify({ msg: 'Login success', className: 'alert-success' });
      open('.login-page-wrapp', '.avia-ticket-wrapper');
    } catch (err) {
      notify({ mas: 'Login faild', className: 'alert-danger' });
    }
  }

  function open(loginClass, appClass) {
    const login = document.querySelector(loginClass),
          app = document.querySelector(appClass);
    login.classList.add('locked');
    app.classList.add('locked');
  }
   async function onSingUp() {
    singInputs.forEach(el => removeInputError(el));
    if (!checkValidation(singInputs)) return;

    try {
      await singUp(
        email.value,
        password.value,
        nikname.value,
        name.value,
        surname.value,
        phone.value,
        sex.value,
        city.value,
        country.value,
        getBirthday(birthday.value)
        );

      formSing.reset();
      notify({ msg: 'SingUp success', className: 'alert-success' });
    } catch (err) {
      notify({ mas: 'SingUp faild', className: 'alert-danger' });
    }
  }

  function getBirthday(data){
    const birthData = data.split('-');
    return {
      date_of_birth_day: birthData[0],
      date_of_birth_month: birthData[1],
      date_of_birth_year: birthData[2]
    }
  }
  function checkValidation(inputs){
    const isValidForm = inputs.every(el => {
      const isValidInput = validate(el);
      if (!isValidInput) {
        showInputError(el);
      }
      return isValidInput;
    });
    return isValidForm;
  }
});
