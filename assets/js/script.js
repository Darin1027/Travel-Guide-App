var state = "Denver"
var stateUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + state + "&appid=7011eb953ba72b23086bac978cab66f6"

$.ajax({
  url: stateUrl,
  method: "GET",
}).then(function (response) {
  var lat = response[0].lat.toString()
  var lon = response[0].lon.toString()
  data = {
    lat: lat,
    lon: lon,
  }
  return data;
})





.then(function () {
  var coordinateUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + data.lat + "&lon=" + data.lon + "&appid=7011eb953ba72b23086bac978cab66f6"
  $.ajax({
    url: coordinateUrl,
    method: "GET",
    })
    .then(function(response) {
      weather = response;
      //Object Returned
      console.log(weather)
    })
    .then(displayWeather)
  })

function displayWeather() {
  for (var i = 0; i < weather.list.length; i++){
    var iconcode = weather.list[i].weather[0].icon;
    var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
    console.log(iconurl)
  }
}





// function getApi() {
//   var requestUrl =
//     "https://developer.nps.gov/api/v1/parks?stateCode=" +
//     requestState +
//     "&api_key=IT8Dh7gamo7lKVqLK6OI3dDyieIMk26ZheCcKLLB";
// }

// getApi();
// console.log(data.data[0].activities[0].name);
