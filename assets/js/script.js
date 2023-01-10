var form = document.querySelector('#searchForm');

function queryOMDB(movieInput) {

    var omdbStub = "http://www.omdbapi.com/?apikey=593dbd9c&t=" + movieInput;

    fetch(omdbStub) 
        .then(function(response) {
        return response.json();
        })
        .then(function(data) {
/*             console.log(data);
            console.log(data.Title); */

            renderPage(data);
        })
}

function renderPage(movie) {
    var titleElement = document.querySelector('.movieTitle');
    titleElement.textContent = movie.Title + " (" + movie.Year +")";
}




form.addEventListener('submit', getUserInput);

function getUserInput(event) {
    event.preventDefault();

    var formInput = document.querySelector('#searchBar').value;

    formInput = formInput.trim();

    queryOMDB(formInput);
}