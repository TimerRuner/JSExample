const checkNumInput = (selector) => {
    const numInputs = document.querySelectorAll(selector);
  
    numInputs.forEach(item => {
      item.addEventListener('input', () => {
        item.value = item.value.replace(/\d/, '');
      });
    });
  
  };
  
  export default checkNumInput;