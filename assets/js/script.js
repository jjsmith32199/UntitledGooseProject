var form = document.querySelector('#searchForm');
var addWatchListEl = document.querySelector('#add-watch-list');
var watchListEl = document.querySelector('#watch-list');
var watchListBoxEl = document.querySelector('#watch-list-box');
var bodyBoxEl = document.querySelector('.body-box');
var trailerEl = document.querySelector('#trailer');
var trailerBoxEl = document.querySelector('#trailer-box');
var movieTitleEl = document.querySelector('.movieTitle');
var watchListBtnEl = document.querySelector('.watch-list-btn');
//For Modal
var modal = document.querySelector('#myModal');
var submitbuttonEl = document.querySelector('#submitButton');
var closeEl = document.querySelector('.close'); 
var articleList = document.querySelector('#newsPiece');


var watchlist = [];

//*Fetch Youtube API*//
function queryYoutube(movieTitle) {

    movieTitle.split(' ').join('%20'); // %20 = space
    var ytQueryUrl = 'https://youtube.googleapis.com/youtube/v3/search?q=' + movieTitle + '%20trailer&key=AIzaSyAQGeY16g-e4cGgKGvutnnbA0LaKAXDH-s';

    fetch(ytQueryUrl)
        .then(function (response) {
            if (!response.ok) {
                //console.log("couldn't find trailer for that movie");
 
                var sorry = document.createElement('img');
                trailerBoxEl.innerHTML = "Sorry! Trailer is not found/available!"
                
                var src = "./assets/images/trailer-not-found.png";
                sorry.setAttribute("src", src);
                sorry.setAttribute("width", "300");
                sorry.setAttribute("height", "300");
                sorry.setAttribute("id", "sorry");

                trailerBoxEl.appendChild(sorry);

                //throw response.json();
                throw new Error("Something went wrong or video not available");
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
           
           
            if(data.Error){ //check data.Error because 'movie not found' would still return data object instead of throwing it from condition response not ok.
                modal.style.display = "block"; //show modal display if search result is not found

                throw new Error("Movie is not found!");
            }
            renderPage(data);  
        })
        .catch(function (error) {
            console.error(error);
        });
}

//Gets article info for wikipedia articles and appends them to page as links
function getWikiArticle(year) {
    //var wikiUrl = "https://en.wikinews.org/w/api.php?origin=*&action=query&generator=search&format=json&gsrlimit=3&gsrqiprofile=popular_inclinks_pv&prop=info&inprop=url&gsrsearch=" + year;
    
    //var wikiUrl = "https://en.wikinews.org/w/api.php?origin=*&action=query&list=search&format=json&srlimit=5&srqiprofile=popular_inclinks_pv&srsearch=intitle:" + year;

    //var wikiUrl = "https://en.wikinews.org/w/api.php?origin=*&action=opensearch&limit=2&search=" + year;

    var wikiUrl = "https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&format=json&search=" + year;

    fetch(wikiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            

            //for loop for appending each article using the intitle url
            /*
                for(var i = 0; i < data.query.search.length; i++){
                var articleTitle = data.query.search[i].title;
                console.log(articleTitle);

                var articleUrl = "https://en.wikinews.org/wiki/" + articleTitle.split(' ').join('_');
                
                console.log(articleUrl);

                var a = document.createElement('a');
                var article = document.createElement('li');
                a.textContent = articleTitle;
                a.setAttribute('href', articleUrl);
                article.appendChild(a);
                articleList.appendChild(article);
            }*/

            //for loop for appending the articles using the wikipedia url
            for(var i = 0; i < data[1].length; i++){
                var articleTitle = data[1][i];
                var articleUrl = data[3][i];
                var a = document.createElement('a');
                var article = document.createElement('li');
                a.textContent = articleTitle;
                a.setAttribute('href', articleUrl);
                article.appendChild(a);
                articleList.appendChild(article);
            }
            
        })

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
    img.setAttribute("id", "poster");

    poster.appendChild(img);


    //TRAILER (YOUTUBE API)
    queryYoutube(movieTitleYear);

    //CALLS WIKI Function

    articleList.innerHTML = "";
    getWikiArticle(movie.Year);
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


//For watch list button (hide and display)
watchListBtnEl.addEventListener('click', function(){
    if(watchListBoxEl.classList.contains("hide")){
        //console.log(watchListBoxEl.classList.contains("hide"));
        watchListBoxEl.setAttribute("class", "show");
    } else{
        watchListBoxEl.setAttribute("class", "hide");
    }
})

//Modal: display hide
closeEl.addEventListener('click', function(){
    modal.style.display = "none";
})

window.addEventListener('click', function(event){
    if(event.target == modal){
        modal.style.display = "none";
    }
})

form.addEventListener('submit', getUserInput);
addWatchListEl.addEventListener('click', addWatchList);
getWatchList();

watchListEl.addEventListener("click", function(event) {
    event.preventDefault;
    var movie = event.target.innerHTML;
    var title = movie.split('(')[0];

    queryOMDB(title)
})