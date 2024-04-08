import{S as v,a as q,i as a}from"./assets/vendor-6e0bf343.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function g(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(e){if(e.ep)return;e.ep=!0;const o=g(e);fetch(e.href,o)}})();let d={};async function m(i){u.innerHTML="";const t=s.map(r=>`<li class="img-blok">
        <a href="${r.largeImageURL}">     
    <img  src="${r.webformatURL}"
    data-source="${r.largeImageURL}"
    alt="${r.tags}">
   
    <ul class="image-descript">
  <li>
    <h3>likes</h3>
    <p>${r.likes}</p>
  </li>
  <li>
    <h3>views</h3>
    <p>${r.views}</p>
  </li>
  <li>
    <h3>comments</h3>
    <p>${r.comments}</p>
  </li>
  <li>
    <h3>downloads</h3>
    <p>${r.downloads}</p>
  </li>
    </ul>
  </a></li>`).join("");l>1?d+=t:d=t,u.insertAdjacentHTML("beforeend",d),new v(".gallery a",{captionsData:"alt"}).refresh()}const f=async()=>(await q.get("https://pixabay.com/api/",{params:{key:"22926721-5d20aa08498ffd1ff2f906542",q:h,image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:p,page:l}})).data.hits,u=document.querySelector("ul.gallery");let s,h;const p=15;let l=1;const R=document.querySelector("input"),P=document.querySelector("form"),n=document.querySelector("#addImg"),b=document.querySelector(".preloader"),L=()=>{b.style.display="flex"},w=()=>{b.style.display="none"},y=()=>{document.body.classList.add("loaded"),document.body.classList.remove("loaded_hiding")};P.addEventListener("submit",async i=>{if(i.preventDefault(),l=1,s={},h=R.value.trim(),!h.length){a.error({color:"yellow",message:" Please fill in the field for search images.",position:"topRight"}),u.innerHTML="";return}L();try{if(s=await f(),!s.length){a.error({color:"red",message:"❌ Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),n.style.display="none";return}p<=s.length?n.style.display="flex":a.error({color:"blue",message:"We're sorry, but you've reached the end of search results.",position:"topRight"}),m(s),S()}catch{a.error({color:"red",message:"❌ Sorry, there are no images matching your search query. Please try again!",position:"topRight"})}finally{w(),y()}});n.addEventListener("click",async i=>{i.preventDefault(),l+=1,L();try{if(s=await f(),p>s.length){a.error({color:"blue",message:"We're sorry, but you've reached the end of search results.",position:"topRight"}),n.style.display="none";return}m(s),S()}catch{a.error({color:"red",message:"❌ Sorry, there are no images matching your search query. Please try again!",position:"topRight"})}finally{w(),y()}});window.onload=y;async function S(){const t=document.querySelector(".img-blok").getBoundingClientRect();window.scrollBy({top:t.height*2,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map
