var apiKey = "5fe1dca8";
var apiUrl = "http://www.omdbapi.com/?apikey=" + apiKey;
var movieDetailsElement = document.getElementById("movieDetails");

function searchMovie() {
    var title = document.getElementById("movieTitle").value;

    fetch(`${apiUrl}&t=${encodeURIComponent(title)}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            displayMovieDetails(data);
        })
        .catch(function (error) {
            console.log("Error:", error);
        });
}

function displayMovieDetails(movie) {
    if (movie.Response === "True") {
        var html = `
          <h2>${movie.Title}</h2>
          <p>Year: ${movie.Year}</p>
          <p>Director: ${movie.Director}</p>
          <p>Plot: ${movie.Plot}</p>
        `;
        movieDetailsElement.innerHTML = html;
    } else {
        movieDetailsElement.innerHTML = `<p>${movie.Error}</p>`;
    }
}

// watch mode api information down below
// var wmApiKey = TNJADaKq3XlXMkATsndQthQewGSmwIfLUdLVrqez;
// var wmApiUrl = "https://api.watchmode.com/datasets/title_id_map.csv" + wmApiKey;





function searchMovie() {
    var movieTitle = document.getElementById("movieTitle").value;

    // Make a request to the OMDB API
    var omdbApiKey = "5fe1dca8";
    var omdbApiUrl = `http://www.omdbapi.com/?apikey=${omdbApiKey}&t=${encodeURIComponent(movieTitle)}`;

    fetch(omdbApiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        displayMovieDetails(data);
      })
      .catch(function (error) {
        console.log("Error:", error);
      });
  }

  function displayMovieDetails(movie) {
    var movieDetailsElement = document.getElementById("movieDetails");
    movieDetailsElement.innerHTML = `
      <h2>${movie.Title}</h2>
      <img src="${movie.Poster}" alt="${movie.Title} Poster">
      <p>Year: ${movie.Year}</p>
      <p>Director: ${movie.Director}</p>
      <p>Plot: ${movie.Plot}</p>
    `;
  }
