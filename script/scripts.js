
const KEY = 'd33dbfe4b42731455fa69b8e54f12010';
document.querySelector("header nav form").addEventListener('submit', function (event) {
    event.preventDefault();
    usersearch()
});

let searched = false;
let slideIndex = 0;

function fetchURL(url, callback, parameter) {

    fetch(url).then(
        function (response) {
            if (response.status >= 200 && response.status < 300) {
                return response.json();
            }
            else {
                throw 'Fetch failed';
            }
        }).then(function (data) {
            callback(data, parameter);
        })
        .catch((error) => errors(error));
}

function errors(error) {
    console.log(error)
    document.querySelector("main figure h1").innerHTML =
        `An error has accured, please try refreshing <br> 
    <br>Error: ${error}`;
}

//Flickr galleri 
function usersearch() {
    if (searched) {
        img = document.querySelectorAll("main figure img");
        for (let i = 0; i < img.length; i++) {
            img[i].remove();
        }
        searched = false;
        usersearch()
    }
    else {
        removeblob()
        let url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${KEY}&text=${document.querySelector("#flickr-search").value}&media=photos&per_page=${document.querySelector("#flickr-number").value}&format=json&nojsoncallback=1`;
        searched = true;
        fetchURL(url, getimage, document.querySelector("header nav form select").value);
        document.querySelector("main figure").appendChild(document.createElement("div")).classList.add("icon")
        anime({
            targets: '.icon',
            scale: 2,
            rotate: 90, 
            duration: 2000,
            loop: true
        })
    }
}

function getimage(json, size) {
    removeblob()
    for (let i = 0; i < Object.keys(json.photos.photo).length; i++) {
        console.log(`https://live.staticflickr.com/${json.photos.photo[i].server}/${json.photos.photo[i].id}_${json.photos.photo[i].secret}_${size}.jpg`);

        document.querySelector("main figure").appendChild(document.createElement("img")).src = `https://live.staticflickr.com/${json.photos.photo[i].server}/${json.photos.photo[i].id}_${json.photos.photo[i].secret}_${size}.jpg`;
    }
    if (size === "m") {
        document.querySelector("main figure").style.height = "240px"
    }
    else if (size === "z") {
        document.querySelector("main figure").style.height = "640px"
    }
    else if (size === "b") {
        document.querySelector("main figure").style.height = "1024px"

    }
    document.querySelector("#button-right").addEventListener('click', function() {
        pictureSlide(+1)
    })
    document.querySelector("#button-left").addEventListener('click', function () {
        pictureSlide(-1)
    })
    pictureSlide("gaming")
}


// Picture slide från w3schools....2.0  :)
function pictureSlide(parameter) {
    showDivs(slideIndex);
    if (parameter === -1 || parameter === +1) {
        plusDivs(parameter)
    }
    function plusDivs(n) {
        showDivs(slideIndex += n);
    }

    function showDivs(n) {
        let i;
        let x = document.querySelectorAll("main figure img");
        if (n > x.length) { slideIndex = 1 };
        if (n < 1) { slideIndex = x.length };
        for (i = 0; i < x.length; i++) {
            x[i].style.display = "none";
        }
        x[slideIndex - 1].style.display = "block";
    }
}

function removeblob() {
    for (let i = 0; i < document.querySelectorAll(".icon").length; i++) {
        document.querySelector("main figure").removeChild(document.querySelectorAll(".icon")[i]);
    }
}





