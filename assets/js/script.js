// Create variable to store activities in an array and use fetch function to populate array with all available park activities. Array will then be used to populate dropdown activity form. Run getActivities function to populate dropdown menu.
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
      return activitiesArr, activitiesID;
    })
    .then(function () {
      for (var i = 0; i < activitiesArr.length; i++) {
        activityEl = $("#activityType");
        var optionEl = $("<option>");
        optionEl.text(activitiesArr[i]);
        optionEl.appendTo(activityEl);
      }
    });
}
console.log(activitiesID);
getActivities();

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

stateEl = $("#stateSelected");
activityEl = $("#activityType");

for (var i = 0; i < stateWritten.length; i++) {
  var optionDiv = $("<option>");
  optionDiv.text(stateWritten[i]);
  optionDiv.addClass("stateOption");
  optionDiv.appendTo(stateEl);
}

var optionEl = $(".stateOption");

optionEl.each(function (i) {
  optionEl.eq(i).data("value", i);
});

console.log(optionEl.eq(1).data("value"));

var buttonEl = $(".btn");

buttonEl.click(function (event) {
  event.preventDefault();
  var stateSel = $("#stateSelected option:selected");
  var index = stateSel.data("value");
  var requestState = stateLetters[index];
  console.log(requestState);
  console.log(activityEl.val());

  var requestUrl =
    "https://developer.nps.gov/api/v1/activities/parks?stateCode=" +
    requestState +
    "&api_key=IT8Dh7gamo7lKVqLK6OI3dDyieIMk26ZheCcKLLB";
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
});

// getStates;

// function getApi() {
//   var requestUrl =
//     "https://developer.nps.gov/api/v1/parks?stateCode=" +
//     requestState +
//     "&api_key=IT8Dh7gamo7lKVqLK6OI3dDyieIMk26ZheCcKLLB";
// }

// getApi();
// console.log(data.data[0].activities[0].name);
