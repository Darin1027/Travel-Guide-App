var state = "Denver"
var stateUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + state + "&appid=7011eb953ba72b23086bac978cab66f6"
var day1El = $(".day1")
var day2El = $(".day2")
var day3El = $(".day3")
var day4El = $(".day4")
var day5El = $(".day5")
var day1Img = $(".day1Img")
var day2Img = $(".day2Img")
var day3Img = $(".day3Img")
var day4Img = $(".day4Img")
var day5Img = $(".day5Img")
var weatherImgArr = []
var day = dayjs().day()
console.log(day)

function displayDay() {
  if (day == 1) {
    day1El.text("Monday")
    day2El.text("Tuesday")
    day3El.text("Wednesday")
    day4El.text("Thursday")
    day5El.text("Friday")
  } else if (day == 2) {
    day1El.text("Tuesday")
    day2El.text("Wednesday")
    day3El.text("Thursday")
    day4El.text("Friday")
    day5El.text("Saturday")
  } else if (day == 3) {
    day1El.text("Wednesday")
    day2El.text("Thursday")
    day3El.text("Friday")
    day4El.text("Saturday")
    day5El.text("Sunday")
  } else if (day == 4) {
    dayEl.text("Thursday")
    day2El.text("Friday")
    day3El.text("Saturday")
    day4El.text("Sunday")
    day5El.text("Monday")
  } else if (day == 5) {
    day1El.text("Friday")
    day2El.text("Saturday")
    day3El.text("Sunday")
    day4El.text("Monday")
    day5El.text("Tuesday")
  } else if (day == 6) {
    day1El.text("Saturday")
    day2El.text("Sunday")
    day3El.text("Monday")
    day4El.text("Tuesday")
    day5El.text("Wednesday")
  }
}

displayDay()

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
    weatherImgArr.push(iconurl)
    console.log(weatherImgArr)
    // console.log(iconurl)
    day1Img.attr("style", "background-image: url(" + weatherImgArr[0] + ")")
    day2Img.attr("style", "background-image: url(" + weatherImgArr[8] + ")")
    day3Img.attr("style", "background-image: url(" + weatherImgArr[16] + ")")
    day4Img.attr("style", "background-image: url(" + weatherImgArr[32] + ")")
    day5Img.attr("style", "background-image: url(" + weatherImgArr[39] + ")")
  }
}