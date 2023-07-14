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

    var apiKey = "5fe1dca8";
    var apiUrl = "http://www.omdbapi.com/?apikey=" + apiKey;
    var movieDetailsElement = document.getElementById("movieDetails");

    function searchMovie() {
      var title = document.getElementById("movieTitle").value;

fetch(apiUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  })
  .catch(function (error) {
    console.log("Error:", error);
  });
