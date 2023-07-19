// var apiKey = "5fe1dca8";
// var apiUrl = "http://www.omdbapi.com/?apikey=" + apiKey;

// function searchMovie(title) {
//     fetch(`${apiUrl}&t=${encodeURIComponent(title)}`)
//         .then(function (response) {
//             return response.json();
//         })
//         .then(function (data) {
//             console.log(data);
//         })
//         .catch(function (error) {
//             console.log("Error:", error);
//         });
// }

// // Example usage:
// searchMovie("Inception");




var imdb;
var watchKey = "yPRb9TOOBBa3KTNLBZKtGukLish14uukiiqOBfT1";
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

    imdb = movie.imdbID;
    var html = `
          <h2>${movie.Title}</h2>
          <p>Year: ${movie.Year}</p>
          <p>Director: ${movie.Director}</p>
          <p>Plot: ${movie.Plot}</p>
          `;
    movieDetailsElement.innerHTML = html;
    // WACTHMODE 
    let url = 'https://api.watchmode.com/v1/title/' + imdb + '/sources/?apiKey=' + watchKeyey;
    fetch(url, { method: 'Get' })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
      });


  } else {
    movieDetailsElement.innerHTML = `<p>${movie.Error}</p>`;
  }
}


