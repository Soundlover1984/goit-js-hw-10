import './css/styles.css';
import {fetchCountries} from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const inputData = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

function cleanHtmlList() {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
}

inputData.addEventListener('input', debounce(e => {
  const inputValue = inputData.value.trim();
  cleanHtmlList();
  if (inputValue !== '') {
  fetchCountries(inputValue).then(result => {
    if (result.length > 10) {
      Notiflix.Notify.info('Too many matches found. Please enter a more specific name.')
    }
    else if (result.length >= 2 && result.length <= 10) {
      renderCountryList(result);
    }
    else if (result.length === 1) {
      renderCountryInfo(result);
    }
  } 
    ).catch(error => {
      Notiflix.Notify.failure('Oops, there is no country with that name')
    });
  }
}, DEBOUNCE_DELAY ));

function renderCountryList(countries) {
  const markup = countries.map(country => {
    return `<li>
    <img src="${country.flags.svg}" alt="Flag of ${country.name.official}" width="100" hight="50">
    <br><b>${country.name.official}</b>
    </li>`;
  }).join('');
  countryList.innerHTML = markup;
};

function renderCountryInfo(countries) {
    const markup = countries.map(country => {
        return `<img src="${country.flags.svg}" alt="Flag of ${
          country.name.official}" width="200" hight="100">
          <p style="font-size: 25px; text-shadow: 1px 1px 2px grey"><b>${country.name.official}</b></p>
          <p>Capital: <b>${country.capital}</b></p>
          <p>Population: <b>${country.population}</b></p>
          <p>Languages: <b>${Object.values(country.languages).join(', ')}</b></p>`;}).join('');
    countryInfo.innerHTML = markup;
  };















