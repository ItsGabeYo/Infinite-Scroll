// Unsplash API
const count = 10;
const apiKey = "2ov9gjlfNInPTq462Mq2K7lyBFV5OqQGaHdIVGAm3_M";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

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
  // Run function for each object in photosArray
  photosArray.forEach((photo) => {
    // Create <a> to link to Unsplash
    const item = document.createElement("a");
    item.setAttribute("href", photo.links.html);
    item.setAttribute("target", "_blank");
    // Create <img> for photo
    const img = document.createElement("img");
    img.setAttribute("src", photo.urls.regular);
    img.setAttribute("alt", photo.alt_description);
    img.setAttribute("title", photo.alt_description);
    // Put <img> inside <a>, then put both inside imageContainer Element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
};

// On Load
getPhotos();
