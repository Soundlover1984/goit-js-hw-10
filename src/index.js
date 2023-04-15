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
  
  