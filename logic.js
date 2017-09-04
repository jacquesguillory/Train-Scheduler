  /* global firebase moment */
// Steps to complete:
// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed
// 1. Initialize Firebase
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
// 2. Button for adding trains
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();
  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var dest = $("#destination-input").val().trim();
  var firstTime = moment($("#first-input").val().trim(), "HH:mm");
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
  var tNext = moment(tFirst, 'HH:mm').add(tFreq, 'minutes').format("hh:mm");
  // Calculate the minutes away
  var tMinutes = moment(tNext, 'HH:mm').toNow('minutes');
  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + tName + "</td><td>" + tDest + "</td><td>" +
  tFreq + "</td><td>" + tNext + "</td><td>" + tMinutes + "</td></tr>");
});

