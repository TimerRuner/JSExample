import axios from '../plugins/axios/axios';

/**
 * Funxtion login. Make login request to API
 * @param {String} email
 * @param {String} password
 */
export async function login(email, password) {
  try {
    const response = await axios.post(
      `/auth/login`,
      JSON.stringify({ email, password }),
    );
    return response.data;
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
}

export async function singUp(
  email,
  password,
  nickname,
  first_name,
  last_name,
  phone,
  gender_orientation,
  city,
  country,
  {date_of_birth_day, date_of_birth_month, date_of_birth_year} = {}
  ) {
  try {
    console.log(
      email,
      password,
      nickname,
      first_name,
      last_name,
      phone,
      gender_orientation,
      city,
      country,
      date_of_birth_day,
      date_of_birth_month,
      date_of_birth_year
    )
    const response = await axios.post(
      `/auth/signup`,
      JSON.stringify({
        email,
        password,
        nickname,
        first_name,
        last_name,
        phone,
        gender_orientation,
        city,
        country,
        date_of_birth_day,
        date_of_birth_month,
        date_of_birth_year
      }),
    );

    return response.data;
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
}



class Api {

  constructor() {}

  async getCountries(){
    try {
      const response = await axios.get(
        `/location/get-countries`
      );

      return response;
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  }

  async getCities(country_index){
    try {
      const response = await axios.get(
        `location/get-cities/${country_index}`
      );

      return response;
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  }
}

export const api = new Api();
