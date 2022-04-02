import {
  getAutocompleteInstance,
  getDatePickerInstance,
} from '../plugins/materialize/materialize';

class FormUI {
  constructor(autocompleteInstance, datePickerInstance) {
    this.$form = document.forms['locationControls'];

    this.origin = document.getElementById('autocomplete-origin');
    this.originAutocomplete = autocompleteInstance(this.origin);

    this.destination = document.getElementById('autocomplete-destination');
    this.destinationAutocomplete = autocompleteInstance(this.destination);
    // console.log(this.destination, this.destinationAutocomplete);

    this.country = document.getElementById('autocomplete-country');
    this.autocompleteCountry = autocompleteInstance(this.country);

    this.city = document.getElementById('autocompolete-city');
    this.autocompleteCity= autocompleteInstance(this.city);

    this.depart = datePickerInstance(
      document.getElementById('datepicker-depart'),
    );
    this.return = datePickerInstance(
      document.getElementById('datepicker-return'),
    );

  }

  get form() {
    return this.$form;
  }

  get originValue() {
    return this.origin.value;
  }

  get destinationValue() {
    return this.destination.value;
  }

  get departDateValue() {
    return this.depart.toString();
  }

  get returnDateValue() {
    return this.return.toString();
  }

  setAutocompleteData(data) {
    this.originAutocomplete.updateData(data);
    this.destinationAutocomplete.updateData(data);
  }

  setAutocompleteCity(data) {
    this.autocompleteCity.updateData(data);
  }

  setAutocompleteCountry(data){
    this.autocompleteCountry.updateData(data);
  }
}

const formUI = new FormUI(getAutocompleteInstance, getDatePickerInstance);

export default formUI;
