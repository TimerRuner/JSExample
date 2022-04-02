
const apiURL = "https://jsonplaceholder.typicode.com";
      // DOM Elements
      const form = document.forms["new-user-form"];
      const usersListEl = document.querySelector(".users-list");

      // Events
      form.addEventListener("submit", onFormSubmit);

      // Event handlers
      function onFormSubmit(e) {
        e.preventDefault();

        //? знайшли кнопку форми
        const inputs = [...form.elements].filter(
          (el) => el.nodeName !== "BUTTON"
        );
        //? створили об'єкт із параметрами - ім'я поля: значення поля
        const objValues = inputs.reduce((acc, input) => {
          acc[input.name] = input.value;
          return acc;
        }, {});
        //! передаємо дані на сервер через об'єкт і виводимо в розмітку через колбек
        addNewUserHTTP(objValues, onAddUserCallback);
      }

      // !HTTP----------------------------------------------
      function addNewUserHTTP(data, cb) {
        const xhr = new XMLHttpRequest();

        xhr.open("POST", `${apiURL}/users`);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.addEventListener("load", () => {
          console.log(xhr);
          if (Math.floor(xhr.status / 100) !== 2) {
            console.log("Error", xhr.status);
            return;
          }

          const res = JSON.parse(xhr.responseText);
          cb(res);
        });

        xhr.send(JSON.stringify(data));
      }

      // !HTTP Callbacks ---------------------------------------------
      function onAddUserCallback(newUser) {
        if (!newUser.id) {
          return;
        }

        renderNewUserToList(newUser);
      }

      // !Render--------------------------------------------------------
      function renderNewUserToList(user) {
        const template = userListItemTemplate(user);
        usersListEl.insertAdjacentHTML("beforeend", template);
      }

      // !Templates--------------------------------------------------
      function userListItemTemplate(user) {
        return `
          <div class="list-group-item list-group-item-action">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">${user.name || ""}</h5>
              <small>${user.phone || ""}</small>
            </div>
            <p class="mb-1">${user.email || ""}</p>
            <small>${user.website || ""}</small>
          </div>
        `;
      }