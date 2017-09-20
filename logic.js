var config = {
  apiKey: "AIzaSyDaP9vnmE4vEjDAjhV4J5hYPtqG4drvzag",
  authDomain: "train-scheduler-8b59a.firebaseapp.com",
  databaseURL: "https://train-scheduler-8b59a.firebaseio.com",
  projectId: "train-scheduler-8b59a",
  storageBucket: "train-scheduler-8b59a.appspot.com",
  messagingSenderId: "827484978669"
};
firebase.initializeApp(config);
var database = firebase.database();

$( document ).ready(function() {
// 2. Button for adding trains
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();
  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var dest = $("#destination-input").val().trim();
  var firstTime = $("#first-input").val().trim();
  var freq = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    destination: dest,
    first: firstTime,
    frequency: freq
  };
  // Uploads train data to the database
  database.ref().push(newTrain);
  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.first);
  console.log(newTrain.frequency);
  // Alert
  alert("Train successfully added");
  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-input").val("");
  $("#frequency-input").val("");
});
// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  console.log(childSnapshot.val());
  // Store everything into a variable.
  var tName = childSnapshot.val().name;
  var tDest = childSnapshot.val().destination;
  var tFirst = childSnapshot.val().first;
  var tFreq = childSnapshot.val().frequency;
  // Train Info
  console.log(tName);
  console.log(tDest);
  console.log(tFirst);
  console.log(tFreq);
  // To calculate next arrival
  var tNext = nextArrival(tFirst, tFreq);
  console.log(tNext);
  // Calculate the minutes away
  var tMinutes = minAway(tNext);
  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + tName + "</td><td>" + tDest + "</td><td>" +
    tFreq + "</td><td>" + tNext + "</td><td>" + tMinutes + "</td></tr>");
});


// function for calculating next arrival
function nextArrival(first, freak) {
  var currentTime = moment().format("HH:mm");
  var trainTimes = [];
  var currentWait = first;

  while (currentWait < currentTime && currentWait < "23:59") {
    var next = moment(currentWait, "HH:mm").add(freak, 'm').format("HH:mm");
    trainTimes.push(next);
    currentWait = next;
  }

  var nextTrain = trainTimes[trainTimes.length - 1];
  return nextTrain;
  console.log(nextTrain);
  
}

// calculate minutes away
function minAway(nextTrain) {
  var currentTime = moment().format("HH:mm");
  var minutes = (moment(nextTrain, "HH:mm").diff(moment(currentTime, "HH:mm")) / 60000);
  return minutes;
}


});







