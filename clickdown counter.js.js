var config = {
    apiKey: "AIzaSyB4Ws5gPo9gNW9x90uXnX6XZ4uqE5QjkUY",
    authDomain: "countdownclicker.firebaseapp.com",
    databaseURL: "https://countdownclicker.firebaseio.com",
    storageBucket: "countdownclicker.appspot.com",
    messagingSenderId: "435604262542"
};

firebase.initializeApp(config);

var database = firebase.database();
var initialValue = 100;
var clickCounter = initialValue;

database.ref().on("value", function(snapshot) {

  console.log(snapshot.val());

  clickCounter = snapshot.val().clickCount;

  console.log(clickCounter);

  $("#click-value").html(snapshot.val().clickCount);

}, function(errorObject) {
  console.log("The read failed: " + errorObject.code);
});

$("#click-button").on("click", function() {

  clickCounter--;

  if (clickCounter === 0) {
    alert("No more clicks to count!");
    clickCounter = initialValue;
  }

  database.ref().set({
    clickCount: clickCounter
  });

  console.log(clickCounter);

});

$("#restart-button").on("click", function() {

  clickCounter = initialValue;

  database.ref().set({
    clickCount: clickCounter
  });

  console.log(clickCounter);

  $("#click-value").html(clickCounter);

});