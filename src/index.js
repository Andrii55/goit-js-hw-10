import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import {fetchCountries} from './fetchCountries'

const DEBOUNCE_DELAY = 300;
const refs = {
  searchInputEl: document.querySelector('#search-box'),
  countriesListEl: document.querySelector('.country-list'),
  countriesInfoEl: document.querySelector('.country-info'),
};

refs.searchInputEl.addEventListener(
  'input',
  debounce(onSearchCountries, DEBOUNCE_DELAY)
);

function onSearchCountries(e) {
  e.preventDefault();
  const searchQuery = e.target.value.trim();

  fetchCountries(searchQuery)
    .then(renderListItems)
    .catch(error =>
      Notiflix.Notify.failure(
        `Oops, there is no country with that name: ${error.message}`
      )
    );
}

function renderListItems(items) {
  clearListItems();

  if (items.length === 1) {
    const item = items[0];
    const markup = `<h2><img src="${item.flags.png}" alt="Flag of ${
      item.name.common
    }" width="30">${item.name.common}</h2>
            <p><span>Capital:</span> ${item.capital[0]}</p>
            <p><span>Population:</span> ${item.population}</p>
            
            <p><span>Languages:</span> ${Object.values(item.languages).join(
              ', '
            )}</p>`;
    refs.countriesListEl.insertAdjacentHTML('beforeend', markup);
    return;
  }

  if (items.length > 1 && items.length <= 10) {
    const markup = items.map(item => `<li class="find__country"><img src="${item.flags.png}" alt="Flag of ${
        item.name.common
      }" height="25" width="30">${item.name.common}</li>`).join('');
    refs.countriesListEl.insertAdjacentHTML('beforeend', markup);
    return;
  }

  if (items.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
    return;
  }

  refs.countriesListEl.textContent = 'No results found.';
}

function clearListItems() {
  refs.countriesListEl.innerHTML = '';
}


