// var state = "Denver";
// var stateUrl =
//   "http://api.openweathermap.org/geo/1.0/direct?q=" +
//   state +
//   "&appid=7011eb953ba72b23086bac978cab66f6";
var day1El = $(".day1");
var day2El = $(".day2");
var day3El = $(".day3");
var day4El = $(".day4");
var day5El = $(".day5");
var day1Img = $(".day1Img");
var day2Img = $(".day2Img");
var day3Img = $(".day3Img");
var day4Img = $(".day4Img");
var day5Img = $(".day5Img");
var weatherImgArr = [];
var day = dayjs().day();
console.log(day);

function displayDay() {
  if (day == 1) {
    day1El.text("Monday");
    day2El.text("Tuesday");
    day3El.text("Wednesday");
    day4El.text("Thursday");
    day5El.text("Friday");
  } else if (day == 2) {
    day1El.text("Tuesday");
    day2El.text("Wednesday");
    day3El.text("Thursday");
    day4El.text("Friday");
    day5El.text("Saturday");
  } else if (day == 3) {
    day1El.text("Wednesday");
    day2El.text("Thursday");
    day3El.text("Friday");
    day4El.text("Saturday");
    day5El.text("Sunday");
  } else if (day == 4) {
    dayEl.text("Thursday");
    day2El.text("Friday");
    day3El.text("Saturday");
    day4El.text("Sunday");
    day5El.text("Monday");
  } else if (day == 5) {
    day1El.text("Friday");
    day2El.text("Saturday");
    day3El.text("Sunday");
    day4El.text("Monday");
    day5El.text("Tuesday");
  } else if (day == 6) {
    day1El.text("Saturday");
    day2El.text("Sunday");
    day3El.text("Monday");
    day4El.text("Tuesday");
    day5El.text("Wednesday");
  }
}

displayDay();

// $.ajax({
//   url: stateUrl,
//   method: "GET",
// })
//   .then(function (response) {
//     var lat = response[0].lat.toString();
//     var lon = response[0].lon.toString();
//     data = {
//       lat: lat,
//       lon: lon,
//     };
//     return data;
//   })

//   .then(function () {
//     var coordinateUrl =
//       "https://api.openweathermap.org/data/2.5/forecast?lat=" +
//       data.lat +
//       "&lon=" +
//       data.lon +
//       "&appid=7011eb953ba72b23086bac978cab66f6";
//     $.ajax({
//       url: coordinateUrl,
//       method: "GET",
//     })
//       .then(function (response) {
//         weather = response;
//         //Object Returned
//         console.log(weather);
//       })
//       .then(displayWeather);
//   });

function displayWeather() {
  for (var i = 0; i < weather.list.length; i++) {
    var iconcode = weather.list[i].weather[0].icon;
    var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
    weatherImgArr.push(iconurl);
    console.log(iconurl);
    // console.log(iconurl)
    day1Img.attr("style", "background-image: url(" + weatherImgArr[0] + ")");
    day2Img.attr("style", "background-image: url(" + weatherImgArr[8] + ")");
    day3Img.attr("style", "background-image: url(" + weatherImgArr[16] + ")");
    day4Img.attr("style", "background-image: url(" + weatherImgArr[32] + ")");
    day5Img.attr("style", "background-image: url(" + weatherImgArr[39] + ")");
  }
}

//Ryans API Work here (line 150)

// Create variable to store activities in an array and use fetch function to populate array with all available park activities. Each array is then stored to localStorage.
var activitiesArr = [];
var activitiesID = [];
var npsKey = "&api_key=qSdrkcrG38qE4jgKFegQA5pppeEuUlg7PfXZ8CTc";
function getActivities() {
  var requestUrl =
    "https://developer.nps.gov/api/v1/activities?limit=45&start=0" + npsKey;

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
    npsKey;
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
    });
});

// statePark function to obtain park codes
const urlArr = [];

