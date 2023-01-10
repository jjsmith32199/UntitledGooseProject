var form = document.querySelector('#searchForm');
var addWatchListEl = document.querySelector('#add-watch-list');

var watchlist = [];

function queryOMDB(movieInput) {

    var omdbStub = "http://www.omdbapi.com/?apikey=593dbd9c&t=" + movieInput;

    fetch(omdbStub)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            //console.log(data.Title);

            renderPage(data);
        })
}

function renderPage(movie) {
    var titleElement = document.querySelector('.movieTitle');
    titleElement.textContent = "";
    titleElement.textContent = movie.Title + " (" + movie.Year + ")";

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

}


form.addEventListener('submit', getUserInput);

function getUserInput(event) {
    event.preventDefault();

    var formInput = document.querySelector('#searchBar').value;

    formInput = formInput.trim();

    queryOMDB(formInput);
}

function storeWatchList(watchlist) {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
}

function getWatchList() {
    var savedWatchList = JSON.parse(localStorage.getItem("watchlist", watchlist));

    if (!savedWatchList) {
        savedWatchList = [];
    }
    return savedWatchList;
}

function renderWatchList() {
    addWatchListEl.innerHTML = "";
    for (var i = 0; i < watchlist.length; i++) {
        var listItem = document.createElement('li');
        listItem.textContent = watchlist[i];
        addWatchListEl.appendChild(listItem);
    }
}

function addWatchList() {
    var titleElement = document.querySelector('.movieTitle');
    var movieTitle = titleElement.textContent;

    //console.log(movieTitle);

    if (movieTitle.length !== 0) {
        watchlist = getWatchList();
        console.log(watchlist);

        watchlist.push(movieTitle);
        console.log(watchlist);
        storeWatchList(watchlist);
        renderWatchList();

    }
}

addWatchListEl.addEventListener('click', addWatchList);