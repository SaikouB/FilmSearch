var imdb;
var streams;
var watchKey = "TNJADaKq3XlXMkATsndQthQewGSmwIfLUdLVrqez";
var apiKey = "5fe1dca8";
var apiUrl = "http://www.omdbapi.com/?apikey=" + apiKey;
var movieDetailsElement = document.getElementById("movieDetails");
var searchButEl = $('#searchButton');
var streamDetailsEl = $('#streamDetails');
var clearBtnEl = $("#clear-btn");
console.log("🚀 ~ file: script.js:31 ~ streamDetailsEl:", streamDetailsEl)

function searchMovie(event) {
  event.preventDefault();
  movieDetailsElement.innerHTML = "";
  var title = document.getElementById("movieTitle").value;
  console.log('hi');
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

async function displayMovieDetails(movie) {
  if (movie.Response === "True") {

    // WACTHMODE 
    imdb = movie.imdbID;
    let url = 'https://api.watchmode.com/v1/title/' + imdb + '/sources/?apiKey=' + watchKey;
    await fetch(url, { method: 'Get' })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        streams = data;
      });


    let trailerUrl = 'https://api.watchmode.com/v1/title/' + imdb + '/details/?apiKey=' + watchKey;
    await fetch(trailerUrl, { method: 'Get' })
      .then((reso) => reso.json())
      .then((dataTr) => {
        console.log("🚀 ~ file: script.js:69 ~ .then ~ dataTr:", dataTr)
        trailer = dataTr;
      });

      

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

    for (var i = 0; i < streams.length; i++) {
      if (streams[i].format === "HD") {
        if (streams[i].type === "rent") {
        var linkEl = $("<a>", "<br>");
        linkEl.attr('href', streams[i].web_url);
        linkEl.text("| Streamer: " + streams[i].name + ",     Cost $" + streams[i].price + " |     ");
        console.log("🚀 ~ file: script.js:75 ~ displayMovieDetails ~ linkEl:", linkEl);
        streamDetailsEl.append(linkEl);
      }}
    }
    makeButtons(movie.Title)
  } else {
    movieDetailsElement.innerHTML = `<p>${movie.Error}</p>`;


  }
}
function makeButtons(movie) {
  let movieHistory = JSON.parse(localStorage.getItem("movie-history")) || []
  if (movie && !movieHistory.includes(movie)) {
    movieHistory.push(movie)
  }
    $("#ul").empty()

  movieHistory.push(movie)
  let list = document.createElement("ul")
  for (var i = 0; i < movieHistory.length; i++) {
    let li = document.createElement("li")
    let button = document.createElement("button")
    button.setAttribute("class", "movie-button");
    button.textContent = movieHistory[i]
    li.append(button)
    list.append(li)
  }
  console.log(list)
  let div = document.getElementById("ul")
  div.append(list)
  localStorage.setItem("movie-history", JSON.stringify(movieHistory))

  $(".movie-button").click(function(event){
    $("#movieTitle").val($(this).text())
    searchMovie(event)
  });


}

makeButtons()
searchButEl.click(searchMovie);
clearBtnEl.click(function () {
  localStorage.clear()
  location.reload()
})


