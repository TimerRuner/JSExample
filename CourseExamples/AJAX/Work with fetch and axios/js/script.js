window.addEventListener("DOMContentLoaded", () => {

  const form = document.querySelector('form');

  let formData = new FormData(form);
      formData.append("id", Math.random());//! дозаписуємо поле

    //!  заповняємо пустий об'єкт данними взятими із форми
    let obj = {};
    formData.forEach((value, key) => {
      obj[key] = value;
    });

  getResourceFetch('http://localhost:3000/people', obj)
      .then(data=>console.log(data))
      .catch(err => console.error(err));

//! робота із fetch
  async function getResourceFetch(url, data){
    const res = await fetch(`${url}`, {
      method: "POST",
      headers: {
        "Content-type": "application.json"
      },
      body: JSON.stringify(data)
    });

    if(!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  }


  //! робота із axios
  async function getResourceAxios(url){
    const res = await axios(`${url}`);

    if(res.status !== 200) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  }
  axios.post('http://localhost:3000/people', obj); //! приклад відправки даних на сервер через аxios
});