const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let initialLoad = true;

//unsplash API
const count = 5;
const apiKey = 'sU21Kpqd62gNetnt2WDxF5wJLZwTW4lndxDWIC-xHKw';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// check if all images were loaded
function imageLoaded(){
    imageLoaded++;
    // console.log(imageLoaded);
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
        // console.log('ready = ',ready);
        increaseImagesToLoadCount();
        
    }
}
function increaseImagesToLoadCount() {
    imageCount = 30;
    apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${imageCount}`;
  }

//helper function to set attributes on DOM Elements
function setAttributes(element, attributes){
    for(const key in attributes){
        element.setAttribute(key, attributes[key])
    }
}

//Create Elements for Links & Photos, Add to DOM
function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    // console.log('total images', totalImages);
    //Run function for each object in photosArray
    photosArray.forEach((photo) =>{
        //create <a> to link to unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });

        //create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_desription,
        })
        //event listener, check when each is finished loading
        img.addEventListener('load', imageLoaded)
        //put <img> inside <a>, then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    })
}

//Get Photos from Unsplash API
async function getPhotos(){
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
        imageLoaded();
        
    } catch(error){
        //catch error here
    }
}
// check to see if scrolling near bottom of page, load more photos
window.addEventListener('scroll', () =>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        // console.log('window.innerHeight:', window.innerHeight);
        // console.log('window.scrollY:', window.scrollY);
        // console.log('window.innerHeight + scrollY:', window.scrollY + window.innerHeight);
        // console.log('document.body.offsetHeight - 1000:', document.body.offsetHeight - 1000);
        ready = false;
        getPhotos();
        // console.log('load more');
        
    }
})
//on load
getPhotos();