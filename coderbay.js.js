
var config = {
  apiKey: "AIzaSyCUa3OmzBQAV9MHxQg6Pgl2s5533V5qjEI",
  authDomain: "coder-bay-fee9d.firebaseapp.com",
  databaseURL: "https://coder-bay-fee9d.firebaseio.com",
  storageBucket: "coder-bay-fee9d.appspot.com"
};

firebase.initializeApp(config);

var database = firebase.database();

var initialBid = 0;
var initialBidder = "No one :-(";
var highPrice = initialBid;
var highBidder = initialBidder;

database.ref().on("value", function(snapshot) {

  if (snapshot.child("highBidder").exists() && snapshot.child("highPrice").exists()) {

    highBidder = snapshot.val().highBidder;
    highPrice = parseInt(snapshot.val().highPrice);

    $("#highest-bidder").html(snapshot.val().highBidder);
    $("#highest-price").html("$" + snapshot.val().highPrice);

    console.log(snapshot.val().highBidder);
    console.log(snapshot.val().highPrice);
  }

  else {

    $("#highest-bidder").html(highBidder);
    $("#highest-price").html("$" + highPrice);

    console.log("Current High Price");
    console.log(highBidder);
    console.log(highPrice);
  }

}, function(errorObject) {
  console.log("The read failed: " + errorObject.code);
});

$("#submit-bid").on("click", function() {
 
  var bidderName = $("#bidder-name").val().trim();
  var bidderPrice = parseInt($("#bidder-price").val().trim());

  console.log(bidderName);
  console.log(bidderPrice);

  if (bidderPrice > highPrice) {

    alert("You are now the highest bidder.");

    database.ref().set({
      highBidder: bidderName,
      highPrice: bidderPrice
    });

    console.log("New High Price!");
    console.log(bidderName);
    console.log(bidderPrice);

    highBidder = bidderName;
    highPrice = parseInt(bidderPrice);

    $("#highest-bidder").html(bidderName);
    $("#highest-price").html("$" + bidderPrice);
  }

  else {

    alert("Sorry that bid is too low. Try again.");
  }

  event.preventDefault();
});

