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

  refs.inputData.addEventListener(
    'input',
    debounce(e => {
      const trimValue = refs.inputData.value.trim();
  
      cleanHtmlList();
  
      if (trimValue !== '') {
        fetchCountries(trimValue).then(result => {
          if (result.length > 10) {
            Notiflix.Notify.info(
              'Too many matches found. Please enter a more specific name.'
            );
          } else if (result.length === 0) {
            Notiflix.Notify.failure('Oops, there is no country with that name');
          } else if (result.length >= 2 && result.length <= 10) {
            renderCountryList(result);
          } else if (result.length === 1) {
            renderCountryInfo(result);
          }
        });
      }
    }, DEBOUNCE_DELAY)
  );
  
  