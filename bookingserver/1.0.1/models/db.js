var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/booking");
var db = mongoose.connection;

db.on("connected", function() {
  console.log("mongoose default conncetion open to"); //when successfully connected
});

db.on("error", function(err) {
  console.log("mongoose err" + err); //when err
});

db.on("disconnected", function() {
  console.log("mongoose connecttion lost"); //when connection lost
});

process.on("SIGINT", function() {
  db.close(function() {
    //if the node process, close the mongoose collection
    console.log("mongoose connection terminated through app termination");
    process.exit(0);
  });
});
