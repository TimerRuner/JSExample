window.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector('form');



  function req(e) {
    e.preventDefault();

    //! записуємо дані із форми в даний об'єкт
    let formData = new FormData(form);
    formData.append("id", Math.random());//! дозаписуємо поле

    //!  заповняємо пустий об'єкт данними взятими із форми
    let obj = {};
    formData.forEach((value, key) => {
      obj[key] = value;
    });
    let json = JSON.stringify(obj); //! звичаний об'єкт переводиться в json тип

    const request = new XMLHttpRequest();
    request.open("POST", "http://localhost:3000/people");
    request.setRequestHeader("Content-type", "application/json; charset=utf-8"); //! щоб серевер знав із якими данними ми працюємо
    request.send(json);
    request.addEventListener('readystatechange', function() { //! спосіб перевірки статусу запиту readystatechange(всі стадії) / load(лише отримані)
      if(request.readyState === 4 && request.status === 200){ //! якщо всі дані з серевера отримані і отримані успішно, виконаєм дану умову
        let data = JSON.parse(request.response);
        console.log(data);
      } else {
        console.error("щось пішло не так!");
      }
    });

    // this.remove();
  }

  document.querySelector('button').addEventListener('click', (e) => req(e), {"once": true});

});