function statePark(stateArr) {
  for (var i = 0; i < stateArr.length; i++) {
    var parksCode = stateArr[i];
    var query = "parkCode=";
    var parksCode = query.concat(parksCode);
    var stateParkURL =
      "https://developer.nps.gov/api/v1/parks?" + parksCode + npsKey;
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
  console.log(allParksData);

  for (var i = 0; i < urlArr.length; i++) {
    // Weather Data
    var coordinateURL =
      "https://api.openweathermap.org/data/2.5/forecast?lat=" +
      allParksData[i].data[0].latitude +
      "&lon=" +
      allParksData[i].data[0].longitude +
      "&appid=7011eb953ba72b23086bac978cab66f6";
    $.ajax({
      url: coordinateURL,
      method: "GET",
    })
      .then(function (response) {
        weatherPark = response;
      })
      .then(function () {
        for (var i = 0; i < weatherPark.list.length; i++) {
          var iconcode = weatherPark.list[i].weather[0].icon;
          var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
          weatherImgArr.push(iconurl);
        }
      });
    // Weather Data

    var searchContainer = $(".row").eq(1);
    var colDiv = $("<div>");
    colDiv.addClass("col");
    colDiv.appendTo(searchContainer);
    var cardDiv = $("<div>");
    cardDiv.addClass("card");
    cardDiv.attr("style", "width: 20rem");
    cardDiv.appendTo(colDiv);
    var imgDiv = $("<img>");
    imgDiv.addClass("img-fluid card-img-top");
    imgDiv.attr("src", allParksData[i].data[0].images[0].url);
    imgDiv.appendTo(cardDiv);
    cardBodyDiv = $("<div>");
    cardBodyDiv.addClass("card-body");
    cardBodyDiv.appendTo(cardDiv);
    headerDiv = $("<h5>");
    headerDiv.addClass("card-title");
    headerDiv.text(allParksData[i].data[0].fullName);
    headerDiv.appendTo(cardBodyDiv);
    cardTextDiv = $("<p>");
    cardTextDiv.addClass("card-text");
    cardTextDiv.text(allParksData[i].data[0].description);
    cardTextDiv.appendTo(cardBodyDiv);
    activityHeaderDiv = $("<div>");
    activityHeaderDiv.addClass("card-body");
    activityHeaderDiv.appendTo(cardDiv);
    activityDiv = $("<h5>");
    activityDiv.addClass("card-title");
    activityDiv.text("Additional Park Activities:");
    activityDiv.appendTo(activityHeaderDiv);
    listEl = $("<ul>");
    listEl.addClass("list-group list-group-flush");
    listEl.appendTo(cardDiv);
    var numActs = allParksData[i].data[0].activities.length;
    li1 = $("<li>");
    li1.addClass("list-group-item");
    li1.appendTo(listEl);
    li1.text(
      allParksData[i].data[0].activities[Math.floor(Math.random() * numActs)]
        .name
    );
    li2 = $("<li>");
    li2.addClass("list-group-item");
    li2.appendTo(listEl);
    li2.text(
      allParksData[i].data[0].activities[Math.floor(Math.random() * numActs)]
        .name
    );
    li3 = $("<li>");
    li3.addClass("list-group-item");
    li3.appendTo(listEl);
    li3.text(
      allParksData[i].data[0].activities[Math.floor(Math.random() * numActs)]
        .name
    );
    linkDiv = $("<div>");
    linkDiv.addClass("card-body");
    linkDiv.text("For more park information visit: ");
    linkDiv.appendTo(cardDiv);
    urlDiv = $("<a>");
    urlDiv.addClass("card-link");
    urlDiv.attr("href", allParksData[i].data[0].url);
    urlDiv.attr("target", "_blank");
    urlDiv.text(allParksData[i].data[0].fullName);
    urlDiv.appendTo(linkDiv);
    weatherEl = $("<div>");
    weatherEl.addClass("card-body weatherBox");
    weatherEl.appendTo(cardDiv);
    weatherContainer1 = $("<div>");
    weatherContainer1.addClass("weatherContainer");
    weatherContainer1.appendTo(weatherEl);
    weatherP1 = $("<p>");
    weatherP1.addClass("day1");
    weatherP1.appendTo(weatherContainer1);
    dayImg1 = $("<div>");
    dayImg1.addClass("weather day1Img");
    dayImg1.appendTo(weatherContainer1);
    weatherContainer2 = $("<div>");
    weatherContainer2.addClass("weatherContainer");
    weatherContainer2.appendTo(weatherEl);
    weatherP2 = $("<p>");
    weatherP2.addClass("day1");
    weatherP2.appendTo(weatherContainer2);
    dayImg2 = $("<div>");
    dayImg2.addClass("weather day1Img");
    dayImg2.appendTo(weatherContainer2);
    weatherContainer3 = $("<div>");
    weatherContainer3.addClass("weatherContainer");
    weatherContainer3.appendTo(weatherEl);
    weatherP3 = $("<p>");
    weatherP3.addClass("day1");
    weatherP3.appendTo(weatherContainer3);
    dayImg3 = $("<div>");
    dayImg3.addClass("weather day1Img");
    dayImg3.appendTo(weatherContainer3);
    weatherContainer4 = $("<div>");
    weatherContainer4.addClass("weatherContainer");
    weatherContainer4.appendTo(weatherEl);
    weatherP4 = $("<p>");
    weatherP4.addClass("day1");
    weatherP4.appendTo(weatherContainer4);
    dayImg4 = $("<div>");
    dayImg4.addClass("weather day1Img");
    dayImg4.appendTo(weatherContainer4);
    weatherContainer5 = $("<div>");
    weatherContainer5.addClass("weatherContainer");
    weatherContainer5.appendTo(weatherEl);
    weatherP5 = $("<p>");
    weatherP5.addClass("day1");
    weatherP5.appendTo(weatherContainer5);
    dayImg5 = $("<div>");
    dayImg5.addClass("weather day1Img");
    dayImg5.appendTo(weatherContainer5);
    dayImg1.attr("style", "background-image: url(" + weatherImgArr[0] + ")");
    dayImg2.attr("style", "background-image: url(" + weatherImgArr[8] + ")");
    dayImg3.attr("style", "background-image: url(" + weatherImgArr[16] + ")");
    dayImg4.attr("style", "background-image: url(" + weatherImgArr[32] + ")");
    dayImg5.attr("style", "background-image: url(" + weatherImgArr[39] + ")");
    if (day == 1) {
      weatherP1.text("Monday");
      weatherP2.text("Tuesday");
      weatherP3.text("Wednesday");
      weatherP4.text("Thursday");
      weatherP5.text("Friday");
    } else if (day == 2) {
      weatherP1.text("Tuesday");
      weatherP2.text("Wednesday");
      weatherP3.text("Thursday");
      weatherP4.text("Friday");
      weatherP5.text("Saturday");
    } else if (day == 3) {
      weatherP1.text("Wednesday");
      weatherP2.text("Thursday");
      weatherP3.text("Friday");
      weatherP4.text("Saturday");
      weatherP5.text("Sunday");
    } else if (day == 4) {
      weatherP1.text("Thursday");
      dweatherP2.text("Friday");
      weatherP3.text("Saturday");
      weatherP4.text("Sunday");
      weatherP5.text("Monday");
    } else if (day == 5) {
      weatherP1.text("Friday");
      weatherP2.text("Saturday");
      weatherP3.text("Sunday");
      weatherP4.text("Monday");
      weatherP5.text("Tuesday");
    } else if (day == 6) {
      weatherP1.text("Saturday");
      weatherP2.text("Sunday");
      weatherP3.text("Monday");
      weatherP4.text("Tuesday");
      weatherP5.text("Wednesday");
    }
  }
}
