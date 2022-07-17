import {renderPhotos} from './miniatures.js';
import {shuffle, debounce} from './utilites.js';

function showImageFilters () {
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
}

function clearOldPhotos () {
  const picturesElements = document.querySelectorAll('.picture');
  picturesElements.forEach((pictureElement) => {
    pictureElement.remove();
  });
}

const defaultFilterButtonElement = document.querySelector('#filter-default');
const discussedFilterButtonElement = document.querySelector('#filter-discussed');
const randomFilterButtonElement = document.querySelector('#filter-random');

function filterByTopCommented (photos) {
  const sortedPhotos = photos.slice().sort((a, b) => b.comments.length - a.comments.length);
  renderPhotos(sortedPhotos);
}

function filterByRandom (photos) {
  const sortedPhotos = shuffle(photos.slice()).slice(0, 10);
  renderPhotos(sortedPhotos);
}

function filterByDefault (photos) {
  renderPhotos(photos);
}

function deleteAllFilters () {
  defaultFilterButtonElement.classList.remove('img-filters__button--active');
  randomFilterButtonElement.classList.remove('img-filters__button--active');
  discussedFilterButtonElement.classList.remove('img-filters__button--active');
}

function addSortButtonListeners (photos) {

  discussedFilterButtonElement.addEventListener('click', debounce(() => {
    clearOldPhotos();
    filterByTopCommented(photos);
  }));
  discussedFilterButtonElement.addEventListener('click', () => {
    deleteAllFilters();
    discussedFilterButtonElement.classList.add('img-filters__button--active');
  });

  randomFilterButtonElement.addEventListener('click', debounce(() => {
    clearOldPhotos();
    filterByRandom(photos);
  }));
  randomFilterButtonElement.addEventListener('click', () => {
    deleteAllFilters();
    randomFilterButtonElement.classList.add('img-filters__button--active');
  });

  defaultFilterButtonElement.addEventListener('click', debounce(() => {
    clearOldPhotos();
    filterByDefault(photos);
  }));
  defaultFilterButtonElement.addEventListener('click', () => {
    deleteAllFilters();
    defaultFilterButtonElement.classList.add('img-filters__button--active');
  });
}

export {showImageFilters, addSortButtonListeners};
