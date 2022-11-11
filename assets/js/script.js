var state = "Denver";
var stateUrl =
  "http://api.openweathermap.org/geo/1.0/direct?q=" +
  state +
  "&appid=7011eb953ba72b23086bac978cab66f6";

$.ajax({
  url: stateUrl,
  method: "GET",
})
  .then(function (response) {
    var lat = response[0].lat.toString();
    var lon = response[0].lon.toString();
    data = {
      lat: lat,
      lon: lon,
    };
    return data;
  })

  .then(function () {
    var coordinateUrl =
      "https://api.openweathermap.org/data/2.5/forecast?lat=" +
      data.lat +
      "&lon=" +
      data.lon +
      "&appid=7011eb953ba72b23086bac978cab66f6";
    $.ajax({
      url: coordinateUrl,
      method: "GET",
    })
      .then(function (response) {
        weather = response;
        //Object Returned
        console.log(weather);
      })
      .then(function () {
        for (var i = 0; i < weather.list.length; i++) {
          var iconcode = weather.list[i].weather[0].icon;
          var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
          console.log(iconurl);
          //my code here(call a custom function)
        }
      });
  });

//Ryans API Work here (line 150)






































































































// Create variable to store activities in an array and use fetch function to populate array with all available park activities. Each array is then stored to localStorage.
var activitiesArr = [];
var activitiesID = [];
function getActivities() {
  var requestUrl =
    "https://developer.nps.gov/api/v1/activities?limit=100&start=0&api_key=IT8Dh7gamo7lKVqLK6OI3dDyieIMk26ZheCcKLLB";

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      for (var i = 0; i < data.data.length; i++) {
        activitiesArr.push(data.data[i].name);
        activitiesID.push(data.data[i].id);
      }
    })
    .then(function () {
      localStorage.setItem("Activities", JSON.stringify(activitiesArr));
      localStorage.setItem("Activity ID", JSON.stringify(activitiesID));
    });
}

getActivities();

// Array for stored activity names and IDs created
var storedActivities = JSON.parse(localStorage.getItem("Activities"));
var storedActivityID = JSON.parse(localStorage.getItem("Activity ID"));

// Use DOM manipulation to populate the dropdown list for the activity selection
var activityEl = $("#activityType");

for (var i = 0; i < storedActivities.length; i++) {
  var optionEl = $("<option>");
  optionEl.addClass("activityOption");
  optionEl.text(storedActivities[i]);
  optionEl.appendTo(activityEl);
  var activityOptionEl = $(".activityOption");
  activityOptionEl.eq(i).data("code", storedActivityID[i]);
}

// Create array for all 2-letter state codes
var stateLetters = [
  "AL",
  "AK",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "FL",
  "GA",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
];

// Create array for all written out state names
var stateWritten = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];

// DOM manipulation to create dropdown for state selection
stateEl = $("#stateSelected");

for (var i = 0; i < stateWritten.length; i++) {
  var optionDiv = $("<option>");
  optionDiv.text(stateWritten[i]);
  optionDiv.addClass("stateOption");
  optionDiv.appendTo(stateEl);
}

var stateOptionEl = $(".stateOption");

stateOptionEl.each(function (i) {
  stateOptionEl.eq(i).data("value", i);
});

// Create event listener function to perform search
var buttonEl = $(".btn");

stateArr = [];

buttonEl.click(function (event) {
  event.preventDefault();
  var activitySel = $("#activityType option:selected");
  var activityCode = activitySel.data("code");
  var stateSel = $("#stateSelected option:selected");
  var index = stateSel.data("value");
  var requestState = stateLetters[index];
  console.log(requestState);
  console.log(activityCode);

  var requestUrl =
    "https://developer.nps.gov/api/v1/activities/parks?id=" +
    activityCode +
    "&api_key=IT8Dh7gamo7lKVqLK6OI3dDyieIMk26ZheCcKLLB";
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      for (var i = 0; i < data.data[0].parks.length; i++) {
        if (data.data[0].parks[i].states.includes(requestState)) {
          stateArr.push(data.data[0].parks[i].parkCode);
        }
      }
      console.log(stateArr);
      statePark(stateArr);
      parkData(urlArr);
      populateCards();
    })
});

const urlArr = [];
const parksInfo = [];

function statePark(stateArr) {
  for (var i = 0; i < stateArr.length; i++) {
    var parksCode = stateArr[i];
    var query = "parkCode=";
    var parksCode = query.concat(parksCode);
    var stateParkURL =
      "https://developer.nps.gov/api/v1/parks?" +
      parksCode +
      "&api_key=IT8Dh7gamo7lKVqLK6OI3dDyieIMk26ZheCcKLLB";
    urlArr.push(stateParkURL);
  }
  return urlArr;
}

function parkData(urlArr) {
  for (var i = 0; i < urlArr.length; i++) {
    fetch(urlArr[i])
      .then(function (response) {
        return response.json();
      })
      .then(function (parks) {
        parksInfo.push(parks.data[0]);
      })
      .then(function () {
        localStorage.setItem("Park", JSON.stringify(parksInfo));
      });
  }
}



function populateCards() {
  var storedParks = JSON.parse(localStorage.getItem("Park"));
  console.log(storedParks)
  // var parkImageEl = $(".img-fluid")
  // $(".img-fluid:eq(0)").attr("src", storedParks[0].image[0].url)
}
