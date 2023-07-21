// global variables 
var imdb;
var streams;
var watchKey = "0jBJMeJpTDWH00cIRz9YGOb6YMIh9wyw8YceeayM";
var apiKey = "5fe1dca8";
var apiUrl = "https://www.omdbapi.com/?apikey=" + apiKey;
var movieDetailsElement = document.getElementById("movieDetails");
var searchButEl = $('#searchButton');
var streamDetailsEl = $('#streamDetails');
var clearBtnEl = $("#clear-btn");
console.log("🚀 ~ file: script.js:31 ~ streamDetailsEl:", streamDetailsEl)
// search function 
function searchMovie(event) {
    event.preventDefault();
    // search movie by OMDB 
    movieDetailsElement.innerHTML = "";
    var title = document.getElementById("movieTitle").value;
    fetch(`${apiUrl}&t=${encodeURIComponent(title)}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log("🚀 ~ file: script.js:39 ~ data:", data)
            displayMovieDetails(data);
        })
        .catch(function (error) {
            console.log("Error:", error);
        });
}
// display results and search streaming platforms 
async function displayMovieDetails(movie) {
    if (movie.Response === "True") {

        // search streaming platforms by WACTHMODE 
        imdb = movie.imdbID;
        let url = 'https://api.watchmode.com/v1/title/' + imdb + '/sources/?apiKey=' + watchKey;
        await fetch(url, { method: 'Get' })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                streams = data;
            });
        // search trailer 
        let trailerUrl = 'https://api.watchmode.com/v1/title/' + imdb + '/details/?apiKey=' + watchKey;
        await fetch(trailerUrl, { method: 'Get' })
            .then((reso) => reso.json())
            .then((dataTr) => {
                trailer = dataTr;
            });
        // display movie description and trailer link 
        var html = `
          <h2>${movie.Title}</h2>
          <img src="${movie.Poster}" alt="${movie.Title} Poster">
          <p>Year: ${movie.Year}</p>
          <p>Director: ${movie.Director}</p>
          <p>Plot: ${movie.Plot}</p>
          <a href=${trailer.trailer} style="font-size: 150%; color: #ffab40;">WATCH TRAILER</a>
          `;
        movieDetailsElement.innerHTML = html;
        streamDetailsEl.text("");
        // display streaming links 
        for (var i = 0; i < streams.length; i++) {
            if (streams[i].format === "HD") {
                if (streams[i].type === "rent") {
                    var linkEl = $("<a>", "<br>");
                    linkEl.attr('href', streams[i].web_url);
                    linkEl.text("| Streamer: " + streams[i].name + ",     Cost $" + streams[i].price + " |     ");
                    streamDetailsEl.append(linkEl);
                }
            }
        }
        makeButtons(movie.Title)
    } else {
        movieDetailsElement.innerHTML = `<p>${movie.Error}</p>`;
    }
}
// search history buttons 
function makeButtons(movie) {
    let movieHistory = JSON.parse(localStorage.getItem("movie-history")) || []
    if (movie && !movieHistory.includes(movie)) {
        movieHistory.push(movie)
    }
    $("#ul").empty()
    let list = document.createElement("ul")
    for (var i = 0; i < movieHistory.length; i++) {
        let li = document.createElement("li")
        let button = document.createElement("button")
        button.textContent = movieHistory[i]
        button.setAttribute("class", "movie-button");
        li.append(button)
        list.append(li)
    }
    let div = document.getElementById("ul")
    div.append(list)
    localStorage.setItem("movie-history", JSON.stringify(movieHistory))
    $(".movie-button").click(function (event) {
        $("#movieTitle").val($(this).text())
        searchMovie(event)
    });
}
makeButtons()
//  search buttons click listener 
searchButEl.click(searchMovie);
clearBtnEl.click(function () {
    localStorage.clear()
    location.reload()
})