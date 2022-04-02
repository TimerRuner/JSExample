const checkTextInputs = (selector) => {
  const txtInputs = document.querySelectorAll(selector);

  txtInputs.forEach(input => {
      input.addEventListener('keypress', function(e) {
          if (e.key.match(/[^A-Z]/ig)) {
            e.preventDefault();
          }
      });
  });
};

export default checkTextInputs;