//Using fixer.io API to get currency rates.  ->    http://data.fixer.io/api/latest?access_key=3d147cfc7cb865c124d56cc8815226ac
//Using restcountries.eu to get informations about countries  ->  https://restcountries.eu/rest/v2/currency/USD

const axios = require('axios');
const _ = require('lodash');

const getExchangeRate = async (from, to) => {
    try{
        const response = await axios.get('http://data.fixer.io/api/latest?access_key=3d147cfc7cb865c124d56cc8815226ac');
        var eur = 1 / response.data.rates[from];
        var rate = eur*response.data.rates[to];
        if(isNaN(rate)){throw new Error();}
        return rate;
    }catch(e){
        throw Error(`Unable to get currency exchange rate for ${to}`);
    }
};

const getCountries = async (currencyCode) => {
    try{
        var countries = await axios(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);
        return countries.data.map((country) => country.name);
    }catch(e){
        throw new Error(`Unble to get the country details`);
    }
};

const convertCurrency = async (from, to, amount) => {    
    var exchangeRate = await getExchangeRate(from, to);    
    var countries = await getCountries(to);
    var total = (amount * exchangeRate).toFixed(2);
    
    return `${amount} ${from} is worth ${total} ${to}. you can spend these in the following countrie(s) : ${countries.join('\n')}`;
};

const getCountryAlphaCode = async (c) => {
    try{
        var country = await axios(`https://restcountries.eu/rest/v2/currency/${c}`);
        var alphaCode = country.data.map((country) => country.alpha3Code);
        return alphaCode;
    }catch(e){
        throw new Error(`Unble to get the country details`);
    }
};

const getCountryDetails = async (c) => {
    try{
        var alphaCode = await getCountryAlphaCode(c);
        var countries = await axios(`https://restcountries.eu/rest/v2/alpha/${alphaCode}`);
        // return countries.data.map((country) => country.name);
        const picked = _.pick(countries.data, ['capital', 'region', 'subregion', 'currencies', 'population']);
        picked.currencies = picked.currencies[0].name;

        return picked;
    }catch(e){
        throw new Error(`Unble to get the country details`);
    }
};
// getCountryDetails('LKR').then((data) => console.log(data)).catch((e) => console.log(e));

module.exports = {convertCurrency, getCountryDetails};

