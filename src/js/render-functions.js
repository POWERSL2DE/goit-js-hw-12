import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { setGallery } from '../main';
import { imgset } from '../main';
import { addPage } from '../main';
let imgsetAdd = {};

export async function renderImgs(images) {
  setGallery.innerHTML = '';

  const imgGallery = imgset
    .map(
      image => `<li class="img-blok">
        <a href="${image.largeImageURL}">     
    <img  src="${image.webformatURL}"
    data-source="${image.largeImageURL}"
    alt="${image.tags}">
   
    <ul class="image-descript">
  <li>
    <h3>likes</h3>
    <p>${image.likes}</p>
  </li>
  <li>
    <h3>views</h3>
    <p>${image.views}</p>
  </li>
  <li>
    <h3>comments</h3>
    <p>${image.comments}</p>
  </li>
  <li>
    <h3>downloads</h3>
    <p>${image.downloads}</p>
  </li>
    </ul>
  </a></li>`
    )
    .join('');

  addPage > 1 ? (imgsetAdd += imgGallery) : (imgsetAdd = imgGallery);

  setGallery.insertAdjacentHTML('beforeend', imgsetAdd);

  const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
  });

  lightbox.refresh();
}