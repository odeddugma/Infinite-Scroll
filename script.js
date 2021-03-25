const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 5;
const apiKey = 'V4e768e18M48M9baD0cnCnp-Jg50X_oUy4bWG_CVKoI';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//Check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}

// Helper function to set atrributes on DOM elements
function setAttributes(element, atrributes) {
    for (const key in atrributes) {
        element.setAttribute(key, atrributes[key]);
    }
}

// Create elements for links and photos, add them to the DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    // Run function for each element in photosArray
    photosArray.forEach((photo) => {
        // Create <a> to link to Unsplash
        const link = document.createElement('a');
        setAttributes(link, {
            href: photo.links.html,
            target: '_blank',
        });
        // Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });
        // Put <img> inside <a>, then put both inside imageContainer element
        link.appendChild(img);
        imageContainer.appendChild(link);
        //Event listener, check when finished loading
        img.addEventListener('load', imageLoaded);
    });
}

// Get photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();

    } catch (error) {
        console.log(error);
    }
}

// Check to see if scrolling near bottom of page, Load more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
});

// On Load
getPhotos();
