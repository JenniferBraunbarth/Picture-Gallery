"use strict";

// ----- Pexels API -----

const imgContainer = document.querySelector(".img_container");
const searchInput = document.querySelector(".search_input");
const searchBtn = document.querySelector(".search_btn");
let keyword, imageUrl;

const searchImg = () => {
  keyword = searchInput.value;
  getImg(keyword);
};

const renderError = function (msg) {
  imgContainer.insertAdjacentText("afterend", msg);
};

const renderImg = (imageUrl, photographer, photographerID, photoAlt) => {
  const html = `<h2>${photoAlt}</h2>
        <img src="${imageUrl}" alt="${keyword}" class="img-fluid object-fit-cover rounded mb-3" />
        <figcaption class="text-center">
          <a href="https://www.pexels.com">Photos provided by Pexels</a>
          <p>This<a href="${imageUrl}"
              >Photo</a> was taken by 
            <a href="https://www.pexels.com/@${photographerID}">${photographer}</a>
             on Pexels.</p>
        </figcaption>`;

  imgContainer.insertAdjacentHTML("afterend", html);
};

const getImg = (keyword) => {
  // All requests made with the client will be authenticated
  const apiKey = "g2ySsBvMxhNiKjXnt2CfGuT5pG7tNQE9ADHumSqN62usKbq1qsl6xtqH";
  // Make the API request to Pexels
  fetch("https://api.pexels.com/v1/search?query=" + keyword, {
    headers: {
      Authorization: apiKey,
    },
  })
    .then((response) => {
      if (!response.ok)
        throw new Error(`Image not found. (${response.status})`);
      return response.json();
    })
    .then((data) => {
      // Extract the URL of a random image
      let photos = data.photos;
      let randomIndex = Math.floor(Math.random() * photos.length);
      imageUrl = photos[randomIndex].src.medium;
      let photographer = photos[randomIndex].photographer;
      let photographerID = photos[randomIndex].photographer_id;
      let photoAlt = photos[randomIndex].alt;
      renderImg(imageUrl, photographer, photographerID, photoAlt);
    })
    .catch((error) => {
      renderError(`Something went wrong! ${error}`);
    });
};

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  searchImg();
  searchInput.value = "";
});
