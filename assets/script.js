
// var apiKey = "5fe1dca8"
// var apiUrl = "http://www.omdbapi.com/?apikey="+ apiKey

// console.log("")

// fetch(apiUrl)
// .then(response => response.json())
// .then(data => {console.log(data)})


var apiKey = "5fe1dca8";
var apiUrl = "http://www.omdbapi.com/?apikey=" + apiKey;

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

