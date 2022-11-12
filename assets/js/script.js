var state = "Denver";
var stateUrl =
  "http://api.openweathermap.org/geo/1.0/direct?q=" +
  state +
  "&appid=7011eb953ba72b23086bac978cab66f6";
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

// After State and Activity are selected, the values for the 2-letter state code and activity ID are stored and then used to search for all parks with the given activity ID the list is then filtered to obtain the park code for each park in the given state that offers the selected activity.
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
      for (var i = 0; i < data.data[0].parks.length; i++) {
        if (data.data[0].parks[i].states.includes(requestState)) {
          stateArr.push(data.data[0].parks[i].parkCode);
        }
      }
      // State park function uses the array of park codes to return a unique url for each park.
      statePark(stateArr);
      // Each unique park is then loaded in to the loadURLs function to fetch the data for each park and store it in an array which is then used for DOM manipulation
      loadURLs(urlArr);
    })
});

// statePark function to obtain park codes 
const urlArr = [];

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

// getData function performs a fetch for each park 
function getData(url) {
  return new Promise(function (resolve) {
    fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        resolve(data);
      });
  });
}

// Given the unique URLs, each URL is fetched for park data and after all data has been fetched, the render function is called
function loadURLs(urlArr) {
  let urlRequests = [];

  urlArr.forEach(function (park) {
    return urlRequests.push(getData(park));
  });

  Promise.all(urlRequests).then(function (allParksData) {
    render(allParksData);
  });
}

// render function uses the park data for DOM manipulation 
function render(allParksData) {
  for (var i = 0; i < urlArr.length; i++) {
    console.log(allParksData[i].data[0].images[0].url);
  }
}





