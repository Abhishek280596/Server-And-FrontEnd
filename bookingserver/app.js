const express = require("express");

const bodyParser = require("body-parser");

const app = express();

require("./1.0.1/models/db");

app.use(bodyParser.json());

const port = process.env.PORT || 8888;
app.use(bodyParser.json());

app.use(express.static("uploads"));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization,X-token"
  );

  res.header("access-control-expose-headers", "X-token");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH,OPTIONS"
  );

  next();
});

app.use("/api/v1/user", require("./1.0.1/routes/user.route"));
app.use("/api/v1/auth", require("./1.0.1/routes/auth.route"));
app.use("/api/v1/booking", require("./1.0.1/routes/booking.route"));

app.listen(port, () => {
  console.log("server is listening to port" + port);
});

// var express = require("express"),
//   app = express(),
//   server = require("http").createServer(app);

// server.listen(80, "domain");

// app.get("/:id(\\d+)", function (req, res) {
//   var id = req.params.id;
//   res.end("Received parameter:" + id);
//   console.log("id=" + id);
// });
