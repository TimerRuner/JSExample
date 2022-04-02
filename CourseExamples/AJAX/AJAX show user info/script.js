const apiURL = "https://jsonplaceholder.typicode.com";//? адрес сервера яким ми користуватимемось
    // DOM Elements
    const usersListEl = document.querySelector(".users-list");//? елемент відповідає за зберігання ліста
    const userInfoEl = document.querySelector(".user-info");

    //! вішаємо подіюю на бітьківський елемент і слухаємо клік для усіх його дочірніх елементів
    usersListEl.addEventListener("click", onUserClickHandler);

    // Event handlers
    function onUserClickHandler(e) {
      e.preventDefault();

      if (e.target.dataset.userId) {//! якщо є елемент із даним атребутом
        getUserHTTP(e.target.dataset.userId, onGetUserInfoCallback);//! передаємо id  і рендеринг інформації для поточного користувача
      }
    }

    //?  метод отримання користувачів----------------------------------------------------------
    function getUsersHTTP(cb) {
      const xhr = new XMLHttpRequest();

      xhr.open("GET", `${apiURL}/users`);//! робимо запит користувачів за даним API

      //?! при отриманні відповіді від сервера опрацюємо дані
      xhr.addEventListener("load", () => {
        console.log(xhr);
        if (xhr.status !== 200) {//! якщо статус не повертає 200
          console.log("Error", xhr.status);
          return;
        }

        const res = JSON.parse(xhr.responseText);//! отримуємо відповідь від сервера у вигляді масива
        cb(res);
      });

      xhr.send();
    }

    //! колбек для опрацюванню даних-------------------------------------------------------
    function onGetUsersCallback(users) {
      if (!users.length) {//! якщо довжина масиву користувачів відсутня виходимо
        return;
      }

      renderUsersList(users);
    }
    // ? створення ліста користувачів ------------------------------------------------------------
    function renderUsersList(users) {
      //! розмітку у вигляді строки із кожним елементом, конкатинуємо в один фрагмент
      let fragment = users.reduce((acc, user) => {
        return acc + userListItemTemplate(user);
      }, "");

      usersListEl.insertAdjacentHTML("afterbegin", fragment);
    }

    //! Метод створення одного користувача----------------------------------------------------------
    function userListItemTemplate(user) {
      // !На каждый элемент списка мы устанавливаем атрибут data-user-id что бы потом по нему получить информацию о пользователе
      return `
      <button type="button" class="list-group-item list-group-item-action" data-user-id="${user.id}">
        ${user.name}
      </button>
      `;
    }

    //! метод отриманя інформації про поточного користувача
    function getUserHTTP(id, cb) {
      const xhr = new XMLHttpRequest();

      xhr.open("GET", `${apiURL}/users/${id}`);

      xhr.addEventListener("load", () => {
        console.log(xhr);
        if (xhr.status !== 200) {
          console.log("Error", xhr.status);
          return;
        }

        const res = JSON.parse(xhr.responseText);
        cb(res);
      });

      xhr.send();
    }

    //? колбек на отримання розгорнутої інформації по клієнту
    function onGetUserInfoCallback(user) {
      if (!user.id) {
        console.log("User not found");
        return;
      }

      renderUserInfo(user);
    }


    //? метод для закидування шаблону із відрендереними користувачами в розмітку
    function renderUserInfo(user) {
      userInfoEl.innerHTML = "";//! перш ніж щось туди закинути, чистиму контейнер

      const template = userDetailedInfoTemplate(user);

      userInfoEl.insertAdjacentHTML("afterbegin", template);
    }


//! рендер розмітки для поточного користувача
    function userDetailedInfoTemplate(user) {
      return `
      <div class="card border-dark mb-3">
        <div class="card-header">${user.name}</div>
        <div class="card-body text-dark">
          <h5 class="card-title">${user.email}</h5>
          <ul class="list-group list-group-flush">
            <li class="list-group-item"><b>Nickname:</b> ${user.username}</li>
            <li class="list-group-item"><b>Website:</b> ${user.website}</li>
            <li class="list-group-item"><b>Company:</b> ${user.company.name}</li>
            <li class="list-group-item"><b>City:</b> ${user.address.city}</li>
          </ul>
        </div>
        <div class="card-footer bg-transparent border-dark">Phone: ${user.phone}</div>
      </div>
      `;
    }

    // Init App
    getUsersHTTP(onGetUsersCallback);