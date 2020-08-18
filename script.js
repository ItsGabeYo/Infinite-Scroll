// Unsplash API
let numOfImagesToLoad = 5;
const apiKey = "2ov9gjlfNInPTq462Mq2K7lyBFV5OqQGaHdIVGAm3_M";
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${numOfImagesToLoad}`;
const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

const pixelOffsetToGetMorePhotos = 1000;
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

// Helper Function to Set Attributes on DOM Elements
const setAttributes = (element, attributes) => {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
};

// Check if all images were loaded.
const imageLoaded = () => {
  if (++imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    numOfImagesToLoad = 10;
  }
};

// Get photos from Unsplash API
const getPhotos = async () => {
  try {
    const response = await fetch(apiUrl);
    let photosArray = await response.json();
    displayPhotos(photosArray);
  } catch (error) {
    // Catch
  }
};

// Create Elements for Links & Photos, Add to DOM
const displayPhotos = (photosArray) => {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  // Run function for each object in photosArray
  photosArray.forEach((photo) => {
    // Create <a> to link to Unsplash
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });
    // Create <img> for photo
    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    // Event Listener, check when each is finished loading
    img.addEventListener("load", imageLoaded);
    // Put <img> inside <a>, then put both inside imageContainer Element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
};

// Check to see if scrolling near bottom of page, load more photos.
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >=
      document.body.offsetHeight - pixelOffsetToGetMorePhotos &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

// On Load
getPhotos();
