// Create array for all 2-letter state codes
var stateID = [
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
var requestState = "ND";

// Create variable to store activities in an array and use fetch function to populate array with all available park activities
var activitiesArr = [];
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
      }
      return activitiesArr;
    });
}

getActivities();

// Create element for state value input
stateEl = $("#state");

$("#activity").autocomplete({
  source: activitiesArr,
});

// function getApi() {
//   var requestUrl =
//     "https://developer.nps.gov/api/v1/parks?stateCode=" +
//     requestState +
//     "&api_key=IT8Dh7gamo7lKVqLK6OI3dDyieIMk26ZheCcKLLB";

//   fetch(requestUrl)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//       console.log(data.data[0].activities[0].name);
//     });
// }

// getApi();
