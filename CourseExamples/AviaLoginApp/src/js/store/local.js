import { api } from '../services/auth.service';

class Location {
    constructor(api){
        this.api = api;
        this.countries = null;
        this.cities = null;
        this.shortCoutries = {};
        this.shortCity = [];
    }
    async init(){
        const response = await Promise.all([
            this.api.getCountries(),
        ]);

        const [countries] = response;
        this.countries = countries;
        this.shortCoutries = this.createShortCountries(this.countries);

        return response;
    }

    createShortCountries(countries) {
        return Object.values(countries).reduce((acc, countrie) => {
            acc[countrie] = null;
            return acc;
        }, {});
    }
    createShortCities(cities) {
        return Object.values(cities).reduce((acc, city) => {
            acc[city] = null;
            return acc;
        }, {});
    }
    checkValidCountries(country){
        let res = false;
        for(let key in this.shortCoutries){
            if(key === country){
                res = true;
            }
        }
        return res;
    }
    getCodeCountry(country) {
        let code = null;

        Object.entries(this.countries).forEach((item) => {
            if(item[1] === country){
                code = Number(item[0]);
            }
        });
        return String(code);
    }

    async getCities(code){
       this.cities = await api.getCities(code);
       this.shortCity = this.createShortCities(this.cities);
       return this.shortCity;
    }
}

const location = new Location(api);

export default location;