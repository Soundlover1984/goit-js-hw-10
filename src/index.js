import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const refs = {
    inputData: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
  };

  function cleanHtmlList() {
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';
  }
  

  refs.inputData.addEventListener(
    'input', debounce(e => {
      const inputValue = refs.inputData.value.trim();
  
      cleanHtmlList();
  
      if (inputValue !== '') {
        fetchCountries(inputValue).then(result => {
          if (result.length > 10) {
            Notiflix.Notify.info(
              'Too many matches found. Please enter a more specific name.'
            );
          } else if (result.length >= 2 && result.length <= 10) {
            renderCountryList(result);
          } else if (result.length === 1) {
            renderCountryInfo(result);
          }
        }).catch(error => {
          Notiflix.Notify.failure('Oops, there is no country with that name');
        });
      }
    }, DEBOUNCE_DELAY)
  );
  
  function renderCountryList(country) {
    const markup = country
      .map(countries => {
        return `<li>
          <img src="${countries.flags.svg}" alt="Flag of ${countries.name.official}" width="100" hight="50">
          <br><b>${countries.name.official}</b>
          </li>`;
      })
      .join('');
    refs.countryList.innerHTML = markup;
  }
  
  function renderCountryInfo(countries) {
    const markup = countries
      .map(country => {
        return `<img src="${country.flags.svg}" alt="Flag of ${
          country.name.official}" width="200" hight="100">
          <p style="font-size: 25px; text-shadow: 1px 1px 2px grey"><b>${country.name.official}</b></p>
          <p>Capital: <b>${country.capital}</b></p>
          <p>Population:<b>${country.population}</b></p>
          <p>Languages: <b>${Object.values(country.languages)}</b></p>`;
      })
      .join('');
    refs.countryInfo.innerHTML = markup;
  }
  
  
