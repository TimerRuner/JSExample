/**
 * Function inputErrorTemplate
 * @param {String} msg
 */
function inputErrorTemplate(msg) {
  return `
    <div class="invalid-feedback">${msg}</div>
  `;
}

/**
 * Function inputWarningTemplate
 * @param {String} msg
*/
function inputWarningTemplate(msg){
  return `
    <div class="warning-feedback invalid-feedback">${msg}</div>
  `;
}

/**
 * Function showInputError. Add input error
 * @param {HTMLInputElement} el
 */
export function showInputError(el) {
  const parent = el.parentElement;
  const msg = el.dataset.invalidMessage || 'Invalid input';
  const template = inputErrorTemplate(msg);
  el.classList.add('is-invalid');
  parent.insertAdjacentHTML('beforeend', template);
}
/**
 * Function removeInputError. Remove input error
 * @param {HTMLInputElement} el
 */
export function removeInputError(el) {
  const parent = el.parentElement;
  const err = parent.querySelector('.invalid-feedback');
  if (!err) return;

  el.classList.remove('is-invalid');
  parent.removeChild(err);
}

/**
 * Function removeInputWarning. Remove warning message
 * @param {HtmlInputElement} el
*/
export function removeInputWarning(el){
  const parent = el.parentElement;
  const err = parent.querySelector('.invalid-feedback.warning-feedback');
  if (!err) return;

  el.classList.remove('is-invalid');
  parent.removeChild(err);
}
/**
 *Function warningInputMsg
 * @param {HtmlInputElement} el
 */
export function showInputWarning(el){
  const parent = el.parentElement;
  const msg = el.dataset.warning || 'Enter corect value';
  const template = inputWarningTemplate(msg);
  el.classList.add('is-invalid');
  parent.insertAdjacentHTML('beforeend', template);
}
