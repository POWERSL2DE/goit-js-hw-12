import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { renderImgs } from './js/render-functions';
import { fetchImg } from './js/pixabay-api';

export const setGallery = document.querySelector('ul.gallery');
export let imgset;
export let searchImgs;

export const perPage = 15;
export let addPage = 1;

// +++++++++++++++++++

const inputfield = document.querySelector('input');
const fillForm = document.querySelector('form');
const addImgs = document.querySelector('#addImg');

const preloader = document.querySelector('.preloader');

// loader begin==============

const showLoader = () => {
  preloader.style.display = 'flex';
};
const hideLoader = () => {
  preloader.style.display = 'none';
};
const handleLoad = () => {
  document.body.classList.add('loaded');
  document.body.classList.remove('loaded_hiding');
};

// Begin ++++++++++++++++
fillForm.addEventListener('submit', async event => {
  event.preventDefault();
  addPage = 1;
  imgset = {};
  searchImgs = inputfield.value.trim();

  // control correct fill input

  if (!searchImgs.length) {
    iziToast.error({
      color: 'yellow',
      message: ` Please fill in the field for search images.`,
      position: 'topRight',
    });
    setGallery.innerHTML = '';
    return;
  }

  showLoader();

  try {
    imgset = await fetchImg();

    if (!imgset.length) {
      iziToast.error({
        color: 'red',
        message: `❌ Sorry, there are no images matching your search query. Please try again!`,
        position: 'topRight',
      });
      addImgs.style.display = 'none';
      return;
    }

    if (perPage <= imgset.length) {
      addImgs.style.display = 'flex';
    } else {
      iziToast.error({
        color: 'blue',
        message: `We're sorry, but you've reached the end of search results.`,
        position: 'topRight',
      });
    }
    renderImgs(imgset);
    scroll();
  } catch (error) {
    iziToast.error({
      color: 'red',
      message: `❌ Sorry, there are no images matching your search query. Please try again!`,
      position: 'topRight',
    });
  } finally {
    hideLoader();
    handleLoad();
  }
});

// add pages===============
addImgs.addEventListener('click', async event => {
  event.preventDefault();

  addPage += 1;

  showLoader();
  try {
    imgset = await fetchImg();

    if (perPage > imgset.length) {
      iziToast.error({
        color: 'blue',
        message: `We're sorry, but you've reached the end of search results.`,
        position: 'topRight',
      });
      addImgs.style.display = 'none';
      return;
    }

    renderImgs(imgset);
    scroll();

  } catch (error) {
    iziToast.error({
      color: 'red',
      message: `❌ Sorry, there are no images matching your search query. Please try again!`,
      position: 'topRight',
    });
  } finally {
    hideLoader();
    handleLoad();
  }
});
window.onload = handleLoad;

// =========================

async function scroll() {
  const imgSize = document.querySelector('.img-blok');
  const domRect = imgSize.getBoundingClientRect();
  window.scrollBy({
    top: domRect.height * 2,
    behavior: 'smooth',
  });
}