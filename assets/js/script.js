var form = document.querySelector('#searchForm');
var addWatchListEl = document.querySelector('#add-watch-list');
var watchListEl = document.querySelector('#watch-list');
var bodyBoxEl = document.querySelector('.body-box');
var trailerEl = document.querySelector('#trailer');
var trailerBoxEl = document.querySelector('#trailer-box');

var watchlist = [];

//*Fetch Youtube API*//
function queryYoutube(movieTitle) {

    movieTitle.split(' ').join('%20'); // %20 = space
    var ytQueryUrl = 'https://youtube.googleapis.com/youtube/v3/search?q=' + movieTitle + '%20trailer&key=AIzaSyAQGeY16g-e4cGgKGvutnnbA0LaKAXDH-s';

    fetch(ytQueryUrl)
        .then(function (response) {
            if (!response.ok) {
                console.log("couldn't find trailer for that movie");
 
                var sorry = document.createElement('img');
                trailerBoxEl.innerHTML = "Sorry! Trailer is not found/available!"
                
                var src = "./assets/images/trailer-not-found.png";
                sorry.setAttribute("src", src);
                sorry.setAttribute("width", "300");
                sorry.setAttribute("height", "300");

                trailerBoxEl.appendChild(sorry);

                throw response.json();
            }
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            var videoId = data.items[0].id.videoId; //grab the video id of the first result of searched videos

            var src = "http://www.youtube.com/embed/" + videoId;

            trailerEl.setAttribute("src", src);
            trailerEl.setAttribute("width", "560");
            trailerEl.setAttribute("height", "315");
            trailerEl.setAttribute("frameborder", "0");
            trailerEl.setAttribute("allowfullscreen", "");
            trailerEl.setAttribute("SameSite", "strict");

        })
        .catch(function (error) {
            console.error(error);
        });
}

//*Fetch OMDB API*//
function queryOMDB(movieInput) {

    var omdbStub = "http://www.omdbapi.com/?apikey=593dbd9c&t=" + movieInput;

    fetch(omdbStub)
        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            }
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            //console.log(data.Title);
            renderPage(data);  
        })
        .catch(function (error) {
            bodyBoxEl.innerHTML = "";
            bodyBoxEl.innerHTML = '<h3>No results found, search again!</h3>'; //WHEN the result is not found
            console.error(error);
        });
}

//*Rendering Movie Info from OMDB*//
function renderPage(movie) {
    var titleElement = document.querySelector('.movieTitle');
    titleElement.textContent = "";
    var movieTitleYear = movie.Title + " (" + movie.Year + ")";
    titleElement.textContent = movieTitleYear;

    //ACTOR
    var actorList = document.querySelector('#cast');
    actorList.innerHTML = "";
    var actorArray = movie.Actors.split(',');
    //console.log(actorArray);
    //console.log(actorArray[0]);
    for (var i = 0; i < actorArray.length; i++) {
        var actor = document.createElement('li');
        actor.textContent = actorArray[i].trim();
        actorList.appendChild(actor);
    }

    //DIRECTOR
    var directorList = document.querySelector('#crew');
    directorList.innerHTML = "";
    var directorArray = movie.Director.split(',');
    for (var i = 0; i < directorArray.length; i++) {
        var director = document.createElement('li');
        director.textContent = directorArray[i].trim();
        directorList.appendChild(director);
    }

    //POSTER
    var poster = document.querySelector('#poster');
    poster.innerHTML = "";
    var img = document.createElement('img');

    img.setAttribute("src", movie.Poster);

    poster.appendChild(img);


    //TRAILER (YOUTUBE API)
    queryYoutube(movieTitleYear);
}

function getUserInput(event) {
    event.preventDefault();

    var formInput = document.querySelector('#searchBar').value;

    if (!formInput) { //if formInput is empty, do nothing and return(exit) the function
        return;
    }

    formInput = formInput.trim();

    queryOMDB(formInput);
}

function storeWatchList() {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
}

function getWatchList() {
    var savedWatchList = JSON.parse(localStorage.getItem("watchlist", watchlist));

    if (savedWatchList !== null) {
        watchlist = savedWatchList;
    }
    renderWatchList();
}

function renderWatchList() {
    watchListEl.innerHTML = "";
    for (var i = watchlist.length - 1; i >= 0; i--) { //loop backward so the most recently added movie displayed at the top of the list
        var listItem = document.createElement('li');
        listItem.textContent = watchlist[i];
        watchListEl.appendChild(listItem);
    }
}

function addWatchList() {
    var titleElement = document.querySelector('.movieTitle');
    var movieTitle = titleElement.textContent;

    if (movieTitle.length !== 0) {

        if (watchlist.includes(movieTitle)) { //if a movie already has added to the watchlist, instead of adding it move the recently added one to the top of the list
            watchlist.push(watchlist.splice(watchlist.indexOf(movieTitle), 1)[0]);
        }
        else {
            watchlist.push(movieTitle); //else add the movie to the watchlist
        }

        storeWatchList();
        renderWatchList();
    }
}

form.addEventListener('submit', getUserInput);
addWatchListEl.addEventListener('click', addWatchList);
getWatchList();