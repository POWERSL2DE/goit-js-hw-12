import axios from "axios";
// ==================================================
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
// ==================================================
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const form = document.querySelector(".form");
const gallery = document.querySelector(".gallery");
const loader = document.querySelector(".loader");
const loadMoreBtn = document.querySelector(".btn");


let query;
let page = 1;
const perPage = 40;

loadMoreBtn.addEventListener("click", loadMore);

const galleryLightbox = new SimpleLightbox(".gallery a", {
    captionsData: "alt",
    captionDelay: 250,
    nav: true,
    close: true,
    enableKeyboard: true,
    docClose: true,
});


async function searchImages(searchQuery, page) {
    const BASE_URL = "https://pixabay.com/api/";
    
    try {
        const response = await axios.get(`${BASE_URL}`, {
            params: {
            key: "41672793-a8580f18ed6f224a15f8d2674",
            q: searchQuery,
            image_type: "photo",
            orientation: "horizontal",
            safesearch: true,
            page: page,
            per_page: perPage,
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}


form.addEventListener("submit", (event) => {
    event.preventDefault();
    loadMoreBtn.classList.add("hide");
    page = 1;
    gallery.innerHTML = "";
    loader.classList.remove("visible");
    query = event.target.elements.search.value.trim();

    if (!query) {
        iziToast.error({
            title: "Error",
            message: "Sorry, input is empty!",
            position: "topRight",
        });
        loader.classList.add("visible");
        return;
    }
    searchImages(query, page)
        .then(({ hits, totalHits }) => {
            if (hits.length === 0) {
                iziToast.error({
                    title: "Error",
                    message: "Sorry, there are no images matching your search query. Please try again!",
                    position: "topRight",
                    messageColor: "#ffffff",
                    titleColor: "#ffffff",
                    iconColor: "#ffffff",
                    backgroundColor: "#EF4040",
                });
                return;
            }
            renderImage(hits);
            loadMoreBtn.classList.remove("hide");
            galleryLightbox.refresh();
            form.reset();
            if (totalHits <= perPage) {
                loadMoreBtn.classList.add("hide");
            }
        })
        .catch((error) => console.log(error))
        .finally(() => {
            loader.classList.add("visible");
        });
    
});

function renderImage(hits) {
    const markup = hits.reduce((html, hit) =>
        html + `
           <li class="gallery-item">
           <a class="gallery-link" href="${hit.largeImageURL}">
           <img
           class="gallery-image"
           src="${hit.webformatURL}"
           alt="${hit.tags}"
           />
           </a>
           <div class="gallery-info">
           <p>likes: ${hit.likes}</p> 
           <p>views: ${hit.views}</p>
           <p>comments: ${hit.comments}</p>
           <p>downloads: ${hit.downloads}</p>
           </div>
           </li>
            `
        , "");
    gallery.insertAdjacentHTML("beforeend", markup);
}
    


async function loadMore(event) {
    // loadMoreBtn.classList.remove("hide");
    loadMoreBtn.classList.add("hide");
    loader.classList.add("visible");
    const listItem = document.querySelector(".gallery-item:first-child");
    const itemHeight = listItem.getBoundingClientRect().height;

    try {
        page += 1;
        const { hits, totalHits } = await searchImages(query, page);
        const totalPages = Math.ceil(totalHits / perPage);
        // loadMoreBtn.classList.remove("hide");
        renderImage(hits);
        galleryLightbox.refresh();
        
        if (page === totalPages) {
            // loadMoreBtn.classList.remove("hide");
            loadMoreBtn.classList.add("hide");
            iziToast.show({
                message: "We're sorry, but you've reached the end od search results",
                position: "topRight",
                messageColor: "#ffffff",
                titleColor: "#ffffff",
                iconColor: "#ffffff",
                backgroundColor: "#EF4040",
            });
        } else {
            loadMoreBtn.classList.remove("hide");
        }
    } catch (error) {
        console.log(error);
    } finally {
        window.scrollBy({
            top: 2 * itemHeight,
            behavior: "smooth",
        });
    }
}